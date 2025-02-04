import MainBanner from "./components/MainBanner/MainBanner";
import AboutPlatform from "./components/AboutPlatform/AboutPlatform";
import AboutSection from "./components/AboutSection/AboutSection";
import PlatformSection from "./components/PlatformSection/PlatformSection";
import TeamSection from "./components/TeamSection/TeamSection";
import FeedbackSection from "./components/FeedbackSection/FeedbackSection";
import styles from "./HomePage.module.scss";
import PartnersSection from "./components/PartnersSection/PartnersSection";

function HomePage() {
  return (
    <div className={styles.homePage}>
      <MainBanner />

      <AboutPlatform />

      <AboutSection />

      <PlatformSection />

      <TeamSection />

      <PartnersSection />

      <FeedbackSection />
    </div>
  );
}

export default HomePage;
