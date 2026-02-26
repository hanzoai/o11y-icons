import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgSettings = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M8.147 1.333h-.294A1.333 1.333 0 0 0 6.52 2.667v.12a1.333 1.333 0 0 1-.667 1.153l-.286.167a1.333 1.333 0 0 1-1.334 0l-.1-.054a1.333 1.333 0 0 0-1.82.487l-.146.253a1.333 1.333 0 0 0 .486 1.82l.1.067a1.333 1.333 0 0 1 .667 1.147v.34a1.333 1.333 0 0 1-.667 1.16l-.1.06a1.333 1.333 0 0 0-.486 1.82l.146.253a1.333 1.333 0 0 0 1.82.487l.1-.054a1.334 1.334 0 0 1 1.334 0l.286.167a1.333 1.333 0 0 1 .667 1.153v.12a1.333 1.333 0 0 0 1.333 1.334h.294a1.333 1.333 0 0 0 1.333-1.334v-.12a1.334 1.334 0 0 1 .667-1.153l.286-.167a1.334 1.334 0 0 1 1.334 0l.1.054a1.333 1.333 0 0 0 1.82-.487l.146-.26a1.334 1.334 0 0 0-.486-1.82l-.1-.053a1.334 1.334 0 0 1-.667-1.16v-.334a1.333 1.333 0 0 1 .667-1.16l.1-.06a1.334 1.334 0 0 0 .486-1.82l-.146-.253a1.333 1.333 0 0 0-1.82-.487l-.1.054a1.333 1.333 0 0 1-1.334 0l-.286-.167a1.333 1.333 0 0 1-.667-1.153v-.12a1.333 1.333 0 0 0-1.333-1.334Z"
    stroke="#2A2E37"
    strokeWidth={1.33}
    strokeLinecap="round"
    strokeLinejoin="round"
   />
   <path
    d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    stroke="#2A2E37"
    strokeWidth={1.33}
    strokeLinecap="round"
    strokeLinejoin="round"
   />
  </svg>
 );
 const hasViewBox = element.props.viewBox != null;
 const isCustomIcon = element.props['data-custom-icon'] === 'true';
 const defaultSize = isCustomIcon ? element.props.width : ICON_SIZE_MAP.xs;
 const resolvedSize =
  size != null ? (typeof size === 'number' ? size : ICON_SIZE_MAP[size]) : defaultSize;
 const resolvedStrokeWidth =
  strokeWidth != null
   ? strokeWidth
   : typeof size === 'string' && size in STROKE_WIDTH_MAP
     ? STROKE_WIDTH_MAP[size]
     : size == null
       ? STROKE_WIDTH_MAP.xs
       : 2;
 const w = element.props.width != null ? Number(element.props.width) : 24;
 const h = element.props.height != null ? Number(element.props.height) : 24;
 const viewBoxWhenMissing = `0 0 ${w} ${h}`;
 const elementProps = {
  ...props,
  className: className ? `signoz-icon ${className}` : 'signoz-icon',
  ...(!isCustomIcon && {
   stroke: color,
   strokeWidth: resolvedStrokeWidth,
  }),
  ...(!isCustomIcon &&
   !hasViewBox && {
    viewBox: viewBoxWhenMissing,
   }),
  ...(isCustomIcon && {
   style: {
    color,
    ...props.style,
   },
   viewBox: viewBoxWhenMissing,
  }),
  width: resolvedSize,
  height: resolvedSize,
 };
 return cloneElement(element, elementProps);
};
SvgSettings.displayName = 'SvgSettings';
export default SvgSettings;
