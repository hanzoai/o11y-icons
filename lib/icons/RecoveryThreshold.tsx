import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgRecoveryThreshold = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M2 2v10.667A1.333 1.333 0 0 0 3.333 14h2.334"
    stroke="#fff"
    strokeWidth={1.333}
    strokeLinecap="round"
    strokeLinejoin="round"
   />
   <path
    d="m4.667 10.195 2.097-2.292a.333.333 0 0 1 .472 0l2.195 2.194a.332.332 0 0 0 .472 0l2.861-2.861"
    stroke="#fff"
    strokeWidth={1.333}
    strokeLinecap="round"
   />
   <path
    d="M2.667 4.667h11.667"
    stroke="#fff"
    strokeWidth={1.333}
    strokeLinecap="round"
    strokeDasharray="2.67 2.67"
   />
   <path
    d="M8 14h5.469a1.221 1.221 0 0 0 1.037-.593 1.189 1.189 0 0 0 0-1.184l-.817-1.413"
    stroke="#fff"
    strokeWidth={1.333}
    strokeLinecap="round"
    strokeLinejoin="round"
   />
   <path
    d="M9.333 12.667 8 14l1.333 1.333"
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
SvgRecoveryThreshold.displayName = 'SvgRecoveryThreshold';
export default SvgRecoveryThreshold;
