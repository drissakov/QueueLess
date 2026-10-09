import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// R2-backed incremental caching can be added when the production bucket exists.
// Stage 1 keeps the adapter configuration intentionally stateless.
export default defineCloudflareConfig({});
