import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgServerCog = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#server-cog_svg__a)">
    <path
     d="M3 6.667h-.334a1.333 1.333 0 0 1-1.333-1.334V2.667a1.333 1.333 0 0 1 1.333-1.334h10.667a1.333 1.333 0 0 1 1.333 1.334v2.666a1.333 1.333 0 0 1-1.333 1.334H13M3 9.333h-.334a1.333 1.333 0 0 0-1.333 1.334v2.666a1.333 1.333 0 0 0 1.333 1.334h10.667a1.333 1.333 0 0 0 1.333-1.334v-2.666a1.333 1.333 0 0 0-1.333-1.334H13M4 4h.006M4 12h.006m6.46-3.067-.6-.2M6.133 7.267l-.6-.2m1.533 3.4.2-.6m1.8.6L8.8 9.8M7.2 6.2l-.267-.667m-1.4 3.534L6.2 8.8m3.6-1.6.666-.267m-1.533-1.4-.2.6M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="server-cog_svg__a">
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
SvgServerCog.displayName = 'SvgServerCog';
export default SvgServerCog;
