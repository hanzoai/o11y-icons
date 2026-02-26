import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgPalette = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#palette_svg__a)">
    <path
     d="M9 4.667A.333.333 0 1 0 9 4a.333.333 0 0 0 0 .667ZM11.666 7.333a.333.333 0 1 0 0-.666.333.333 0 0 0 0 .666ZM5.666 5.333a.333.333 0 1 0 0-.666.333.333 0 0 0 0 .666ZM4.333 8.667a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Z"
     fill="#2A2E37"
    />
    <path
     d="M9 4.667A.333.333 0 1 0 9 4a.333.333 0 0 0 0 .667ZM11.666 7.333a.333.333 0 1 0 0-.666.333.333 0 0 0 0 .666ZM5.666 5.333a.333.333 0 1 0 0-.666.333.333 0 0 0 0 .666ZM4.333 8.667a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667Z"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
    <path
     d="M8 1.333c-3.667 0-6.667 3-6.667 6.667s3 6.667 6.667 6.667c.617 0 1.098-.498 1.098-1.126 0-.291-.12-.556-.291-.75-.193-.192-.292-.434-.292-.75a1.094 1.094 0 0 1 1.112-1.112h1.33a3.717 3.717 0 0 0 3.704-3.702C14.643 4.008 11.641 1.333 8 1.333Z"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="palette_svg__a">
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
SvgPalette.displayName = 'SvgPalette';
export default SvgPalette;
