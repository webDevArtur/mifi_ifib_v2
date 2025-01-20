import React from "react";
import styles from "./QuestCard.module.scss";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import arrowIcon from "./assets/arrow-icon.png";

type QuestCardProps = {
  title: string;
  isOnline?: boolean | string;
  rating?: number;
  backgroundImage?: string;
  questCount?: number;
};

const onlineStatusText: Record<string, string> = {
  true: "Онлайн",
  false: "Оффлайн",
  all: "Онлайн и Оффлайн",
};

const QuestCard: React.FC<QuestCardProps> = ({
  title,
  isOnline,
  rating,
  backgroundImage,
  questCount,
}) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.cardHeader}>
          <div className={styles.tags}>
          {isOnline === "all" ? (
              <>
                <span className={styles.tag}>{onlineStatusText["true"]}</span>
                <span className={styles.tag}>{onlineStatusText["false"]}</span>
              </>
            ) : isOnline !== undefined ? (
              <span className={styles.tag}>
                {onlineStatusText[String(isOnline)]}
              </span>
            ) : null}

            {rating && (
              <div className={styles.rating}>
                {[...Array(3)].map((_, i) =>
                  i < rating ? <StarFilled key={i} /> : <StarOutlined key={i} />
                )}
              </div>
            )}
          </div>

          {questCount && (
            <span className={styles.questCount}>{questCount}+ квестов</span>
          )}
        </div>

        <div className={styles.title}>
          {title}

          <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
