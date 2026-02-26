import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgSizeSmall = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g
    clipPath="url(#size-small_svg__a)"
    stroke="#C0C1C3"
    strokeWidth={1.333}
    strokeLinecap="round"
    strokeLinejoin="round"
   >
    <path d="M9.037 6.667H6.963a.296.296 0 0 0-.296.296v2.074c0 .164.133.296.296.296h2.074a.296.296 0 0 0 .297-.296V6.963a.296.296 0 0 0-.297-.296ZM1.333 1.333h.007M4 1.333h.007M6.667 1.333h.007M9.333 1.333h.007M12 1.333h.007M14.667 1.333h.007M1.333 4h.007M4 4h.007M6.667 4h.007M9.333 4h.007M12 4h.007M14.667 4h.007M1.333 6.667h.007M4 6.667h.007M12 6.667h.007M14.667 6.667h.007M1.333 9.333h.007M4 9.333h.007M12 9.333h.007M14.667 9.333h.007M1.333 12h.007M4 12h.007M6.667 12h.007M9.333 12h.007M12 12h.007M14.667 12h.007M1.333 14.667h.007M4 14.667h.007M6.667 14.667h.007M9.333 14.667h.007M12 14.667h.007M14.667 14.667h.007" />
   </g>
   <defs>
    <clipPath id="size-small_svg__a">
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
SvgSizeSmall.displayName = 'SvgSizeSmall';
export default SvgSizeSmall;
