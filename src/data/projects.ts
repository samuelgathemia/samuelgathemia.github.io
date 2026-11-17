export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  featured?: boolean;
  repo?: string;
  demo?: string;
  problem: string;
  objectives: string[];
  architecture: string;
  hardware: string[];
  software: string[];
  directoryTree: string;
  codeSnippet: { language: string; code: string; caption?: string };
  lessons: string[];
  future: string[];
}

const p = (slug: string, data: Omit<Project, "slug">): Project => ({ slug, ...data });

export const projects: Project[] = [
  p("smartlights", {
    title: "SmartLights",
    tagline: "Distributed smart lighting control for residential IoT",
    description:
      "A distributed smart lighting platform built around ESP32 nodes coordinated by a lightweight MQTT broker, with scheduling, scenes, and over-the-air updates.",
    stack: ["ESP32", "ESP-IDF", "FreeRTOS", "MQTT", "OTA", "Wi-Fi"],
    featured: true,
    repo: "https://github.com/samuelgathemia/smartlights",
    problem:
      "Off-the-shelf smart lighting is closed, cloud-locked, and unreliable when the internet drops. Homes need local-first control with strong operational guarantees.",
    objectives: [
      "Local-first control that keeps working without internet",
      "Sub-100 ms latency between control app and node",
      "OTA updates with rollback on failed boot",
      "Deterministic behaviour under Wi-Fi flapping",
    ],
    architecture:
      "Each ESP32 node runs a supervisor task, a network task, and a lighting task communicating through a typed message bus. A local MQTT broker fans commands to nodes and mirrors state.",
    hardware: ["ESP32-WROOM-32", "MOSFET dimmer channels", "DHT22 ambient sensor"],
    software: ["ESP-IDF v5", "FreeRTOS", "mbedTLS", "cJSON", "MQTT client"],
    directoryTree: `smartlights/
├── components/
│   ├── msg_bus/
│   ├── wifi_manager/
│   ├── ota/
│   └── lighting/
├── main/
│   └── app_main.c
├── sdkconfig.defaults
└── CMakeLists.txt`,
    codeSnippet: {
      language: "c",
      caption: "Lighting task consuming events from the message bus",
      code: `static void lighting_task(void *arg) {
    msg_bus_sub_t sub = msg_bus_subscribe(TOPIC_LIGHT_CMD);
    light_cmd_t cmd;
    for (;;) {
        if (msg_bus_receive(sub, &cmd, portMAX_DELAY) == ESP_OK) {
            driver_set_level(cmd.channel, cmd.level);
            msg_bus_publish(TOPIC_LIGHT_STATE, &cmd, sizeof(cmd));
        }
    }
}`,
    },
    lessons: [
      "A typed message bus removes brittle direct task-to-task coupling",
      "OTA rollback is non-negotiable; validate boot before marking image",
      "Wi-Fi reconnection must be a state machine, not a retry loop",
    ],
    future: [
      "Matter over Thread bridge",
      "Per-node energy metering",
      "Web-based commissioning UI",
    ],
  }),
  p("esp32-lighting-controller", {
    title: "ESP32 Smart Lighting Controller",
    tagline: "Single-node PWM dimmer with scene engine",
    description:
      "A compact PWM lighting controller with a scene engine, physical rotary encoder input, and REST + MQTT control surfaces.",
    stack: ["ESP32", "ESP-IDF", "FreeRTOS", "HTTP", "MQTT"],
    featured: true,
    repo: "https://github.com/samuelgathemia/esp32-lighting-controller",
    problem:
      "Consumer dimmers ship inflexible firmware. Custom lighting installs need per-channel curves, scene recall, and remote control.",
    objectives: [
      "4-channel 12-bit PWM with gamma correction",
      "Scene engine with fade curves",
      "REST + MQTT parity for every command",
    ],
    architecture:
      "A control-plane task decodes commands from HTTP or MQTT into a common event queue consumed by the PWM driver task.",
    hardware: ["ESP32-C3", "IRLZ44N MOSFETs", "Rotary encoder"],
    software: ["ESP-IDF", "LEDC driver", "esp_http_server", "cJSON"],
    directoryTree: `controller/
├── components/scene_engine/
├── components/pwm_driver/
├── main/app_main.c
└── web/`,
    codeSnippet: {
      language: "c",
      code: `static uint16_t gamma_correct(uint16_t input) {
    // 12-bit input, 12-bit output
    const float g = 2.2f;
    float norm = input / 4095.0f;
    return (uint16_t)(powf(norm, g) * 4095.0f);
}`,
    },
    lessons: ["Perceived brightness needs gamma", "REST and MQTT must not diverge in state"],
    future: ["DMX512 output channel", "TLS on the REST surface"],
  }),
  p("freertos-message-bus", {
    title: "FreeRTOS Message Bus",
    tagline: "Publish/subscribe message bus for FreeRTOS applications",
    description:
      "A lightweight, allocation-free publish/subscribe message bus for FreeRTOS. Fixed-size topics, per-subscriber queues, zero dynamic allocation after init.",
    stack: ["FreeRTOS", "C", "ESP-IDF", "STM32"],
    featured: true,
    repo: "https://github.com/samuelgathemia/freertos-message-bus",
    problem:
      "Direct task-to-task queues create hard coupling and combinatorial complexity. Firmware needs a broker abstraction that stays deterministic.",
    objectives: [
      "O(subscribers) publish, no heap after init",
      "Portable across ESP-IDF and STM32 HAL",
      "Static analysis clean under Cppcheck",
    ],
    architecture:
      "A topic table indexes subscriber lists. Publishing walks the list and pushes to each subscriber's private queue. Backpressure policies are per-subscriber.",
    hardware: ["Any FreeRTOS target"],
    software: ["FreeRTOS 10+", "C11"],
    directoryTree: `msg_bus/
├── include/msg_bus.h
├── src/msg_bus.c
└── test/`,
    codeSnippet: {
      language: "c",
      code: `esp_err_t msg_bus_publish(msg_topic_t topic, const void *data, size_t len) {
    if (topic >= TOPIC_COUNT) return ESP_ERR_INVALID_ARG;
    subscriber_t *s = topics[topic].head;
    while (s) {
        xQueueSend(s->queue, data, 0);
        s = s->next;
    }
    return ESP_OK;
}`,
    },
    lessons: ["Backpressure is a contract, not an afterthought"],
    future: ["Snapshot / replay for debugging", "Priority topics"],
  }),
  p("wifi-manager", {
    title: "Wi-Fi Manager",
    tagline: "Robust Wi-Fi provisioning and lifecycle for ESP-IDF",
    description:
      "A state-machine driven Wi-Fi manager handling provisioning, reconnection, captive portal, and credential storage in NVS.",
    stack: ["ESP32", "ESP-IDF", "Wi-Fi", "NVS", "HTTP"],
    featured: true,
    repo: "https://github.com/samuelgathemia/wifi-manager",
    problem:
      "Wi-Fi bring-up code in most projects is a retry-loop that misbehaves on router reboots, DHCP delays, and provisioning corner cases.",
    objectives: [
      "Deterministic state machine with clear transitions",
      "Captive portal for first-time provisioning",
      "Backoff with jitter on repeated failure",
    ],
    architecture:
      "IDLE → PROVISIONING → CONNECTING → CONNECTED → RECONNECTING states, driven by the ESP-IDF event loop.",
    hardware: ["ESP32 family"],
    software: ["ESP-IDF v5", "esp_http_server", "NVS"],
    directoryTree: `wifi_manager/
├── include/wifi_manager.h
├── src/wifi_manager.c
├── src/captive_portal.c
└── html/`,
    codeSnippet: {
      language: "c",
      code: `static void on_disconnect(void *arg, esp_event_base_t base, int32_t id, void *data) {
    if (state == STATE_CONNECTED) transition(STATE_RECONNECTING);
    uint32_t delay = backoff_next_ms(&bo);
    xTimerChangePeriod(reconnect_timer, pdMS_TO_TICKS(delay), 0);
}`,
    },
    lessons: ["Every network event is a state transition, not a side effect"],
    future: ["WPA3-Enterprise", "Multi-AP roaming"],
  }),
  p("uart-cli-framework", {
    title: "UART CLI Framework",
    tagline: "Extensible command-line shell over UART for firmware",
    description:
      "A small footprint CLI framework with command registration, history, tab-completion, and argument parsing for firmware bring-up and field diagnostics.",
    stack: ["C", "FreeRTOS", "UART"],
    repo: "https://github.com/samuelgathemia/uart-cli-framework",
    problem:
      "Field diagnostics need a shell. Ad-hoc `printf` menus don't scale beyond a handful of commands.",
    objectives: [
      "Zero-heap command registration",
      "Line editing with history",
      "Argument parsing with type validation",
    ],
    architecture:
      "A line reader feeds tokens to a dispatcher that matches against a static command table populated at link time.",
    hardware: ["Any UART-capable MCU"],
    software: ["FreeRTOS optional"],
    directoryTree: `cli/
├── include/cli.h
├── src/cli.c
└── src/line_edit.c`,
    codeSnippet: {
      language: "c",
      code: `CLI_COMMAND(reboot, "reboot the device", NULL, {
    printf("rebooting...\\n");
    esp_restart();
    return 0;
});`,
    },
    lessons: ["A CLI pays for itself the first time you're in the field"],
    future: ["Scriptable macros", "Telnet transport"],
  }),
  p("esp-http-server", {
    title: "HTTP Server",
    tagline: "Minimal HTTP surface for constrained devices",
    description:
      "A small HTTP server built on esp_http_server with JSON helpers, auth middleware, and static asset serving from an embedded partition.",
    stack: ["ESP32", "ESP-IDF", "HTTP", "cJSON"],
    repo: "https://github.com/samuelgathemia/esp-http-server",
    problem:
      "Every embedded project reinvents JSON parsing, auth, and asset serving on top of esp_http_server.",
    objectives: [
      "Typed request/response helpers",
      "Static asset partition with gzip",
      "Basic auth middleware",
    ],
    architecture:
      "Handlers are registered via a table. Middleware runs before the handler and can short-circuit the response.",
    hardware: ["ESP32 family"],
    software: ["ESP-IDF", "cJSON", "mbedTLS"],
    directoryTree: `http_server/
├── include/
├── src/
└── assets/`,
    codeSnippet: {
      language: "c",
      code: `HTTP_ROUTE(GET, "/api/state", [](httpd_req_t *req) {
    cJSON *root = cJSON_CreateObject();
    cJSON_AddStringToObject(root, "state", state_name());
    return http_send_json(req, root);
});`,
    },
    lessons: ["Serve gzipped assets from a dedicated partition"],
    future: ["HTTP/2", "WebSocket helpers"],
  }),
  p("ota-update-system", {
    title: "OTA Update System",
    tagline: "Signed, resumable OTA with rollback",
    description:
      "An over-the-air firmware update pipeline with signed images, resumable downloads, and automatic rollback if the new image fails to boot cleanly.",
    stack: ["ESP32", "ESP-IDF", "mbedTLS", "HTTPS"],
    repo: "https://github.com/samuelgathemia/ota-update-system",
    problem:
      "OTA that bricks a device in the field is worse than no OTA. Updates must be safe, verifiable, and reversible.",
    objectives: [
      "Ed25519 signature verification",
      "Resume interrupted downloads",
      "Auto-rollback on failed post-boot health check",
    ],
    architecture:
      "Downloader task fetches signed image, verifies, writes to the passive slot, and arms rollback until the new firmware confirms health.",
    hardware: ["ESP32 with dual OTA partitions"],
    software: ["ESP-IDF app_update", "mbedTLS", "libsodium (optional)"],
    directoryTree: `ota/
├── src/downloader.c
├── src/verifier.c
└── src/health.c`,
    codeSnippet: {
      language: "c",
      code: `if (!image_signature_valid(&hdr, pubkey)) {
    ESP_LOGE(TAG, "signature mismatch, aborting OTA");
    esp_ota_abort(handle);
    return ESP_ERR_INVALID_CRC;
}`,
    },
    lessons: ["Sign your firmware. Rollback everything."],
    future: ["Delta updates", "Multi-image atomic bundles"],
  }),
  p("sensor-dashboard", {
    title: "Sensor Dashboard",
    tagline: "Real-time telemetry viewer for IoT fleets",
    description:
      "A browser dashboard that subscribes to MQTT telemetry from a fleet of embedded sensors, with time-series charts and per-device drill-down.",
    stack: ["React", "MQTT", "WebSocket", "TypeScript"],
    repo: "https://github.com/samuelgathemia/sensor-dashboard",
    problem:
      "Firmware without observability is a black box. Fleets need a low-friction way to see what devices are doing.",
    objectives: [
      "Live MQTT subscription over WebSocket",
      "Per-device history with downsampling",
      "Alert thresholds",
    ],
    architecture:
      "Browser client connects to an MQTT broker over WebSocket, buffers messages in a ring, and renders charts with virtualization.",
    hardware: ["Any MQTT-publishing embedded device"],
    software: ["React", "mqtt.js", "uPlot"],
    directoryTree: `dashboard/
├── src/
│   ├── mqtt/
│   ├── charts/
│   └── pages/
└── vite.config.ts`,
    codeSnippet: {
      language: "ts",
      code: `client.on("message", (topic, payload) => {
  const sample = JSON.parse(payload.toString()) as Sample;
  ringBuffers.get(sample.deviceId)?.push(sample);
});`,
    },
    lessons: ["Downsample before you chart, not after"],
    future: ["Server-side retention", "Alert routing to email/SMS"],
  }),
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
