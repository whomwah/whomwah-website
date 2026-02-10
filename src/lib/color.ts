/**
 * Validates and normalizes a hex color input.
 * Returns null if invalid, otherwise returns a 6-character uppercase hex string.
 */
export function normalizeHex(input: string): string | null {
  const query = input.replace("#", "").trim();
  if (!/^([0-9A-F]{3}){1,2}$/i.test(query)) {
    return null;
  }
  if (query.length === 3) {
    return query
      .split("")
      .map((c) => c + c)
      .join("")
      .toUpperCase();
  }
  return query.toUpperCase();
}

/**
 * Converts a 6-character hex string to RGB values.
 */
export function hexToRgb(hex: string): [number, number, number] {
  return [0, 2, 4].map((p) => parseInt(hex.substring(p, p + 2), 16)) as [
    number,
    number,
    number,
  ];
}

/**
 * Converts RGB values to a hex string with # prefix.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) =>
        Math.max(0, Math.min(255, Math.round(x)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
      .toUpperCase()
  );
}

/**
 * Converts RGB values (0-255) to HSL values (0-1).
 */
export function rgbToHsl(
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else if (max === b) h = (r - g) / d + 4;
    h /= 6;
  }
  return [h, s, l];
}

/**
 * Converts HSL values (0-1) to a hex string with # prefix.
 */
export function hslToHex(h: number, s: number, l: number): string {
  h = (h + 1) % 1;
  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return rgbToHex(
    hue2rgb(p, q, h + 1 / 3) * 255,
    hue2rgb(p, q, h) * 255,
    hue2rgb(p, q, h - 1 / 3) * 255,
  );
}
