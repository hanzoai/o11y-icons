import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgSofa = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M13.333 6V4A1.334 1.334 0 0 0 12 2.667H4A1.333 1.333 0 0 0 2.666 4v2m10.667 0a1.333 1.333 0 0 1 1.333 1.333v3.334A1.333 1.333 0 0 1 13.333 12m0-6A1.333 1.333 0 0 0 12 7.333v1a.333.333 0 0 1-.334.334H4.333A.333.333 0 0 1 4 8.333v-1A1.333 1.333 0 0 0 2.666 6m0 0a1.333 1.333 0 0 0-1.333 1.333v3.334A1.333 1.333 0 0 0 2.666 12m0 0h10.667M2.666 12v1.333M13.333 12v1.333M8 2.667v6"
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
SvgSofa.displayName = 'SvgSofa';
export default SvgSofa;
