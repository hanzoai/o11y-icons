import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgPuzzle = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#puzzle_svg__a)">
    <path
     d="M12.96 5.233a.683.683 0 0 0 .192.586l1.045 1.045a1.602 1.602 0 0 1 0 2.272l-1.074 1.074a.654.654 0 0 1-.558.184c-.313-.047-.534-.32-.645-.617a1.667 1.667 0 1 0-2.143 2.143c.298.11.57.331.617.645a.653.653 0 0 1-.184.558l-1.073 1.074a1.604 1.604 0 0 1-2.273 0l-1.045-1.045a.684.684 0 0 0-.585-.193c-.329.049-.56.336-.68.645a1.667 1.667 0 1 1-2.158-2.158c.31-.12.596-.351.645-.68a.684.684 0 0 0-.193-.585L1.803 9.136A1.601 1.601 0 0 1 1.332 8c0-.411.157-.823.47-1.136L2.82 5.847a.717.717 0 0 1 .611-.202c.344.051.585.352.716.673a1.667 1.667 0 1 0 2.172-2.173c-.321-.13-.622-.372-.673-.715a.715.715 0 0 1 .202-.611l1.017-1.017A1.602 1.602 0 0 1 8 1.332c.411 0 .823.157 1.136.47l1.045 1.046c.154.153.371.225.585.193.329-.049.56-.336.68-.645a1.667 1.667 0 1 1 2.158 2.158c-.31.12-.596.35-.645.68Z"
     stroke="#2A2E37"
     strokeWidth={1.33}
     strokeLinecap="round"
     strokeLinejoin="round"
    />
   </g>
   <defs>
    <clipPath id="puzzle_svg__a">
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
SvgPuzzle.displayName = 'SvgPuzzle';
export default SvgPuzzle;
