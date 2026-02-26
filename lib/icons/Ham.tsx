import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgHam = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#ham_svg__a)">
    <path
     d="M8.763 14.096a9.66 9.66 0 0 0 1.623-2.146c.425-.77.716-1.565.854-2.34.14-.776.124-1.517-.045-2.18a3.615 3.615 0 0 0-.937-1.688 3.614 3.614 0 0 0-1.687-.937c-.664-.169-1.405-.184-2.18-.045a7.683 7.683 0 0 0-2.341.854 9.66 9.66 0 0 0-2.146 1.623m6.859 6.859c.546-.546.708-1.43.45-2.46-.257-1.029-.912-2.118-1.822-3.027-.91-.91-1.998-1.565-3.027-1.822-1.03-.258-1.914-.095-2.46.45m6.859 6.859c-.546.546-1.43.708-2.46.45-1.029-.256-2.118-.912-3.027-1.821-.91-.91-1.565-1.999-1.823-3.028-.257-1.03-.095-1.914.451-2.46m9.14-.28L12.4 5.6a1.667 1.667 0 1 0 1.1-3.1 1.668 1.668 0 1 0-3.107 1.107l-1.349 1.35M5.667 11 5 10.333"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="ham_svg__a">
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
SvgHam.displayName = 'SvgHam';
export default SvgHam;
