import SectionHeading from "../SectionHeading";

export default function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          label="about"
          title="Firmware, not just code."
          description="I build embedded software that has to keep running long after the demo. My work centres on ESP32 and STM32 platforms, FreeRTOS, ESP-IDF, and the communication protocols that keep devices talking to each other and to the outside world."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Firmware architecture",
              b: "Modular components, typed message buses, and explicit state machines instead of ad-hoc flags. Boundaries follow the shape of the hardware and the problem.",
            },
            {
              t: "Real-time & networking",
              b: "FreeRTOS scheduling, ISR-safe primitives, and communication over UART, SPI, I²C, CAN, BLE, Wi-Fi, and MQTT. TCP/IP fundamentals down to the socket.",
            },
            {
              t: "System reliability",
              b: "OTA with rollback, backoff with jitter, health topics, and CLI diagnostics. Firmware that fails visibly and recovers cleanly.",
            },
          ].map((c) => (
            <article key={c.t} className="card-surface card-hover p-5">
              <h3 className="mono text-sm text-primary">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
