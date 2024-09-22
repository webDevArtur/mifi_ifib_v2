import styles from './TeamSection.module.scss';
import member1 from './assets/member1.png';
import member2 from './assets/member2.png';

const TeamSection = () => {
  const teamMembers = [
    { name: 'Константинова Елена', image: member1 },
    { name: 'Дубов Леонид', image: member2 },
    { name: 'Громушкина Елена', image: member1 },
    { name: 'Трухин Алексей', image: member2 },
  ];

  return (
    <section className={styles.teamSection}>
      <h2 className={styles.sectionTitle}>Наша команда</h2>
      <div className={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <div className={styles.teamMember} key={index}>
            <img
              src={member.image}
              alt={member.name}
              className={styles.teamMemberImage}
            />
            <p className={styles.teamMemberName}>{member.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
