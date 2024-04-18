import Canvas from "@/store/modules/newCanvas";
import { createContext } from "react";

export const CanvasContext = createContext(new Canvas());
