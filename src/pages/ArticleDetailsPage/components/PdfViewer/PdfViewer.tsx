import React from 'react';
import style from './PdfViewer.module.css';

interface PDFViewerProps {
  file: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  console.log(file);
  return (
    <object className={style.viewContainer}>
      <embed src={file} type="application/pdf" className={style.pdfViewer} />
    </object>
  );
};

export default PDFViewer;
