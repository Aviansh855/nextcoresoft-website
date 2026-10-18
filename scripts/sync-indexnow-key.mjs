/**
 * Publishes IndexNow key file at site root (required by Bing/Yandex IndexNow).
 * Key value: shared/indexnow-key.txt → public/{key}.txt
 */
import { copyFileSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const key = readFileSync(join(root, "shared", "indexnow-key.txt"), "utf8").trim()
if (!/^[a-f0-9]{32}$/i.test(key)) {
  throw new Error("indexnow-key.txt must be a 32-character hex string")
}
const dest = join(root, "public", `${key}.txt`)
copyFileSync(join(root, "shared", "indexnow-key.txt"), dest)
console.log(`Wrote IndexNow key file public/${key}.txt`)
