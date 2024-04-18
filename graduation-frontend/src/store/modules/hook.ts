import { useContext, useRef } from "react";
import { CanvasContext } from "@/utils/context";
import Canvas from "./newCanvas";

export function useCanvas(canvas?: any) {
  const canvasRef = useRef();

  if (!canvasRef.current) {
    if (canvas) {
      canvasRef.current = canvas;
    } else {
      const canvas = new Canvas();
      canvasRef.current = canvas.getPublicCanvas() as any;
    }
  }

  return canvasRef.current;
}

export function useCanvasByContext() {
  const canvas = useContext(CanvasContext);
  return canvas;
}

export function useCanvasData() {
  const canvas = useContext(CanvasContext);
  return canvas.getCanvas();
}

export function useCanvasCmps() {
  const canvas = useContext(CanvasContext);
  return canvas.getCanvasCmps();
}
