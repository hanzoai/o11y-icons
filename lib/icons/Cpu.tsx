import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgCpu = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#cpu_svg__a)">
    <path
     d="M10 1.333v1.334m0 10.666v1.334M1.333 10h1.333M1.333 6h1.333m10.667 4h1.333m-1.333-4h1.333M6 1.333v1.334m0 10.666v1.334m-2-12h8c.736 0 1.333.597 1.333 1.333v8c0 .736-.597 1.333-1.333 1.333H4A1.333 1.333 0 0 1 2.666 12V4c0-.736.597-1.333 1.334-1.333ZM6.666 6h2.667c.368 0 .667.298.667.667v2.666a.667.667 0 0 1-.667.667H6.666A.667.667 0 0 1 6 9.333V6.667C6 6.298 6.298 6 6.666 6Z"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="cpu_svg__a">
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
SvgCpu.displayName = 'SvgCpu';
export default SvgCpu;
