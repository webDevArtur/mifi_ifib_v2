export type TermKeys =
  | "radionuclidesDiagnosis"
  | "radiationTherapy"
  | "ultraSoundDiagnosis"
  | "mriDiagnosis"
  | "safety"
  | "regulatoryDocuments"
  | "X-RAY";

export const termTitles: Record<TermKeys, string> = {
  radionuclidesDiagnosis: "Радионуклидная диагностика и терапия",
  radiationTherapy: "Лучевая терапия",
  ultraSoundDiagnosis: "УЗИ",
  mriDiagnosis: "МРТ",
  safety: "Техника безопасности",
  regulatoryDocuments: "Нормативно-правовые документы",
  "X-RAY": "РКТ",
};
