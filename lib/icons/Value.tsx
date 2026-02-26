import type React from 'react';
import { cloneElement } from 'react';
import type { IconSize } from '../icon-config.js';
import { ICON_SIZE_MAP, STROKE_WIDTH_MAP } from '../icon-config.js';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
 size?: IconSize | number;
 strokeWidth?: number;
 className?: string;
}
const SvgValue = ({
 color = 'currentColor',
 size,
 strokeWidth,
 className,
 ...props
}: IconProps): React.ReactElement => {
 const element = (
  <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <path
    d="M5.25 1.75H2.917A1.167 1.167 0 0 0 1.75 2.917V5.25m3.5-3.5h5.833a1.167 1.167 0 0 1 1.167 1.167V5.25m-7 7h5.833a1.167 1.167 0 0 0 1.167-1.167V5.25m-7 7H2.917a1.167 1.167 0 0 1-1.167-1.167V5.25"
    stroke="#fff"
    strokeWidth={1.167}
    strokeLinecap="round"
    strokeLinejoin="round"
   />
   <path
    d="M5.697 9.03c-.33 0-.57-.186-.57-.573v-.15H3.843c-.436 0-.738-.277-.738-.676 0-.22.074-.45.234-.735.267-.481.52-.9.837-1.396.342-.538.62-.723 1.09-.723.602 0 1 .333 1 .837V7.38h.095c.316 0 .467.197.467.465 0 .267-.154.461-.47.461h-.091v.151c0 .387-.243.573-.57.573ZM5.16 7.429V5.654H5.14a14.295 14.295 0 0 0-1.046 1.74v.035h1.068Zm2.595 1.53c-.393 0-.564-.22-.564-.522 0-.222.103-.393.33-.584l1.131-.968c.462-.396.593-.576.593-.82 0-.26-.2-.44-.493-.44-.216 0-.364.1-.518.323-.16.233-.305.319-.536.319-.307 0-.495-.18-.495-.47 0-.094.017-.183.054-.268.216-.49.794-.795 1.512-.795 1 0 1.638.504 1.638 1.25 0 .553-.285.841-.923 1.394l-.749.646v.023h1.305c.301 0 .472.18.472.456 0 .27-.17.455-.472.455H7.756Z"
    fill="#fff"
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
SvgValue.displayName = 'SvgValue';
export default SvgValue;
