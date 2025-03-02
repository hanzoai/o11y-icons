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
      const element = ${variables.jsx};
      const hasViewBox = element.props.viewBox != null;
      
      return React.cloneElement(element, {
        width: size,
        height: size,
        stroke: color,
        strokeWidth: strokeWidth,
        className: \`signoz-icon \${className || ''}\`.trim(),
        ...(hasViewBox ? {} : { viewBox: "0 0 24 24" }),
        ...props,
      });
    };

    export default ${variables.componentName};
  `;
};
