import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgBarChart = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g
    clipPath="url(#bar-chart_svg__a)"
    stroke="#fff"
    strokeWidth={1.333}
    strokeLinecap="round"
    strokeLinejoin="round"
   >
    <path d="M5.334 1.333H4c-.736 0-1.333.597-1.333 1.334v8C2.667 11.403 3.264 12 4 12h1.334c.736 0 1.333-.597 1.333-1.333v-8c0-.737-.597-1.334-1.333-1.334ZM12 6h-1.334c-.736 0-1.333.597-1.333 1.333v3.334c0 .736.597 1.333 1.333 1.333H12c.736 0 1.333-.597 1.333-1.333V7.333C13.333 6.597 12.736 6 12 6ZM14.666 14.667H1.333" />
   </g>
   <defs>
    <clipPath id="bar-chart_svg__a">
     <path fill="#fff" d="M0 0h16v16H0z" />
    </clipPath>
   </defs>
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
SvgBarChart.displayName = 'SvgBarChart';
export default SvgBarChart;
