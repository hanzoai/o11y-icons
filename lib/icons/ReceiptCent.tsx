import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgReceiptCent = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M8 4.333v7.334m2-5.4a2.667 2.667 0 1 0 0 3.466m-7.333-8.4v13.334L4 14l1.334.667L6.667 14 8 14.667 9.334 14l1.333.667L12 14l1.334.667V1.333L12 2l-1.333-.667L9.334 2 8 1.333 6.667 2l-1.333-.667L4 2l-1.333-.667Z"
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
SvgReceiptCent.displayName = 'SvgReceiptCent';
export default SvgReceiptCent;
