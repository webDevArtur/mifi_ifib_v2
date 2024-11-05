import React from "react";
import { LocalizationMap, Worker, Viewer } from "@react-pdf-viewer/core";
import ru_RU from "@react-pdf-viewer/locales/lib/ru_RU.json";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import style from "./PdfViewer.module.scss";

interface PDFViewerProps {
  file: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const toolbarPluginInstance = toolbarPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div className={style.pdfContainer}>
        <Viewer
          fileUrl={file}
          plugins={[defaultLayoutPluginInstance, toolbarPluginInstance]}
          localization={ru_RU as unknown as LocalizationMap}
        />
      </div>
    </Worker>
  );
};

export default PDFViewer;
