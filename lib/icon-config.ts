export type IconSize = '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export const ICON_SIZE_MAP: Record<IconSize, number> = {
 xs: 10,
 sm: 12,
 md: 14,
 lg: 16,
 xl: 18,
 '2xl': 20,
 '3xl': 24,
 '4xl': 28,
 '5xl': 32,
};

export const STROKE_WIDTH_MAP: Record<IconSize, number> = {
 xs: 0.83,
 sm: 1,
 md: 1.17,
 lg: 1.33,
 xl: 1.5,
 '2xl': 1.67,
 '3xl': 2,
 '4xl': 2.33,
 '5xl': 2.67,
};

export type IconStrokeWidth = (typeof STROKE_WIDTH_MAP)[IconSize];
