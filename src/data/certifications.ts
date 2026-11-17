export interface Certification {
  title: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
}

export const certifications: Certification[] = [
  {
    title: "ESP32 Programming with ESP-IDF",
    issuer: "Espressif Academy",
    date: "2024",
    verifyUrl: "#",
  },
  {
    title: "FreeRTOS Fundamentals",
    issuer: "AWS Training",
    date: "2024",
    verifyUrl: "#",
  },
  {
    title: "Embedded Systems: Shape the World",
    issuer: "edX / UT Austin",
    date: "2023",
    verifyUrl: "#",
  },
  {
    title: "IEEE Member",
    issuer: "IEEE",
    date: "2024 — Present",
    verifyUrl: "#",
  },
];
