export type PracticumKeys =
  | "vert"
  | "virtualSimulators"
  | "planningSystems"
  | "ultrasound"
  | "mri"
  | "gamma"
  | "biopac"
  | "gate"
  | "monitor"
  | "lingwaves";

export const practicumTitles: Record<PracticumKeys, string> = {
  vert: "VERT",
  virtualSimulators: "Виртуальные тренажеры ИФИБ",
  planningSystems: "Система планирования",
  ultrasound: "УЗИ",
  mri: "МРТ",
  gamma: "Гамма-спектрометр",
  biopac: "Biopac",
  gate: "GATE",
  monitor: "Monitor",
  lingwaves: "Lingwaves",
};
