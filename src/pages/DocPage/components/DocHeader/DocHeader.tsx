import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mifiLogo from "./assets/mifiLogo.png";
import styles from './DocHeader.module.scss';

const sections = [
    { name: 'Радионуклидная диагностика и терапия', link: `/documents/RadionuclideDiagnosticsAndTherapy/RPP.docx` },
    { 
      name: 'Лучевая терапия', 
      link: `/documents/RadiationTherapy/HomeRadiationTherapy.docx`,
      subSections: [
        { name: 'Лучевая терапия протонами и пучками ионов', link: `/documents/RadiationTherapy/RadiationTherapyWithProtonsAndIonBeams.docx` },
        { name: 'Нейтронная терапия', link: `/documents/RadiationTherapy/NeutronTherapy.docx` },
        { name: 'Спецификация объёмов', link: `/documents/RadiationTherapy/VolumeSpecification.docx` },
        { name: 'IMRT', link: `/documents/RadiationTherapy/IMRT.docx` },
        { name: 'Дополнение к IMRT', link: `/documents/RadiationTherapy/AdditionToIMRT.docx` },
        { name: '3D Конформная лучевая терапия', link: `/documents/RadiationTherapy/3DConformalRadiationTherapy.docx` },
        { name: 'IGRT', link: `/documents/RadiationTherapy/IGRT.docx` },
        { name: 'Брахетерапия', link: `/documents/RadiationTherapy/Brachytherapy.docx` },
      ]
    },
    { name: 'УЗИ', link: `/documents/UltrasoundScan/UltrasoundReferenceBook.docx` },
    { name: 'МРТ', link: `/documents/MRIScan/MRIReferenceBook.docx` },
    { name: 'Техника безопасности',
      link: `/documents/SafetyPrecautions/HomeSafetyPrecautions.docx`,
      subSections: [
        { name: 'Дополнение к гарантии качества', link: `/documents/SafetyPrecautions/AdditionsToTheQualityAssurance.docx` },
        { name: 'Гарантия качества', link: `/documents/SafetyPrecautions/QualityAssurance.docx` }
      ]
    },
    { 
      name: 'Нормативно-правовые документы', 
      link: `/documents/RegulatoryDocuments/HomeRegulatoryDocuments.docx`,
      subSections: [
        { name: 'Лицензирование деятельности в области обращения с ИИИ', link: `/documents/RegulatoryDocuments/LicensingOfActivitiesInTheFieldOfIonizingRadiationSourcesManagement.docx` },
        { name: 'Нормы радиационной безопасности', link: `/documents/RegulatoryDocuments/RadiationSafetyStandards.docx` },
        { name: 'Основные санитарные правила обеспечения радиационной безопасности', link: `/documents/RegulatoryDocuments/BasicSanitaryRulesForRadiationSafety.docx` },
        { name: 'Контроль и учет индивидуальных доз облучения граждан', link: `/documents/RegulatoryDocuments/AssessmentAccountingAndControlOfEffectiveRadiationDosesToPatientsDuringRadionuclideDiagnosticStudies.docx` },
        { name: 'Основные правила учета и контроля радиоактивных веществ и радиоактивных отходов в организации', link: `/documents/RegulatoryDocuments/BasicRulesForAccountingAndControlOfRadioactiveSubstancesAndRadioactiveWasteInAnOrganization.docx` },
        { name: 'Правила физической защиты радиоактивных веществ, радиационных источников, отдельных ядерных материалов и пунктов хранения', link: `/documents/RegulatoryDocuments/RulesForThePhysicalProtectionOfRadioactiveSubstancesRadiationSourcesIndividualNuclearMaterialsAndStorageFacilities.docx` },
        { name: 'Требования к программам обеспечения качества', link: `/documents/RegulatoryDocuments/RequirementsForQualityAssurancePrograms.docx` },
        { name: 'Безопасность при обращении с радиоактивными отходами. Общие положения', link: `/documents/RegulatoryDocuments/SafetyInRadioactiveWasteManagementGeneralProvisions.docx` },
        { name: 'Сбор, переработка, хранение и кондиционирование жидких радиоактивных отходов. Требования безопасности.', link: `/documents/RegulatoryDocuments/CollectionProcessingStorageAndConditioningOfLiquidRadioactiveWasteSafetyRequirements.docx` },
        { name: 'Система менеджмента качества', link: `/documents/RegulatoryDocuments/QualityManagementSystem.docx` },
        { name: 'Гигиенические требования по обеспечению радиационной безопасности при проведении лучевой терапии с помощью открытых радионуклидных источников', link: `/documents/RegulatoryDocuments/HygienicRequirementsForRadiationSafetyDuringRadiationTherapyUsingOpenRadionuclideSources.docx` },
        { name: 'Гигиенические требования к устройству и эксплуатации рентгеновских кабинетов, аппаратов и проведению рентгенологических исследований', link: `/documents/RegulatoryDocuments/HygienicRequirementsForTheInstallationAndOperationOfX-rayRoomsDevicesAndX-rayExaminations.docx` },
        { name: 'Гигиенические требования по обеспечению радиационной безопасности при проведении радионуклидной диагностики с помощью радиофармпрепаратов', link: `/documents/RegulatoryDocuments/HygienicRequirementsForRadiationSafetyDuringRadionuclideDiagnosticsUsingRadiopharmaceuticals.docx` },
        { name: 'Оценка, учет и контроль эффективных доз облучения пациентов при проведении радионуклидных диагностических исследований', link: `/documents/RegulatoryDocuments/AssessmentAccountingAndControlOfEffectiveRadiationDosesToPatientsDuringRadionuclideDiagnosticStudies.docx` },
        { name: 'Гигиенические требования по обеспечению радиационной безопасности при подготовке и проведении позитронной эмиссионной томографии', link: `/documents/RegulatoryDocuments/HygienicRequirementsForThePlacementAndOperationOfElectronAcceleratorsWithAnEnergyOfUpTo100MeV.docx` },
        { name: 'Гигиенические требования по обеспечению радиационной безопасности при внутритканевой лучевой терапии (брахитерапии) методом имплантации закрытых радионуклидных источников', link: `/documents/RegulatoryDocuments/HRfRSdInterstitialRadiationTherapy-brachytherapy-byImplantationOfClosedRadionuclideSources.docx` },
        { name: 'Мониторинг и учет индивидуальных доз облучения граждан', link: `/documents/RegulatoryDocuments/MonitoringAndAccountingOfIndividualRadiationDosesOfCitizens.docx` }
      ]
    }
  ];  

  const DocHeader: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
    return (
      <div className={styles.docHeader}>
        <div className={styles.logo}>
          <Link to="/documents/HomePage/HomePage.docx">
            <img src={mifiLogo} alt="Logo" className={styles.logoImg} />
          </Link>
        </div>
        <div className={styles.sections}>
          {sections.map((section) => (
            <div 
              key={section.name} 
              className={styles.sectionWrapper} 
              onMouseEnter={() => section.subSections && setOpenDropdown(section.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={section.subSections ? "#" : section.link}
                className={styles.sectionLink}
              >
                {section.name}
              </Link>
              {section.subSections && openDropdown === section.name && (
                <div className={styles.dropdownMenu}>
                  {section.subSections.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.link}
                      className={styles.dropdownItem}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };  

export default DocHeader;
