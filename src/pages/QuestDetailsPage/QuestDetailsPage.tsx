import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Skeleton, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { NoData } from "components/NoData/NoData";
import { useQuestTasks, useSubmitQuestTask } from "hooks/useQuestTasks";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import styles from "./QuestDetailsPage.module.scss";

const questTypeTranslations = {
  nuclear_medicine_history: "История ядерной медицины",
  diagnostics: "Диагностика",
  therapy: "Терапия",
  common_quest: "Общий квест",
  nuclear_medicine_economics: "Экономика ядерной медицины",
  clinical_cases: "Клинические случаи",
  emergency_situations: "Аварийные ситуации",
};

const QuestDetailsPage = () => {
  const { name: questType, id: questId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabFromURL = searchParams.get("tab") || "online";
  const [activeTab, setActiveTab] = useState(activeTabFromURL);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  const [isCorrectValues, setIsCorrectValues] = useState<{ [key: number]: boolean | null }>({});
  const [isDirty, setIsDirty] = useState(false);
  const [submittingQuestId, setSubmittingQuestId] = useState<number | null>(null);

  const title = questTypeTranslations[questType] || "Неизвестный квест";
  const questArray = questId ? [parseInt(questId, 10)] : undefined;

  const { data, isLoading, error } = useQuestTasks(questArray, undefined, page, pageSize);
  const { mutate: submitTask, isPending } = useSubmitQuestTask();

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

  interface SubmitQuestTaskRequest {
    options?: number[];
    text?: string;
  }

  const handleSubmit = (questId: number) => {
    setSubmittingQuestId(questId);
  
    const questType = quests.find((q) => q.id === questId)?.type;
    let requestData: SubmitQuestTaskRequest = {};
  
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
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

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const quests = data?.items || [];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/quests">Квесты</Link> /{" "}
        <Link to={`/quests/${questType}`}>{title}</Link>
      </div>

      <h1 className={styles.h1}>Квест</h1>

      <p className={styles.description}>
        В этом блоке вы узнаете, с чем сталкивается студент – медицинский физик
        во время обучения в ИФИБ НИЯУ МИФИ.
      </p>

      <p className={styles.description}>
        Для выполнения заданий вам необходимо быть зарегистрированными на
        платформе Stepik.
      </p>

      <p className={styles.description}>Выберите уровень сложности:</p>

      <div className={styles.tabsContainer}>
        <div className={styles.tabHeaders}>
          <button
            className={`${styles.tab} ${activeTab === "online" ? styles.active : ""}`}
            onClick={() => handleTabChange("online")}
          >
            Онлайн
          </button>
          <button
            className={`${styles.tab} ${activeTab === "offline" ? styles.active : ""}`}
            onClick={() => handleTabChange("offline")}
          >
            Оффлайн
          </button>
        </div>

        <div>
          {activeTab === "online" && (
            <div>
              {isLoading ? (
                Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className={styles.card}>
                      <Skeleton.Button className={styles.skeletonCard} active />
                      <Skeleton paragraph={{ rows: 2 }} active />
                    </div>
                  ))
              ) : quests.length === 0 ? (
                <NoData text="Данный квест пуст." />
              ) : (
                <div className={styles.cardsContainer}>
                  {quests.map((quest) => (
                    <div key={quest.id} className={styles.card}>
                      <h3 className={styles.cardTitle}>{quest.body}</h3>

                      {quest.picture && (
                        <div className={styles.cardImageContainer}>
                          <img
                            src={quest.picture || ""}
                            alt={quest.body}
                            className={styles.cardImage}
                          />
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
            </div>
          )}

          {activeTab === "offline" && (
            <p className={styles.description}>
              Здесь будет информация о оффлайн заданиях и материалах.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestDetailsPage;
