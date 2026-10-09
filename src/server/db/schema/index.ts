// QueueLess database tables will be introduced with the booking domain in Stage 2.
// Keeping the schema entry point in place lets Drizzle Kit and the Neon client share
// a stable import path without creating or mutating database tables in Stage 1.
export const schema = {};
