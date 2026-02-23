module.exports = function template(variables, { tpl }) {
 return tpl`
    import * as React from 'react';
    import { JSX } from 'react/jsx-runtime';
    
    export type IconSize = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

    const ICON_SIZE_MAP: Record<IconSize, number> = {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 20,
      xxxl: 24,
    };

    const STROKE_WIDTH_MAP: Record<IconSize, number> = {
      xs: 0.83,
      sm: 1,
      md: 1.17,
      lg: 1.33,
      xl: 1.5,
      xxl: 1.67,
      xxxl: 2,
    };

    export interface IconProps extends React.SVGProps<SVGSVGElement> {
      size?: IconSize | number;
      strokeWidth?: number;
      className?: string;
    }

    const ${variables.componentName} = ({
      color = 'currentColor',
      size,
      strokeWidth,
      className,
      ...props
    }: IconProps): JSX.Element => {
      const element = ${variables.jsx};
      const hasViewBox = element.props.viewBox != null;
      const isCustomIcon = element.props['data-custom-icon'] === 'true';
      const defaultSize = isCustomIcon ? element.props.width : ICON_SIZE_MAP.xs;
      const resolvedSize =
        size != null
          ? typeof size === 'number'
            ? size
            : ICON_SIZE_MAP[size]
          : defaultSize;
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
      const viewBoxWhenMissing = \`0 0 \${w} \${h}\`;

      const elementProps = {
        ...props,
        className: className ? \`signoz-icon \${className}\` : 'signoz-icon',
        ...(!isCustomIcon && { stroke: color, strokeWidth: resolvedStrokeWidth }),
        ...(!isCustomIcon && !hasViewBox && { viewBox: viewBoxWhenMissing }),
        ...(isCustomIcon && { style: { color, ...props.style }, viewBox: viewBoxWhenMissing }),
        width: resolvedSize,
        height: resolvedSize,
      };

      return React.cloneElement(element, elementProps);
    };

    ${variables.componentName}.displayName = '${variables.componentName}';

    export default ${variables.componentName};
  `;
};
