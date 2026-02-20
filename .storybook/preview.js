import React from 'react';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
 parameters: {
  layout: 'padded',
  controls: { hideNoControlsWarning: true },
 },
 decorators: [
  (Story) =>
   React.createElement(
    'div',
    { style: { fontFamily: "'Inter', system-ui, sans-serif" } },
    React.createElement(Story),
   ),
 ],
};

export default preview;
