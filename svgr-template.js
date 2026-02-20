module.exports = function template(variables, { tpl }) {
  return tpl`
    import * as React from 'react';
    import { JSX } from 'react/jsx-runtime';
    
    export type IconSize = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

    const ICON_SIZE_MAP: Record<IconSize, number> = {
      xxl: 24,
      xl: 18,
      lg: 16,
      md: 14,
      sm: 12,
      xs: 10,
    };

    export interface IconProps extends React.SVGProps<SVGSVGElement> {
      size?: IconSize;
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
      const defaultSize = isCustomIcon ? element.props.width : 16;
      const resolvedSize = size != null ? ICON_SIZE_MAP[size] : defaultSize;

      const elementProps = {
        width: resolvedSize,
        height: resolvedSize,
        className: className ? \`signoz-icon \${className}\` : 'signoz-icon',
        ...(!isCustomIcon && { stroke: color, strokeWidth }),
        ...(!isCustomIcon && !hasViewBox && { viewBox: "0 0 24 24" }),
        ...(isCustomIcon && { style: { color, ...props.style }, viewBox: "0 0 24 24" }),
        ...props,
      };

      return React.cloneElement(element, elementProps);
    };

    ${variables.componentName}.displayName = '${variables.componentName}';

    export default ${variables.componentName};
  `;
};
