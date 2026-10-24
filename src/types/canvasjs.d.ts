declare module '@canvasjs/react-charts' {
  import type { ComponentType } from 'react';

  interface CanvasJSChartProps {
    options?: Record<string, unknown>;
    containerProps?: Record<string, unknown>;
    onRef?: (ref: unknown) => void;
  }

  const CanvasJSReact: {
    CanvasJSChart: ComponentType<CanvasJSChartProps>;
    CanvasJS: unknown;
  };
  export default CanvasJSReact;
}
