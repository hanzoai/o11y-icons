import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgConfigure = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M9.711 4.745a.576.576 0 0 0 0 .806l.922.922a.576.576 0 0 0 .806 0l2.17-2.171a3.455 3.455 0 0 1-4.572 4.572l-3.979 3.98a1.222 1.222 0 1 1-1.728-1.728l3.98-3.98a3.455 3.455 0 0 1 4.572-4.572L9.717 4.739l-.006.006Z"
    stroke="#fff"
    strokeWidth={1.333}
    strokeLinecap="round"
    strokeLinejoin="round"
   />
   <path
    d="M4 7 2.528 5.566a1.333 1.333 0 0 1-.013-1.898l.81-.81a1.333 1.333 0 0 1 1.992.119L5.334 3M10.75 10.988l1.18 1.178m0 0-.139.138a.833.833 0 0 0 1.179 1.178l.446-.445a.833.833 0 0 0-1.179-1.179l-.308.308Z"
    stroke="#fff"
    strokeWidth={1.333}
    strokeLinecap="round"
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
SvgConfigure.displayName = 'SvgConfigure';
export default SvgConfigure;
