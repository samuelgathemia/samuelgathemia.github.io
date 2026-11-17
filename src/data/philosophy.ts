export interface Principle {
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    title: "Modular by default",
    body: "Firmware modules expose narrow interfaces and hide their storage. If a change ripples across three files, the boundary is wrong.",
  },
  {
    title: "Event-driven, not polling",
    body: "State transitions are driven by events on a queue. Polling loops hide latency and starve lower-priority work.",
  },
  {
    title: "State machines over flags",
    body: "Explicit state machines make invalid states unrepresentable. Boolean flags multiply until nothing is safe to change.",
  },
  {
    title: "Loose coupling via message buses",
    body: "Tasks publish and subscribe to typed topics. Producers never learn who is listening.",
  },
  {
    title: "Deterministic behaviour",
    body: "Real-time systems must be predictable. Bounded loops, static allocation after init, and known worst-case timing.",
  },
  {
    title: "Fail visibly, recover cleanly",
    body: "Errors surface through logs, health topics, and rollback paths. A silent failure is a bug that ships.",
  },
];
