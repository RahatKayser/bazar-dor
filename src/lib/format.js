
export const bn = (n, opts) => Number(n).toLocaleString("bn-BD", opts);
export const taka = (n) => `${bn(n)} টাকা`;

const UNITS = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
  gram: "গ্রাম",
  g: "গ্রাম",
};
export const unitBn = (u) => UNITS[String(u).toLowerCase()] ?? u;


export function changeInfo(change) {
  const pct = Math.abs(change?.pct ?? 0);
  const text =
    bn(pct, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%";
  if (change?.dir === "up")
    return { symbol: "▲", text, cls: "text-green-700 bg-green-100" };
  if (change?.dir === "down")
    return { symbol: "▼", text, cls: "text-red-700 bg-red-100" };
  return { symbol: "—", text, cls: "text-gray-600 bg-gray-100" };
}

export const num = (n) =>
  Number.isInteger(n)
    ? bn(n)
    : bn(n, { minimumFractionDigits: 2, maximumFractionDigits: 2 });