/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#2563eb'; // primary (blue-600)
const tintColorDark = '#60a5fa'; // primary (blue-400)

export const Colors = {
  light: {
    text: '#0f172a',
    textSecondary: '#475569',
    background: '#ffffff',
    surface: '#ffffff',
    border: '#e5e7eb',
    tint: tintColorLight,
    primary: tintColorLight,
    primaryMuted: '#dbeafe',
    gradientStart: '#1d4ed8',
    gradientEnd: '#3b82f6',
    icon: '#64748b',
    tabIconDefault: '#64748b',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#e5e7eb',
    textSecondary: '#9ba1a6',
    background: '#151718',
    surface: '#1f2326',
    border: '#2d3338',
    tint: tintColorDark,
    primary: tintColorDark,
    primaryMuted: '#0b1220',
    gradientStart: '#0b3b7a',
    gradientEnd: '#2563eb',
    icon: '#9ba1a6',
    tabIconDefault: '#9ba1a6',
    tabIconSelected: tintColorDark,
  },
};
