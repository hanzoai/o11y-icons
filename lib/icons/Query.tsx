import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgQuery = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M8 5.333c3.314 0 6-.895 6-2 0-1.104-2.686-2-6-2s-6 .896-6 2c0 1.105 2.686 2 6 2Z"
    stroke="#fff"
    strokeWidth={1.333}
    strokeLinecap="round"
    strokeLinejoin="round"
   />
   <path
    d="M2 3.333v9.334c-.004.32.224.636.664.922.44.285 1.078.53 1.862.716.785.186 1.691.306 2.644.35.953.045 1.923.012 2.83-.095M14 3.333V7"
    stroke="#fff"
    strokeWidth={1.333}
    strokeLinecap="round"
    strokeLinejoin="round"
   />
   <path
    d="M2 8c.001.312.22.619.641.897.42.279 1.03.52 1.781.706.75.186 1.621.311 2.542.365.921.054 1.867.035 2.763-.055M12 10.187c.133-.267.333-.534.6-.667a1.4 1.4 0 0 1 1.733.267c.2.266.334.533.334.866 0 .867-1.334 1.334-1.334 1.334M13.333 14.667v.006"
    stroke="#fff"
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
SvgQuery.displayName = 'SvgQuery';
export default SvgQuery;
