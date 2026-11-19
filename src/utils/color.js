/** "#A3E635" -> "163 230 53" (space-separated channels for CSS rgb()). */
export function hexToChannels(hex) {
  const m = hex.trim().replace('#', '');
  const full =
    m.length === 3
      ? m
          .split('')
          .map((c) => c + c)
          .join('')
      : m;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}
