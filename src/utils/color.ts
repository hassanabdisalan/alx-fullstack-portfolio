import { readableColor } from "polished";
export function getTextColorFromHex(hexColor?: string | null): string {
  if (!hexColor) {
    return "#ffffff"; // Default to white text
  }
  if (!hexColor.startsWith("#")) {
    hexColor = `#${hexColor}`;
  }
//   const rgbColor = parseToRgb(hexColor);
  const textColor = readableColor(hexColor, "#fff", "#000000");
  return textColor

}
