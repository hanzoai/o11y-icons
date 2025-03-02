module.exports = function template(variables, { tpl }) {
  return tpl`
    import * as React from 'react';
    import { JSX } from 'react/jsx-runtime';
    
    export interface IconProps extends React.SVGProps<SVGSVGElement> {
      size?: number | string;
      strokeWidth?: number;
    }

    const ${variables.componentName} = ({
      color = 'currentColor',
      size = 16,
      strokeWidth = 2,
      className,
      ...props
    }: IconProps): JSX.Element => {
      return React.cloneElement(${variables.jsx}, {
        width: size,
        height: size,
        stroke: color,
        strokeWidth: strokeWidth,
        className: \`signoz-icon \${className || ''}\`.trim(),
        ...props,
      });
    };

    export default ${variables.componentName};
  `;
};
