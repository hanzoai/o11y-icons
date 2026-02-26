import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgSolidServer = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g
    clipPath="url(#solid-server_svg__a)"
    strokeWidth={1.333}
    strokeLinecap="round"
    strokeLinejoin="round"
   >
    <path
     d="M13.333 1.333H2.666c-.736 0-1.333.597-1.333 1.334v2.666c0 .737.597 1.334 1.333 1.334h10.667c.736 0 1.333-.597 1.333-1.334V2.667c0-.737-.597-1.334-1.333-1.334ZM13.333 9.333H2.666c-.736 0-1.333.597-1.333 1.334v2.666c0 .737.597 1.334 1.333 1.334h10.667c.736 0 1.333-.597 1.333-1.334v-2.666c0-.737-.597-1.334-1.333-1.334Z"
     fill="#fff"
     stroke="#fff"
    />
    <path d="M4 4h.007M4 12h.007" stroke="#0B0C0E" />
   </g>
   <defs>
    <clipPath id="solid-server_svg__a">
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
SvgSolidServer.displayName = 'SvgSolidServer';
export default SvgSolidServer;
