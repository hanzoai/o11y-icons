import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgFishOff = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#fish-off_svg__a)">
    <path
     d="M12 8.333V8m-.316 3.684A4.496 4.496 0 0 1 10 12c-2.373 0-5.04-1.687-5.666-4 .232-.853.742-1.622 1.414-2.253m2.296-1.392A5.868 5.868 0 0 1 10 4c2.374 0 4.04 1.693 4.667 4a6.393 6.393 0 0 1-.942 2.039M4.667 7.113c0-1.78-.947-3.133-2.847-3.446-.666 1-.666 3.333.154 4.333-.827 1-.827 3.333-.154 4.333 1.9-.313 2.847-1.666 2.847-3.446m4.987-2.915a6.512 6.512 0 0 1 1.013-1.925m0 7.906a6.514 6.514 0 0 1-1.152-2.412m1.159 2.412-.154.934A1.334 1.334 0 0 1 9.2 14H6.334c.646-.732 1-1.677.993-2.653M5.687 2H9.2a1.333 1.333 0 0 1 1.32 1.113l.154.934m-9.34-2.714 13.333 13.334"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="fish-off_svg__a">
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
SvgFishOff.displayName = 'SvgFishOff';
export default SvgFishOff;
