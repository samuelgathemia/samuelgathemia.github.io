export interface TimelineItem {
  year: string;
  title: string;
  org: string;
  kind: "Education" | "Research" | "Industry" | "Leadership" | "Project";
  body: string;
}

export const timeline: TimelineItem[] = [
  {
    year: "2025 — Present",
    title: "Embedded Software Projects",
    org: "Independent",
    kind: "Project",
    body: "Building modular firmware components — message bus, Wi-Fi manager, OTA — designed to be dropped into new ESP32 and STM32 projects.",
  },
  {
    year: "2024 — 2025",
    title: "IEEE Student Branch",
    org: "IEEE",
    kind: "Leadership",
    body: "Active member coordinating embedded systems workshops and mentoring peers on firmware fundamentals and hardware bring-up.",
  },
  {
    year: "2024",
    title: "Industrial Attachment — Embedded Firmware",
    org: "Placeholder Company",
    kind: "Industry",
    body: "Contributed to firmware for a connected device product line: driver bring-up, integration testing, and OTA pipeline hardening.",
  },
  {
    year: "2023 — 2024",
    title: "Undergraduate Research — IoT Systems",
    org: "University Research Lab",
    kind: "Research",
    body: "Investigated communication reliability of MQTT over intermittent Wi-Fi links and produced a set of reference patterns for resilient publishers.",
  },
  {
    year: "2022 — Present",
    title: "B.Sc. Electrical & Electronic Engineering",
    org: "University",
    kind: "Education",
    body: "Coursework in digital systems, control, signals, and computer architecture. Focus on embedded platforms and real-time software.",
  },
];
