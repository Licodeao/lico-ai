import React from "react";

export const getCanvasMousePosition = (
  canvas: HTMLCanvasElement,
  e: React.MouseEvent<HTMLCanvasElement>
) => {
  if (!canvas) {
    return { x: 0, y: 0 };
  }
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { x, y };
};
