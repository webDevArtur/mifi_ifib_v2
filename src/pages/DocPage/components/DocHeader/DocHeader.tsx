import React, { useState } from 'react';
import Skeleton from 'antd/lib/skeleton';
import { Link } from 'react-router-dom';
import {useSections} from 'hooks/useSections';
import mifiLogo from "./assets/mifiLogo.png";
import styles from './DocHeader.module.scss';

  const DocHeader: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const { data: sections, isLoading } = useSections();
  
    return (
      <div className={styles.docHeader}>
        <div className={styles.logo}>
            <img src={mifiLogo} alt="Logo" className={styles.logoImg} />
        </div>
        <div className={styles.sections}>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton.Button key={index} className={styles.skeletonButton} />
          ))
        ) : (
          sections?.map((section) => (
            <div 
              key={section.link}
              className={styles.sectionWrapper} 
              onMouseEnter={() => section.subSections && setOpenDropdown(section.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={section.link}
                className={styles.sectionLink}
              >
                {section.name}
              </Link>
              {section.subSections && openDropdown === section.name && (
                <div className={styles.dropdownMenu}>
                  {section.subSections.map((sub) => (
                    <Link
                      key={sub.link}
                      to={sub.link}
                      className={styles.dropdownItem}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )))
        }
        </div>
      </div>
    );
  };  

export default DocHeader;
