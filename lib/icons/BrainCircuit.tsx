import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgBrainCircuit = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M4.002 3.417A2 2 0 1 1 8 3.333V12M4.002 3.417a2.667 2.667 0 0 0-1.684 3.846m1.684-3.846a2 2 0 0 0 .266.916m-1.95 2.93a2.667 2.667 0 0 0 .37 4.392m-.37-4.392c.122-.099.253-.187.39-.263m-.02 4.655A2.667 2.667 0 1 0 8 12m-5.311-.345c.4.226.852.345 1.311.345m4 0h4a1.333 1.333 0 0 1 1.334 1.333V14M6 8.667A3 3 0 0 0 8 6m0 2.667h2.667M8 5.333h5.334m-2.667 0v-2A1.333 1.333 0 0 1 12 2m-1 6.667a.333.333 0 1 1-.666 0 .333.333 0 0 1 .666 0ZM12.334 2a.333.333 0 1 1-.667 0 .333.333 0 0 1 .667 0Zm1.333 12A.333.333 0 1 1 13 14a.333.333 0 0 1 .667 0Zm0-8.667a.333.333 0 1 1-.667 0 .333.333 0 0 1 .667 0Z"
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
SvgBrainCircuit.displayName = 'SvgBrainCircuit';
export default SvgBrainCircuit;
