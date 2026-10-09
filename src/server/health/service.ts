export function getHealthSnapshot() {
  return {
    status: "ok" as const,
    service: "queueless",
    timestamp: new Date().toISOString(),
  };
}
