import { useState, useEffect } from "react";
import { Skeleton, Spin, Pagination } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { NoData } from "components/NoData/NoData";
import { useQuestTasks, useSubmitQuestTask } from "hooks/useQuestTasks";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import styles from "./QuestComponent.module.scss";
import { QuestTask } from "entities";

interface QuestPageProps {
  title: string;
  questArray: number[];
  questType: string;
}

const QuestPage = ({ title, questArray, questType }: QuestPageProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 1;
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  const [isCorrectValues, setIsCorrectValues] = useState<{ [key: number]: boolean | null }>({});
  const [isDirty, setIsDirty] = useState(false);
  const [submittingQuestId, setSubmittingQuestId] = useState<number | null>(null);

  const { data, isLoading, error } = useQuestTasks(questArray, undefined, page, pageSize);
  const { mutate: submitTask, isPending } = useSubmitQuestTask();

  const totalItems = data?.totalItems || 0;

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

    setSubmittingQuestId(questId);

    const questType = quests.find((q) => q.id === questId)?.type;
    let requestData: { options?: number[]; text?: string } = {};

    if (questType === "options_task") {
      const selectedOptions = inputValues[questId]
        ? inputValues[questId].split(",").map((optionId) => parseInt(optionId, 10))
        : [];
      requestData.options = selectedOptions;
    } else if (questType === "text_task") {
      requestData.text = inputValues[questId];
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
          setSubmittingQuestId(null);
        },
        onError: () => {
          setIsCorrectValues((prev) => ({
            ...prev,
            [questId]: false,
          }));
          setSubmittingQuestId(null);
        },
      }
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, questId: number) => {
    const value = event.target.value;
    setInputValues((prevValues) => ({
      ...prevValues,
      [questId]: value,
    }));
    setIsDirty(true);
  };

  const handleOptionChange = (questId: number, optionId: number, multiple: boolean) => {
    const currentValue = inputValues[questId] ? inputValues[questId].split(",") : [];
    let updatedValues = [...currentValue];

    if (multiple) {
      if (updatedValues.includes(optionId.toString())) {
        updatedValues = updatedValues.filter((value) => value !== optionId.toString());
      } else {
        updatedValues.push(optionId.toString());
      }
    } else {
      updatedValues = [optionId.toString()];
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [questId]: updatedValues.join(","),
    }));
    setIsDirty(true);
  };

  const quests = data?.items || [];

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Skeleton active />
      ) : quests.length === 0 ? (
        <NoData text="Нет доступных заданий." />
      ) : (
        <div className={styles.cardsContainer}>
          {quests.map((quest: QuestTask) => (
            <div key={quest.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{quest.body}</h3>

              {quest.picture && (
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
                      : "Ответ неверный. Попробуйте снова."}
                  </p>
                </div>
              )}

              {quest.type === "text_task" && (
                <div className={styles.textTaskContainer}>
                  <input
                    type="text"
                    value={inputValues[quest.id] || ""}
                    onChange={(e) => handleInputChange(e, quest.id)}
                    className={styles.inputField}
                    placeholder="Введите ваш ответ"
                  />
                  <button
                    onClick={() => handleSubmit(quest.id)}
                    className={styles.submitButton}
                    disabled={!inputValues[quest.id]?.trim() || submittingQuestId === quest.id}
                  >
                    {submittingQuestId === quest.id ? (
                      <Spin indicator={<LoadingOutlined spin />} size="small" />
                    ) : (
                      "Отправить"
                    )}
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
                          onChange={() => handleOptionChange(quest.id, option.id, quest.multipleSelectionAllowed)}
                          className={styles.optionInput}
                        />
                        {option.value}
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
            </div>
          ))}
        </div>
      )}

    {totalItems > pageSize && (
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePageChange}
          className={styles.pagination}
        />
      )}
    </div>
  );
};

export default QuestPage;
