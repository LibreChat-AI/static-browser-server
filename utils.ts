import crypto from "crypto";
import BaseX from "base-x";

const base36 = BaseX("0123456789abcdefghijklmnopqrstuvwxyz");
export function hashString(val: string): string {
  const hash = crypto.createHash("sha1");
  const data = hash.update(val, "utf-8");
  return base36.encode(data.digest());
}
