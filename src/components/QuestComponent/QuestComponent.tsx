import { useState, useEffect } from "react";
import { Skeleton, Spin, Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { NoData } from "components/NoData/NoData";
import { useQuestTasks, useSubmitQuestTask } from "hooks/useQuestTasks";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import styles from "./QuestComponent.module.scss";
import parse from "html-react-parser";
import SortableOrderTask from "components/SortableOrderTask/SortableOrderTask";

interface QuestPageProps {
  questArray: number[];
  pageSize?: number;
}

const QuestPage = ({ questArray, pageSize = 1 }: QuestPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;

  const [page, setPage] = useState(initialPage);

  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  const [isCorrectValues, setIsCorrectValues] = useState<{ [key: number]: boolean | null }>({});

  const { data, isLoading, refetch } = useQuestTasks(questArray, undefined, page, pageSize);
  const { mutate: submitTask, isPending } = useSubmitQuestTask();

  const totalItems = data?.totalItems || 0;

  useEffect(() => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (data?.items) {
      const initialCorrectness: { [key: number]: boolean | null } = {};
      data.items.forEach((quest) => {
        initialCorrectness[quest.id] = quest.submission?.isCorrect ?? null;
      });
      setIsCorrectValues(initialCorrectness);
    }
  }, [data]);

  useEffect(() => {
    if (data?.items) {
      const initialInputValues: { [key: number]: string } = {};
      data.items.forEach((quest) => {
        if (quest.submission?.userInput?.text) {
          initialInputValues[quest.id] = quest.submission.userInput.text;
        }
        if (quest.submission?.userInput?.options) {
          initialInputValues[quest.id] = quest.submission.userInput.options.join(",");
        }
      });
      setInputValues(initialInputValues);
    }
  }, [data]);

  const handleSubmit = (questId: number) => {
    if (!questId) {
      return;
    }

    const questType = quests.find((q) => q.id === questId)?.type;
    let requestData: { options?: number[]; text?: string, order_options?: number[] } = {};

    if (questType === "options_task") {
      const selectedOptions = inputValues[questId]
        ? inputValues[questId].split(",").map((optionId) => parseInt(optionId, 10))
        : [];
      requestData.options = selectedOptions;
    } else if (questType === "text_task") {
      requestData.text = inputValues[questId];
    } else if (questType === "order_options_task") {
      requestData.order_options = inputValues[questId]
      ? inputValues[questId].split(",").map((optionId) => parseInt(optionId, 10))
      : [];
    }

    submitTask(
      {
        questTaskId: questId,
        data: requestData,
      },
      {
        onSuccess: (response) => {
          setIsCorrectValues((prev) => ({
            ...prev,
            [questId]: response.isCorrect,
          }));
          refetch();
        },
        onError: () => {
          setIsCorrectValues((prev) => ({
            ...prev,
            [questId]: false,
          }));
        },
      }
    );
  };

  const quests = data?.items || [];

  return (
    <div className={styles.questComponentContainer}>
      {totalItems > pageSize && (
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePageChange}
          className={styles.pagination}
        />
      )}

      {isLoading ? (
        <Skeleton active />
      ) : quests.length === 0 ? (
        <NoData text={`Мы стараемся сделать задачи интереснее... Скоро загрузим!`} />
      ) : (
        <div className={styles.cardsContainer}>
{quests.map((quest) => (
  <div key={quest.id} className={styles.card}>
<h3 className={styles.cardTitle}>
  {quest.body.split("<picture>").map((part, index, arr) => (
    <div key={index}>
        {parse(part)} 
      {index < arr.length - 1 && quest.picture && (
        <div className={styles.cardImageContainer}>
          <img src={quest.picture} alt="quest image" className={styles.cardImage} />
        </div>
      )}
    </div>
  ))}
</h3>


      {quest.picture && !quest.body.includes("<picture>") && (
      <div className={styles.cardImageContainer}>
        <img src={quest.picture} alt={quest.body} className={styles.cardImage} />
      </div>
    )}


    {isCorrectValues[quest.id] !== undefined && isCorrectValues[quest.id] !== null && (
      <div className={styles.feedbackContainer}>
        {isCorrectValues[quest.id] ? (
          <CheckCircleOutlined className={styles.correctIcon} />
        ) : (
          <CloseCircleOutlined className={styles.incorrectIcon} />
        )}
        <p className={styles.feedbackText}>
          {isCorrectValues[quest.id]
            ? "Ответ верный!"
            : quest?.incorrectSubmissionText || "Ответ неверный"}
        </p>
      </div>
    )}

    { quest?.submission && (
   <div className={styles.scoreContainer}>
   <p>Ваш лучший балл: {quest?.submission?.bestScore || 0} из {quest.maxScore}</p>
   <p>Ваш текущий балл: {quest?.submission?.score || 0}</p>
 </div>
)}

    {quest.type === "text_task" && (
      <div className={styles.textTaskContainer}>
        <input
          type="text"
          value={inputValues[quest.id] || ""}
          onChange={(e) => {
            setInputValues((prevValues) => ({
              ...prevValues,
              [quest.id]: e.target.value,
            }));
          }}
          className={styles.inputField}
          placeholder="Введите ваш ответ"
        />
        <button
          onClick={() => handleSubmit(quest.id)}
          className={styles.submitButton}
          disabled={!inputValues[quest.id]?.trim()}
        >
          {isPending ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : "Отправить"}
        </button>
      </div>
    )}

    {quest.type === "options_task" && quest.options && (
      <div className={styles.optionsTaskContainer}>
        <div className={styles.optionsContainer}>
          {quest.options.map((option) => (
            <label key={option.id} className={styles.optionLabel}>
              <input
                type={quest.multipleSelectionAllowed ? "checkbox" : "radio"}
                name={`quest-${quest.id}`}
                value={option.id}
                checked={inputValues[quest.id]?.includes(option.id.toString()) || false}
                onChange={() => {
                  const currentValue = inputValues[quest.id] ? inputValues[quest.id].split(",") : [];
                  let updatedValues = [...currentValue];
                  if (updatedValues.includes(option.id.toString())) {
                    updatedValues = updatedValues.filter((value) => value !== option.id.toString());
                  } else {
                    updatedValues.push(option.id.toString());
                  }
                  setInputValues((prevValues) => ({
                    ...prevValues,
                    [quest.id]: updatedValues.join(","),
                  }));
                }}
                className={styles.optionInput}
              />
              {parse(option.value)}
            </label>
          ))}
        </div>
        <button
          onClick={() => handleSubmit(quest.id)}
          className={styles.submitButton}
          disabled={!inputValues[quest.id]?.length}
        >
          Отправить
        </button>
      </div>
    )}

    {quest.type === "order_options_task" && quest.orderOptions && (
      <SortableOrderTask
        quest={quest}
        inputValues={inputValues}
        setInputValues={setInputValues}
        handleSubmit={handleSubmit}
      />
    )}
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default QuestPage;
