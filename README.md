# @signoz/icons

## Description

`@signoz/icons` is a collection of SVG-based React icon components. This package provides a set of customizable icons that can be easily integrated into your React projects.

## Features

- SVG-based icons for high-quality rendering
- Customizable via React props
- Easy integration with React projects

## Installation

To install the package, use npm:

```bash
npm install @signoz/icons
```

## Usage

To use an icon in your project, import it from the package and include it in your component:

```jsx
import { IconName } from '@signoz/icons';

const MyComponent = () => (
  <IconName />
);
```

Replace `IconName` with the actual name of the icon you want to use.

## Scripts

The following scripts are available in the package:

- `prebuild`: Cleans the `src` and `dist` directories using `rimraf`.
- `build`: Runs the `svgr` script and then builds the project using `rollup`.
- `svgr`: Converts SVG files to React components with specific options.

To run these scripts, use npm:

```bash
npm run prebuild
npm run build
npm run svgr
```

## Development

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Building the Project

To build the project, run:

```bash
npm run build
```

This will generate the `dist` directory with the compiled files.

### Contributing

We welcome contributions to this package. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

