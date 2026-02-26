import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgQuote = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M10.667 2a1.333 1.333 0 0 0-1.334 1.333v4a1.333 1.333 0 0 0 1.334 1.334.667.667 0 0 1 .666.666V10A1.333 1.333 0 0 1 10 11.333a.667.667 0 0 0-.667.667v1.333A.667.667 0 0 0 10 14a4 4 0 0 0 4-4V3.333A1.334 1.334 0 0 0 12.667 2h-2ZM3.333 2A1.333 1.333 0 0 0 2 3.333v4a1.333 1.333 0 0 0 1.333 1.334.667.667 0 0 1 .667.666V10a1.333 1.333 0 0 1-1.333 1.333A.667.667 0 0 0 2 12v1.333a.667.667 0 0 0 .667.667 4 4 0 0 0 4-4V3.333A1.333 1.333 0 0 0 5.333 2h-2Z"
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
SvgQuote.displayName = 'SvgQuote';
export default SvgQuote;
