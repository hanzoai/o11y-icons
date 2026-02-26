import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgStore = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#store_svg__a)">
    <path
     d="m1.333 4.667 2.94-2.94a1.333 1.333 0 0 1 .947-.394h5.56a1.333 1.333 0 0 1 .946.394l2.94 2.94m-13.333 0h13.333m-13.333 0v2A1.333 1.333 0 0 0 2.666 8m12-3.333v2A1.333 1.333 0 0 1 13.333 8M2.666 8v5.333A1.333 1.333 0 0 0 4 14.667h8a1.333 1.333 0 0 0 1.333-1.334V8M2.666 8a1.8 1.8 0 0 0 1.06-.42.467.467 0 0 1 .547 0 1.8 1.8 0 0 0 1.06.42 1.8 1.8 0 0 0 1.06-.42.467.467 0 0 1 .547 0A1.8 1.8 0 0 0 8 8a1.8 1.8 0 0 0 1.06-.42.467.467 0 0 1 .546 0 1.8 1.8 0 0 0 1.06.42 1.8 1.8 0 0 0 1.06-.42.467.467 0 0 1 .547 0 1.8 1.8 0 0 0 1.06.42M10 14.667V12a1.333 1.333 0 0 0-1.334-1.333H7.333A1.333 1.333 0 0 0 6 12v2.667"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="store_svg__a">
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
SvgStore.displayName = 'SvgStore';
export default SvgStore;
