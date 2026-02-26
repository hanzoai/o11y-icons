import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgQrCode = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M14 10.667h-2A1.333 1.333 0 0 0 10.667 12v2M14 14v.007m-6-9.34v2A1.333 1.333 0 0 1 6.667 8h-2M2 8h.007M8 2h.007M8 10.667v.006M10.667 8h.666M14 8v.007M8 14v-.667M2.667 2h2c.368 0 .666.298.666.667v2a.667.667 0 0 1-.666.666h-2A.667.667 0 0 1 2 4.667v-2C2 2.298 2.298 2 2.667 2Zm8.666 0h2c.368 0 .667.298.667.667v2a.667.667 0 0 1-.667.666h-2a.667.667 0 0 1-.666-.666v-2c0-.369.298-.667.666-.667Zm-8.666 8.667h2c.368 0 .666.298.666.666v2a.667.667 0 0 1-.666.667h-2A.667.667 0 0 1 2 13.333v-2c0-.368.298-.666.667-.666Z"
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
SvgQrCode.displayName = 'SvgQrCode';
export default SvgQrCode;
