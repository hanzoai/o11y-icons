import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgBrain = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#brain_svg__a)">
    <path
     d="M8 3.333a2 2 0 1 0-3.998.084M8 3.333V12m0-8.667a2 2 0 1 1 3.998.084m-7.996 0a2.667 2.667 0 0 0-1.684 3.846m1.684-3.846a2 2 0 0 0 .266.916m-1.95 2.93a2.667 2.667 0 0 0 .37 4.392m-.37-4.392c.122-.099.253-.187.39-.263m-.02 4.655A2.667 2.667 0 1 0 8 12m-5.311-.345c.4.226.852.345 1.311.345m4 0a2.667 2.667 0 1 0 5.312-.345m-1.314-8.238a2.667 2.667 0 0 1 1.684 3.846m-1.684-3.846a2 2 0 0 1-.265.916m1.95 2.93a2.667 2.667 0 0 1-.371 4.392m.37-4.392a2.661 2.661 0 0 0-.39-.263m.02 4.655c-.4.226-.852.345-1.312.345m-2-3.333A3 3 0 0 1 8 6a3 3 0 0 1-2 2.667"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="brain_svg__a">
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
SvgBrain.displayName = 'SvgBrain';
export default SvgBrain;
