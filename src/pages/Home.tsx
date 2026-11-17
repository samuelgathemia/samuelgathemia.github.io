import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import Philosophy from "../components/sections/Philosophy";
import BlogPreview from "../components/sections/BlogPreview";
import Timeline from "../components/sections/Timeline";
import GitHubStats from "../components/sections/GitHubStats";
import Certifications from "../components/sections/Certifications";
import Contact from "../components/sections/Contact";
import { useDocumentHead } from "../hooks/useDocumentHead";

export default function Home() {
  useDocumentHead({
    title: "Samuel Gathemia — Embedded Systems Engineer",
    description:
      "Firmware, RTOS, and IoT engineering portfolio of Samuel Gathemia. ESP32, STM32, FreeRTOS, ESP-IDF.",
  });
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Philosophy />
      <BlogPreview />
      <Timeline />
      <GitHubStats />
      <Certifications />
      <Contact />
    </>
  );
}
