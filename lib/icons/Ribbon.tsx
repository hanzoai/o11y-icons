import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgRibbon = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M7.993 7.48c.675-.812 1.34-1.48 1.34-2.147a1.333 1.333 0 1 0-2.667 0C6.666 6 7.333 6.665 8 7.48L6.233 9.687M8 12l1.713-2.333M8 12l1.764 2.401a.667.667 0 0 0 .922.144l1.263-.907a.666.666 0 0 0 .135-.953L9.713 9.667M8 12l-1.786 2.395a.667.667 0 0 1-.927.142l-1.243-.902a.666.666 0 0 1-.136-.948l2.325-3m3.48-.02c1.101-1.51 2.283-2.854 2.287-5 0-.884-.422-1.732-1.172-2.357-.75-.625-1.767-.977-2.828-.977s-2.079.352-2.829.977S4 3.783 4 4.667c0 2.147 1.152 3.497 2.233 5.02M4.162 6.01a4.667 4.667 0 0 1 7.671-.006"
    stroke="#2A2E37"
    strokeWidth={1.33}
    strokeLinecap="round"
    strokeLinejoin="round"
   />
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
SvgRibbon.displayName = 'SvgRibbon';
export default SvgRibbon;
