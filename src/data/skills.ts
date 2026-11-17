export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["C", "C++", "Python", "Bash"] },
  { category: "Embedded Platforms", items: ["ESP32", "STM32"] },
  { category: "Frameworks", items: ["ESP-IDF", "FreeRTOS"] },
  {
    category: "Protocols",
    items: ["UART", "SPI", "I²C", "CAN", "BLE", "Wi-Fi", "HTTP", "HTTPS", "MQTT"],
  },
  { category: "Networking", items: ["TCP/IP", "DHCP", "DNS", "OTA"] },
  { category: "Tools", items: ["Git", "PlatformIO", "VSCode", "KiCad", "Linux"] },
  { category: "Version Control", items: ["Git", "GitHub"] },
];

export const proficiency = [
  { name: "Embedded C / C++", level: 92 },
  { name: "FreeRTOS", level: 88 },
  { name: "ESP-IDF", level: 90 },
  { name: "STM32 HAL / LL", level: 78 },
  { name: "Communication Protocols", level: 85 },
  { name: "Networking & IoT", level: 82 },
  { name: "Firmware Architecture", level: 87 },
];
