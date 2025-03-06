import React, { useState } from 'react';
import mifiLogo from "./assets/mifiLogo.png";
import styles from './DocHeader.module.scss';

const baseUrl = import.meta.env.VITE_BASE_URL;

const sections = [
    { name: 'Радионуклидная диагностика и терапия', link: `${baseUrl}documents/RadionuclideDiagnosticsAndTherapy/RPP.docx` },
    { 
      name: 'Лучевая терапия', 
      link: `${baseUrl}documents/RadiationTherapy/HomeRadiationTherapy.docx`,
      subSections: [
        { name: 'Лучевая терапия', link: `${baseUrl}documents/RadiationTherapy/HomeRadiationTherapy.docx` },
        { name: 'Лучевая терапия протонами и пучками ионов', link: `${baseUrl}documents/RadiationTherapy/RadiationTherapyWithProtonsAndIonBeams.docx` },
        { name: 'Нейтронная терапия', link: `${baseUrl}documents/RadiationTherapy/NeutronTherapy.docx` },
        { name: 'Спецификация объёмов', link: `${baseUrl}documents/RadiationTherapy/VolumeSpecification.docx` },
        { name: 'IMRT', link: `${baseUrl}documents/RadiationTherapy/IMRT.docx` },
        { name: 'Дополнение к IMRT', link: `${baseUrl}documents/RadiationTherapy/AdditionToIMRT.docx` },
        { name: '3D Конформная лучевая терапия', link: `${baseUrl}documents/RadiationTherapy/3DConformalRadiationTherapy.docx` },
        { name: 'IGRT', link: `${baseUrl}documents/RadiationTherapy/IGRT.docx` },
        { name: 'Брахетерапия', link: `${baseUrl}documents/RadiationTherapy/Brachytherapy.docx` },
      ]
    },
    { name: 'УЗИ', link: `${baseUrl}documents/UltrasoundScan/UltrasoundReferenceBook.docx` },
    { name: 'МРТ', link: `${baseUrl}documents/MRIScan/MRIReferenceBook.docx` },
    { name: 'Техника безопасности',
      link: `${baseUrl}documents/SafetyPrecautions/HomeSafetyPrecautions.docx`,
      subSections: [
        { name: 'Техника безопасности', link: `${baseUrl}documents/SafetyPrecautions/HomeSafetyPrecautions.docx` },
        { name: 'Дополнение к гарантии качества', link: `${baseUrl}documents/SafetyPrecautions/AdditionsToTheQualityAssurance.docx` },
        { name: 'Гарантия качества', link: `${baseUrl}documents/SafetyPrecautions/QualityAssurance.docx` }
      ]
    },
    { 
      name: 'Нормативно-правовые документы', 
      link: `${baseUrl}documents/RegulatoryDocuments/HomeRegulatoryDocuments.docx`,
      subSections: [
        { name: 'Нормативно-правовые документы', link: `${baseUrl}documents/RegulatoryDocuments/HomeRegulatoryDocuments.docx` },
        { name: 'Лицензирование деятельности в области обращения с ИИИ', link: `${baseUrl}documents/RegulatoryDocuments/LicensingOfActivitiesInTheFieldOfIonizingRadiationSourcesManagement.docx` },
        { name: 'Нормы радиационной безопасности', link: `${baseUrl}documents/RegulatoryDocuments/RadiationSafetyStandards.docx` },
        { name: 'Основные санитарные правила', link: `${baseUrl}documents/RegulatoryDocuments/BasicSanitaryRulesForRadiationSafety.docx` },
        { name: 'Контроль и учет индивидуальных доз', link: `${baseUrl}documents/RegulatoryDocuments/MonitoringAndAccountingOfIndividualRadiationDosesOfCitizens.docx` },
        { name: 'Правила учета и контроля РВ и РАО', link: `${baseUrl}documents/RegulatoryDocuments/BasicRulesForAccountingAndControlOfRadioactiveSubstancesAndRadioactiveWasteInAnOrganization.docx` },
        { name: 'Правила физической защиты', link: `${baseUrl}documents/RegulatoryDocuments/RulesForThePhysicalProtectionOfRadioactiveSubstancesRadiationSourcesIndividualNuclearMaterialsAndStorageFacilities.docx` },
        { name: 'Требования к программам обеспечения качества', link: `${baseUrl}documents/RegulatoryDocuments/RequirementsForQualityAssurancePrograms.docx` },
        { name: 'Безопасность при обращении с РАО', link: `${baseUrl}documents/RegulatoryDocuments/SafetyInRadioactiveWasteManagementGeneralProvisions.docx` },
        { name: 'Переработка и хранение жидких РАО', link: `${baseUrl}documents/RegulatoryDocuments/CollectionProcessingStorageAndConditioningOfLiquidRadioactiveWasteSafetyRequirements.docx` },
        { name: 'Система менеджмента качества', link: `${baseUrl}documents/RegulatoryDocuments/QualityManagementSystem.docx` },
        { name: 'Гигиенические требования при лучевой терапии', link: `${baseUrl}documents/RegulatoryDocuments/HygienicRequirementsForRadiationSafetyDuringRadiationTherapyUsingOpenRadionuclideSources.docx` },
        { name: 'Гигиенические требования к рентгену', link: `${baseUrl}documents/RegulatoryDocuments/HygienicRequirementsForTheInstallationAndOperationOfX-rayRoomsDevicesAndX-rayExaminations.docx` },
        { name: 'Гигиенические требования к радионуклидной диагностике', link: `${baseUrl}documents/RegulatoryDocuments/HygienicRequirementsForRadiationSafetyDuringRadionuclideDiagnosticsUsingRadiopharmaceuticals.docx` },
        { name: 'Оценка доз при радионуклидных исследованиях', link: `${baseUrl}documents/RegulatoryDocuments/AssessmentAccountingAndControlOfEffectiveRadiationDosesToPatientsDuringRadionuclideDiagnosticStudies.docx` },
        { name: 'Гигиенические требования к ПЭТ', link: `${baseUrl}documents/RegulatoryDocuments/HygienicRequirementsForRadiationSafetyDuringPreparationAndConductOfPositronEmissionTomography.docx` },
      ]
    },
    { name: 'РКТ', link: `${baseUrl}documents/RCT/RCT.docx` },
  ];  

  const DocHeader: React.FC = () => {
    const [glossaryAvailable, setGlossaryAvailable] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
    return (
      <div className={styles.docHeader}>
        <div className={styles.logo}>
          <a href={`${baseUrl}documents/HomePage/HomePage.docx`}>
            <img src={mifiLogo} alt="Logo" className={styles.logoImg} />
          </a>
        </div>
        <div className={styles.sections}>
          {sections.map((section) => (
            <div 
              key={section.name} 
              className={styles.sectionWrapper} 
              onMouseEnter={() => section.subSections && setOpenDropdown(section.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={section.subSections ? undefined : section.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sectionLink}
              >
                {section.name}
              </a>
              {section.subSections && openDropdown === section.name && (
                <div className={styles.dropdownMenu}>
                  {section.subSections.map((sub) => (
                    <a
                      key={sub.name}
                      href={sub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.dropdownItem}
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {glossaryAvailable && (
            <a
              href="/glossary"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sectionLink}
            >
              Глоссарий
            </a>
          )}
        </div>
      </div>
    );
  };  

export default DocHeader;