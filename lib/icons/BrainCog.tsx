import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgBrainCog = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#brain-cog_svg__a)">
    <path
     d="M11.733 4.333a2 2 0 0 0 .266-.916m-7.997 0a2 2 0 0 0 .266.916m-1.95 2.931c.122-.1.253-.188.39-.264m10.584 0c.138.076.268.165.39.264M4 12c-.46 0-.91-.118-1.311-.344m10.623 0c-.4.226-.852.344-1.312.344m-1.533-5.067-.6.267M6.134 8.8l-.6.267m3.533 1.4-.267-.6M7.2 6.133l-.266-.6M10.467 9l-.6-.267M6.134 7.267 5.534 7M7 10.467l.267-.6m1.467-3.734.266-.6m-1-2.2a2 2 0 1 0-3.998.095 2.667 2.667 0 0 0-1.684 3.847 2.667 2.667 0 0 0 .37 4.392A2.667 2.667 0 0 0 7.78 13.07c.047-.118.083-.24.109-.364.019-.087.204-.087.223 0 .026.124.062.246.109.364a2.667 2.667 0 0 0 5.09-1.404 2.668 2.668 0 0 0 .371-4.392 2.666 2.666 0 0 0-1.684-3.847A2 2 0 1 0 8 3.333ZM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="brain-cog_svg__a">
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
SvgBrainCog.displayName = 'SvgBrainCog';
export default SvgBrainCog;
