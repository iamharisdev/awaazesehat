import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Percentage-based
const wp = (percentage: number) => (SCREEN_WIDTH * percentage) / 100;
const hp = (percentage: number) => (SCREEN_HEIGHT * percentage) / 100;

// Pixel-to-percentage converters
const pxToHp = (px: number) => (px / SCREEN_HEIGHT) * 100;
const pxToWp = (px: number) => (px / SCREEN_WIDTH) * 100;

// Font normalization
const normalizeFont = (size: number) => {
  const scale = SCREEN_WIDTH / 375;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export { wp, hp, pxToHp, pxToWp, normalizeFont };
