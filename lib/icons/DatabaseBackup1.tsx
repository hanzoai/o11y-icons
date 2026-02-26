import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgDatabaseBackup1 = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M8 5.333c3.314 0 6-.895 6-2 0-1.104-2.686-2-6-2s-6 .896-6 2c0 1.105 2.686 2 6 2ZM14 8V3.333"
    stroke="#C0C1C3"
    strokeWidth={1.333}
    strokeLinecap="round"
    strokeLinejoin="round"
   />
   <path
    d="M2 3.333v9.334c0 .432.42.853 1.197 1.2.778.345 1.871.598 3.116.72M12.667 14l2-2-2-2"
    stroke="#C0C1C3"
    strokeWidth={1.333}
    strokeLinecap="round"
    strokeLinejoin="round"
   />
   <path
    d="M8.667 14.667v-1.334A1.333 1.333 0 0 1 10 12h4M2 8c.001.312.22.619.641.897.42.279 1.03.52 1.781.706.75.186 1.621.311 2.542.365"
    stroke="#C0C1C3"
    strokeWidth={1.333}
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
SvgDatabaseBackup1.displayName = 'SvgDatabaseBackup1';
export default SvgDatabaseBackup1;
