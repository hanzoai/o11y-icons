import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgHopOff = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#hop-off_svg__a)">
    <path
     d="M7.213 10.747c1.127.4 2.607.526 3.453.566a.603.603 0 0 0 .467-.18m-3.707 2.58c.347.16 1.627.747 2.72.914a.52.52 0 0 0 .6-.474c.08-1.013-.2-2.286-.333-2.853m.34 2.733c1.1.42 2.453.56 3.247.607a.6.6 0 0 0 .466-.173M11.993 3.68c.83.903 1.535 1.912 2.1 3a.534.534 0 0 1-.453.753c-.78.067-1.667.014-2.6-.166m2.673.16c.16.346.747 1.626.913 2.72a.52.52 0 0 1-.206.5M3.286 3.287a6.667 6.667 0 0 0-.446 8.933c.233.287.64.267.78-.08.46-1.14.713-3.38.713-4.473.893.3 2.067.6 3.253.413a.567.567 0 0 0 .32-.16M3.68 11.993c.7.634 1.94 1.614 3 2.1a.534.534 0 0 0 .753-.453c.133-1.56-.22-3.533-1.047-5.52m-.82-6.333A6.667 6.667 0 0 1 12.22 2.84c.286.233.266.64-.08.78-1 .4-2.867.653-4.047.7m-6.76-2.987 13.333 13.334"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="hop-off_svg__a">
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
SvgHopOff.displayName = 'SvgHopOff';
export default SvgHopOff;
