export function slugify(text: string): string {
  const trMap: Record<string, string> = {
    ş: "s", Ş: "s", ğ: "g", Ğ: "g", ü: "u", Ü: "u",
    ö: "o", Ö: "o", ı: "i", İ: "i", ç: "c", Ç: "c",
  };

  return text
    .split("")
    .map((c) => trMap[c] ?? c)
    .join("")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
