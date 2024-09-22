import styles from './TeamSection.module.scss';

const TeamSection = () => {
  const teamMembers = [
    { name: 'Константинова Елена', image: 'src/assets/member1.png' },
    { name: 'Дубов Леонид', image: 'src/assets/member2.png' },
    { name: 'Громушкина Елена', image: 'src/assets/member1.png' },
    { name: 'Трухин Алексей', image: 'src/assets/member2.png' },
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
