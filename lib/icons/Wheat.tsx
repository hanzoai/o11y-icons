import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgWheat = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#wheat_svg__a)">
    <path
     d="m1.333 14.667 9.333-9.334m0 0H12a2.667 2.667 0 0 0 2.666-2.666V1.333h-1.333A2.667 2.667 0 0 0 10.666 4v1.333Zm-6.313 6.314a2.333 2.333 0 0 0 0-3.294l-1.02-1.02-1.02 1.02a2.333 2.333 0 0 0 0 3.294l1.02 1.02m1.02-1.02-1.02 1.02m1.02-1.02a2.333 2.333 0 0 1 3.293 0l1.02 1.02-1.02 1.02a2.333 2.333 0 0 1-3.293 0l-1.02-1.02M7.02 8.98a2.333 2.333 0 0 0 0-3.293L6 4.667l-1.02 1.02a2.333 2.333 0 0 0 0 3.293L6 10m1.02-1.02L6 10m1.02-1.02a2.333 2.333 0 0 1 3.293 0l1.02 1.02-1.02 1.02a2.333 2.333 0 0 1-3.293 0L6 10m3.686-3.687a2.333 2.333 0 0 0 0-3.293L8.666 2l-1.02 1.02a2.333 2.333 0 0 0 0 3.293l1.02 1.02m1.02-1.02-1.02 1.02m1.02-1.02a2.333 2.333 0 0 1 3.294 0L14 7.333l-1.02 1.02a2.333 2.333 0 0 1-3.294 0l-1.02-1.02"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="wheat_svg__a">
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
SvgWheat.displayName = 'SvgWheat';
export default SvgWheat;
