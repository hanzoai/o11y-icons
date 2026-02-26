import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgLogs1 = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path d="M3.333 3.667v9" stroke="#fff" strokeWidth={1.333} />
   <ellipse cx={7.333} cy={3.667} rx={4} ry={1.667} stroke="#fff" strokeWidth={1.333} />
   <ellipse cx={7.333} cy={3.617} rx={1} ry={0.417} fill="#fff" />
   <path
    d="M11.333 12.667c0 .736-1.79 1.333-4 1.333s-4-.597-4-1.333"
    stroke="#fff"
    strokeWidth={1.333}
   />
   <path
    d="M6 7.333V8.61c0 .033.024.06.056.066l1.888.315A.067.067 0 0 1 8 9.056v2.277"
    stroke="#fff"
    strokeWidth={1.333}
    strokeLinecap="round"
   />
   <path
    d="M11.333 3.667v3.546c0 .052.058.084.102.057l2.487-1.555a.067.067 0 0 1 .1.04l.302 1.21a.067.067 0 0 1-.015.061l-2.959 3.288a.067.067 0 0 0-.017.045v2.308"
    stroke="#fff"
    strokeWidth={1.333}
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
SvgLogs1.displayName = 'SvgLogs1';
export default SvgLogs1;
