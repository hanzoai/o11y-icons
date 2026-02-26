import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgHop = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#hop_svg__a)">
    <path
     d="M7.213 10.747c1.127.4 2.607.526 3.454.566.366.02.666-.28.646-.646-.04-.847-.173-2.334-.566-3.454m-.334 4.087c.134.567.414 1.84.334 2.853a.515.515 0 0 1-.6.467 11.09 11.09 0 0 1-2.72-.907m3.326.32c1.1.42 2.454.56 3.247.607a.602.602 0 0 0 .64-.64 11.786 11.786 0 0 0-.6-3.247m-2.747-.34c.574.134 1.847.414 2.86.334a.514.514 0 0 0 .467-.6 11.094 11.094 0 0 0-.907-2.72m-1.72-3.747c.83.903 1.536 1.912 2.1 3a.533.533 0 0 1-.453.753c-1.553.134-3.533-.213-5.513-1.046m-4.84-3.1L2 2a.467.467 0 0 1 0-.667M6.387 8.12c.826 1.987 1.18 3.967 1.046 5.52a.534.534 0 0 1-.753.453 13.876 13.876 0 0 1-3-2.1m3.987-7.66c1.093 0 3.333-.253 4.473-.713.347-.133.367-.547.08-.78a6.667 6.667 0 0 0-9.38 9.38c.233.287.64.267.78-.08.46-1.14.713-3.38.713-4.473.894.3 2.067.6 3.254.413a.587.587 0 0 0 .486-.493c.2-1.427-.1-2.334-.406-3.254Z"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="hop_svg__a">
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
SvgHop.displayName = 'SvgHop';
export default SvgHop;
