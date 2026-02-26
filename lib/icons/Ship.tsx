import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgShip = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#ship_svg__a)">
    <path
     d="M1.333 14c.4.333.8.667 1.667.667 1.666 0 1.666-1.334 3.333-1.334.867 0 1.267.334 1.667.667.4.333.8.667 1.666.667 1.667 0 1.667-1.334 3.334-1.334.866 0 1.266.334 1.666.667m-1.746-.667a7.733 7.733 0 0 0 1.08-4L8 6.667m0 0L2 9.333c0 1.934.626 3.56 1.873 5.174M8 6.667v2.666m4.666-.666v-4a1.333 1.333 0 0 0-1.333-1.334H4.666a1.333 1.333 0 0 0-1.333 1.334v4M8 1.333v2"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="ship_svg__a">
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
SvgShip.displayName = 'SvgShip';
export default SvgShip;
