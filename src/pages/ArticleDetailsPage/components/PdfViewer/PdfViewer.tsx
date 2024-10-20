import React from "react";
import style from "./PdfViewer.module.scss";

interface PDFViewerProps {
  file: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  return (
    <div className={style.container}>
      <iframe
        src={file}
        width="800"
        height="500"
        className={style.pdfViewer}
      ></iframe>
    </div>
  );
};

export default PDFViewer;
