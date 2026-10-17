/**
 * Snapshot ROUTE_META for JSON-LD graph (avoids pulling blog-posts.mjs into the client bundle).
 */
import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { ROUTE_META } from "../shared/route-meta.mjs"

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "shared", "route-meta-snapshot.json")
writeFileSync(out, `${JSON.stringify(ROUTE_META, null, 2)}\n`, "utf8")
console.log(`Wrote ${out} (${Object.keys(ROUTE_META).length} routes).`)
