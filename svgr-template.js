module.exports = function template(variables, { tpl }) {
  return tpl`
    import * as React from 'react';
    import { JSX } from 'react/jsx-runtime';
    
    export type IconSize = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

    const ICON_SIZE_MAP: Record<IconSize, number> = {
      xs: 16,
      sm: 18,
      md: 20,
      lg: 22,
      xl: 24,
      xxl: 28,
    };

    export interface IconProps extends React.SVGProps<SVGSVGElement> {
      size?: IconSize | number;
      strokeWidth?: number;
      className?: string;
    }

    const ${variables.componentName} = ({
      color = 'currentColor',
      size,
      strokeWidth = 2,
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

      const w = element.props.width != null ? Number(element.props.width) : 24;
      const h = element.props.height != null ? Number(element.props.height) : 24;
      const viewBoxWhenMissing = \`0 0 \${w} \${h}\`;

      const elementProps = {
        ...props,
        className: className ? \`signoz-icon \${className}\` : 'signoz-icon',
        ...(!isCustomIcon && { stroke: color, strokeWidth }),
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
