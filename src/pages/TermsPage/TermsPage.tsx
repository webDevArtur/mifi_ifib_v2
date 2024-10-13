import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useTermsIdByType, useTerms } from 'hooks/useTerms';
import RegistrationBlock from 'components/RegistrationBlock/RegistrationBlock';
import { Input, Button, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { NoData } from 'components/NoData/NoData';
import styles from './TermsPage.module.scss';

const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');

type TermKeys = "radionuclidesDiagnosis" | "radiationTherapy" | "ultraSoundDiagnosis" | "mriDiagnosis" | "safety" | "regulatoryDocuments";

const termTitles: Record<TermKeys, string> = {
  radionuclidesDiagnosis: "Радионуклидная диагностика и терапия",
  radiationTherapy: "Лучевая терапия",
  ultraSoundDiagnosis: "УЗИ",
  mriDiagnosis: "МРТ",
  safety: "Техника безопасности",
  regulatoryDocuments: "Нормативно-правовые документы",
};

const DEBOUNCE_DELAY = 800;

const TermsPage = () => {
  const { type } = useParams<{ type: TermKeys }>();
  const [activeTab, setActiveTab] = useState('terms');
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialLetter = searchParams.get('letter') || 'А';

  const [selectedLetter, setSelectedLetter] = useState<string>(initialSearch ? '' : initialLetter);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const [search, setSearch] = useState<string>(initialSearch);
  const [allTerms, setAllTerms] = useState<any[]>([]);
  const { data: termsId } = useTermsIdByType(type);

  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const { data: terms, isLoading: isLoadingTerms } = useTerms(
    termsId?.id,
    selectedLetter,
    debouncedSearch,
    pageSize,
    currentPage
  );

  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (terms?.items) {
      setAllTerms(prev => (currentPage === 1 ? terms.items : [...prev, ...terms.items]));
      setTotalPages(terms.totalPages);
    }
  }, [terms, currentPage]);

  useEffect(() => {
    if (debouncedSearch.trim() === '') {
      searchParams.delete('search');
    } else {
      searchParams.set('search', debouncedSearch);
    }

    if (selectedLetter === 'А' || selectedLetter === '') {
      searchParams.delete('letter');
    } else {
      searchParams.set('letter', selectedLetter);
    }

    setSearchParams(searchParams);
  }, [debouncedSearch, selectedLetter, setSearchParams, searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSelectedLetter(search.trim() === '' ? 'А' : '');
      setDebouncedSearch(search);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setCurrentPage(1);
  };

  const handleLetterClick = (letter: string) => {
    if (letter !== selectedLetter && search.trim() === '') {
      setSelectedLetter(letter);
      setCurrentPage(1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Главная</Link> / <Link to="/knowledge">База знаний</Link> /
      </div>

      <h1>{termTitles[type as TermKeys] || ''}</h1>
      <p className={styles.description}>
        Рекомендуется проходить материалы в указанной последовательности для лучшего усвоения темы.
      </p>

      <div className={styles.tabs}>
        {['terms', 'equipment', 'materials', 'tasks'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? styles.activeTab : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'terms' ? 'Термины' : tab === 'equipment' ? 'Используемое оборудование' : tab === 'materials' ? 'Учебные материалы' : 'Задания'}
          </button>
        ))}
      </div>

      <Input
        className={styles.searchInput}
        placeholder="Введите название термина"
        prefix={<SearchOutlined />}
        value={search}
        onChange={handleSearchChange}
        bordered={false}
      />

      {debouncedSearch.trim() === '' && (
        <div className={styles.alphabet}>
          {alphabet.map(letter => (
            <span
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className={selectedLetter === letter ? styles.activeLetter : ''}
              style={{ cursor: 'pointer', marginRight: '5px' }}
            >
              {letter}
            </span>
          ))}
        </div>
      )}

      <div className={styles.termsList}>
        {isLoadingTerms && currentPage === 1 ? (
          <Skeleton active paragraph={{ rows: 18 }} title={false} className={styles.skeleton} />
        ) : allTerms.length > 0 ? (
          allTerms.map(({ name, definition, id }) => (
            <div className={styles.term} key={id}>
              <h3>{name}</h3>
              <p>{definition}</p>
            </div>
          ))
        ) : (
          <NoData />
        )}
      </div>

      <div className={styles.buttonContainer}>
        {!isLoadingTerms && totalPages > currentPage && (
          <Button
            className={styles.button}
            type="primary"
            onClick={() => setCurrentPage(prev => prev + 1)}
            loading={isLoadingTerms}
          >
            Показать ещё
          </Button>
        )}
      </div>

      <RegistrationBlock />
    </div>
  );
};

export default TermsPage;
