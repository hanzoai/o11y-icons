import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgGuitar = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#guitar_svg__a)">
    <path d="M7.666 8.667a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Z" fill="#2A2E37" />
    <path
     d="m7.933 8.067 3.01-3.01m0 0c.25-.25.39-.589.39-.942v-.896c0-.354.14-.693.39-.943l.743-.743a.667.667 0 0 1 .934 0L14.466 2.6a.666.666 0 0 1 0 .933l-.742.743c-.25.25-.59.39-.943.39h-.896c-.354 0-.693.141-.943.391ZM4 10.667 5.333 12m.133-5.4c.334-.733 1.067-1.267 1.867-1.267a3.3 3.3 0 0 1 3.333 3.334c0 .8-.533 1.533-1.266 1.866l-.6.267A1.334 1.334 0 0 0 8 12a2.667 2.667 0 0 1-2.667 2.667c-2.2 0-4-1.8-4-4A2.667 2.667 0 0 1 4 8a1.333 1.333 0 0 0 1.2-.8l.266-.6ZM8 8.333a.333.333 0 1 1-.667 0 .333.333 0 0 1 .667 0Z"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="guitar_svg__a">
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
SvgGuitar.displayName = 'SvgGuitar';
export default SvgGuitar;
