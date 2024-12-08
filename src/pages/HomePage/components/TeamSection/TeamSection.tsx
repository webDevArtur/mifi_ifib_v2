import { useTeamMembers } from "hooks/useTeamMembers";
import styles from "./TeamSection.module.scss";

const TeamSection = () => {
  const { data: teamMembers, isLoading } = useTeamMembers();

  return (
    <section className={styles.teamSection}>
      <h2 className={styles.sectionTitle}>Наша команда</h2>
      <div className={styles.teamContainer}>
        {!isLoading &&
          teamMembers &&
          teamMembers.map((member, index) => (
            <div className={styles.teamMember} key={index}>
              <img
                src={member.image}
                alt={member.name}
                className={styles.teamMemberImage}
              />
              <p className={styles.teamMemberName}>{member.name}</p>
              <p className={styles.teamMemberDescription}>
                {member.description}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TeamSection;
