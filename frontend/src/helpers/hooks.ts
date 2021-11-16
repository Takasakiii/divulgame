import { useState, useEffect } from "react";

export interface WindowSize {
  width: number;
  height: number;
}

export function useScreenSize() {
  const [wSize, setWSize] = useState<WindowSize | null>(null);

  useEffect(() => {
    function onResizeHandle() {
      setWSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", onResizeHandle);
    onResizeHandle();

    return () => window.removeEventListener("resize", onResizeHandle);
  }, []);

  return wSize;
}
