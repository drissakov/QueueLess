import { getHealthSnapshot } from "@/server/health/service";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(getHealthSnapshot());
}
