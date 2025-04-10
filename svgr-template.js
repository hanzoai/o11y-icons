module.exports = function template(variables, { tpl }) {
  return tpl`
    import * as React from 'react';
    import { JSX } from 'react/jsx-runtime';
    
    export interface IconProps extends React.SVGProps<SVGSVGElement> {
      size?: number | string;
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
      
      const elementProps = {
        width: size ?? defaultSize,
        height: size ?? defaultSize,
        className: className ? \`signoz-icon \${className}\` : 'signoz-icon',
        ...(!isCustomIcon && { stroke: color, strokeWidth }),
        ...(!isCustomIcon && !hasViewBox && { viewBox: "0 0 24 24" }),
        ...props,
      };

      return React.cloneElement(element, elementProps);
    };

    ${variables.componentName}.displayName = '${variables.componentName}';

    export default ${variables.componentName};
  `;
};
