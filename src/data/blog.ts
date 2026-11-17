export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  preview: string;
  body: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "message-bus-freertos",
    title: "Designing a Message Bus in FreeRTOS",
    date: "2025-08-14",
    readingTime: "8 min",
    tags: ["FreeRTOS", "Architecture", "C"],
    preview:
      "Direct task-to-task queues create combinatorial coupling. A typed pub/sub bus keeps modules independent without giving up determinism.",
    body: [
      "Most embedded systems begin with a handful of tasks talking through direct queues. It works — until the tenth feature lands and every module knows every other module's queue handle.",
      "A message bus flips the ownership arrow. Producers publish to typed topics. Subscribers register interest. Neither knows the other exists, and the coupling collapses to a single dependency: the bus itself.",
      "The implementation is small. A static topic table maps topic IDs to a linked list of subscribers. Each subscriber owns a private queue and a backpressure policy. Publishing walks the list once.",
      "The subtle part is backpressure. A slow subscriber must not block a fast producer. Choose a policy — drop-oldest, drop-newest, or overwrite — and encode it into the subscription so failure modes are explicit.",
    ],
  },
  {
    slug: "wifi-manager-esp-idf",
    title: "Building a Wi-Fi Manager in ESP-IDF",
    date: "2025-07-02",
    readingTime: "10 min",
    tags: ["ESP-IDF", "Networking", "State Machines"],
    preview:
      "Wi-Fi in ESP-IDF fires events. Treat those events as inputs to a state machine and reconnection becomes a solved problem.",
    body: [
      "The default Wi-Fi examples in ESP-IDF are demo code. They connect, they log, and they leave everything else to you — including reconnection, provisioning, and lifecycle.",
      "The right model is a state machine: IDLE, PROVISIONING, CONNECTING, CONNECTED, RECONNECTING, FAILED. Every ESP-IDF Wi-Fi event maps to a transition.",
      "Backoff with jitter is essential. Routers reboot in bursts across a neighbourhood; if every device retries on the same cadence, they collide.",
      "Provisioning is a separate state, not a boot-time detour. Users lose credentials, routers change, and firmware must handle re-provisioning without a reflash.",
    ],
  },
  {
    slug: "event-loops",
    title: "Understanding Event Loops in Embedded Systems",
    date: "2025-06-11",
    readingTime: "7 min",
    tags: ["Architecture", "FreeRTOS"],
    preview:
      "An event loop is not a design pattern you import. It is the shape your firmware converges to when you take determinism seriously.",
    body: [
      "Every embedded system has an event loop, whether it is written as one or not. Interrupts, timers, and I/O drive the flow of control.",
      "Making the loop explicit — one task that consumes typed events from a queue and dispatches to handlers — turns concurrency into a scheduling problem instead of a mystery.",
      "Handlers must be short. Anything long-running belongs on its own task with its own queue, publishing completion events back to the loop.",
    ],
  },
  {
    slug: "state-machines",
    title: "State Machines in Embedded Systems",
    date: "2025-05-03",
    readingTime: "9 min",
    tags: ["Architecture", "C"],
    preview:
      "Flags multiply. State machines don't. A one-page state table is worth more than a week of debugging.",
    body: [
      "The `if (isConnected && !isReconnecting && !isProvisioning)` guard is a symptom. What you have is a state machine trying to escape a pile of booleans.",
      "Write the states down. Write the events. Draw the transitions. The picture usually reveals two or three transitions the original code missed.",
      "A generated dispatch table beats a switch statement once you have more than a handful of states. It also gives you a place to hang entry and exit actions.",
    ],
  },
  {
    slug: "maintainable-firmware",
    title: "Creating Maintainable Firmware",
    date: "2025-04-18",
    readingTime: "6 min",
    tags: ["Philosophy", "Architecture"],
    preview:
      "Firmware lives on hardware for years. The question is not whether it will change, but whether the next change will be cheap or expensive.",
    body: [
      "Maintainability is measured in the cost of the next change. Every abstraction that reduces that cost pays for itself; every one that does not is dead weight.",
      "Boundaries between modules should follow the shape of the hardware and the shape of the problem, not the order the code was written.",
      "Logging, health topics, and a CLI are not optional in production firmware. You cannot fix what you cannot see.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
