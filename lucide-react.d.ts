declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';

  export interface LucideIconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
    className?: string;
  }

  export type LucideIcon = FC<LucideIconProps>;

  // Sab icons ko automatically allow kar do (no need to list one by one)
  export * from 'lucide-react';
}