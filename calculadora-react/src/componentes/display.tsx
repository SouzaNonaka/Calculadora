import { forwardRef } from "react";

type DisplayProps = {
  value: string;
};

export const Display = forwardRef<HTMLDivElement, DisplayProps>(
  ({ value }, ref) => {
    return (
      <div ref={ref} className="display">
        {value}
      </div>
    );
  }
);
