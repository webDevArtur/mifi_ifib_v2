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
        { name: 'Лучевая терапия', link: `/documents/RadiationTherapy/HomeRadiationTherapy.docx` },
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
        { name: 'Техника безопасности', link: `/documents/SafetyPrecautions/HomeSafetyPrecautions.docx` },
        { name: 'Дополнение к гарантии качества', link: `/documents/SafetyPrecautions/AdditionsToTheQualityAssurance.docx` },
        { name: 'Гарантия качества', link: `/documents/SafetyPrecautions/QualityAssurance.docx` }
      ]
    },
    { 
      name: 'Нормативно-правовые документы', 
      link: `/documents/RegulatoryDocuments/HomeRegulatoryDocuments.docx`,
      subSections: [
        { name: 'Нормативно-правовые документы', link: `/documents/RegulatoryDocuments/HomeRegulatoryDocuments.docx` },
        { name: 'Лицензирование деятельности в области обращения с ИИИ', link: `/documents/RegulatoryDocuments/LicensingOfActivitiesInTheFieldOfIonizingRadiationSourcesManagement.docx` },
        { name: 'Нормы радиационной безопасности', link: `/documents/RegulatoryDocuments/RadiationSafetyStandards.docx` },
      ]
    },
    { name: 'РКТ', link: `/documents/RCT/RCT.docx` },
  ];  

  const DocHeader: React.FC = () => {
    const [glossaryAvailable, setGlossaryAvailable] = useState(false);
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
          {glossaryAvailable && (
            <Link
              to="/glossary"
              className={styles.sectionLink}
            >
              Глоссарий
            </Link>
          )}
        </div>
      </div>
    );
  };  

export default DocHeader;
