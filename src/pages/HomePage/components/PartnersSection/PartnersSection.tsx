import { usePartners } from "hooks/usePartners";
import styles from "./PartnersSection.module.scss";

const PartnersSection = () => {
  const { data: partners, isLoading } = usePartners();

  return (
    <section className={styles.partnersSection}>
      <h2 className={styles.sectionTitle}>Наши партнеры</h2>
      <div className={styles.partnersContainer}>
        {!isLoading &&
          partners &&
          partners.map((partner, index) => (
            <div className={styles.partner} key={index}>
              <img
                src={partner.logoPic}
                alt={`Логотип партнера ${partner.id}`}
                className={styles.partnerLogo}
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default PartnersSection;