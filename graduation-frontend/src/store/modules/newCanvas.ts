import { getOnlyKey } from "@/utils/index";
import { cloneDeep } from "lodash";

function getDefaultCanvas() {
  return {
    title: "未命名",
    style: {
      width: 320,
      height: 568,
      backgroundColor: "#ffffff",
      backgroundImage: "",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    cmps: [],
  };
}

// 自定义实现状态管理库
export default class Canvas {
  listeners: any[];
  canvas: {
    title: string;
    style: {
      width: number;
      height: number;
      backgroundColor: string;
      backgroundImage: string;
      backgroundPosition: string;
      backgroundSize: string;
      backgroundRepeat: string;
    };
    cmps: any[];
  };
  canvasChangeHistory: any[];
  maxCanvasChangeHistory: number;
  canvasChangeHistoryIndex: number;
  assembly: Set<any>;

  constructor(_canvas = getDefaultCanvas()) {
    // 页面数据
    this.canvas = _canvas;

    // 订阅模式
    this.listeners = [];

    // 画布历史
    this.canvasChangeHistory = [cloneDeep(this.canvas)];

    // 前进、后退
    this.canvasChangeHistoryIndex = 0;

    // 最多记录100条数据
    this.maxCanvasChangeHistory = 100;

    // 选中组件的下标集合
    this.assembly = new Set();
  }

  getCanvas = () => {
    return { ...this.canvas };
  };

  getCanvasCmps = () => {
    return [...this.canvas.cmps];
  };

  getSelectedCmpIndex = () => {
    const selectedCmpIndex = Array.from(this.assembly)[0];
    return selectedCmpIndex === undefined ? -1 : selectedCmpIndex;
  };

  getSelectedCmp = () => {
    const cmps = this.getCanvasCmps();
    return cmps[this.getSelectedCmpIndex()];
  };

  setSelectedCmpIndex = (_index) => {
    if (this.getSelectedCmpIndex() === _index) {
      return;
    }

    this.assembly.clear();

    if (_index > -1) {
      this.addToAssembly(_index);
    }

    this.updateApp();
  };

  setCanvas = (_canvas) => {
    if (_canvas) {
      Object.assign(this.canvas, _canvas);
    } else {
      this.canvas = getDefaultCanvas();
    }

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  addCmps = (_cmp) => {
    const cmp = { ..._cmp, key: getOnlyKey() };

    this.canvas.cmps.push(cmp);

    this.assembly.clear();
    this.addToAssembly(this.canvas.cmps.length - 1);

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  deleteCmp = () => {
    const sorted = Array.from(this.assembly).sort((a, b) => b - a);
    sorted.forEach((index) => {
      this.canvas.cmps.splice(index, 1);
    });

    this.assembly.clear();

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  updateSelectedCmp = (newStyle, newValue) => {
    const selectedCmp = this.getSelectedCmp();

    if (newStyle) {
      this.canvas.cmps[this.getSelectedCmpIndex()].style = {
        ...selectedCmp.style,
        ...newStyle,
      };
    }

    if (newValue !== undefined) {
      this.canvas.cmps[this.getSelectedCmpIndex()].value = newValue;
    }

    this.updateApp();
  };

  updateCanvasStyle = (newStyle) => {
    this.canvas.style = {
      ...this.canvas.style,
      ...newStyle,
    };
    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  updateApp = () => {
    this.listeners.forEach((lis) => lis());
  };

  subscribe = (listener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((lis) => lis !== listener);
    };
  };

  recordCanvasChangeHistory = () => {
    this.canvasChangeHistory[++this.canvasChangeHistoryIndex] = cloneDeep(
      this.canvas
    );
    this.canvasChangeHistory = this.canvasChangeHistory.slice(
      0,
      this.canvasChangeHistoryIndex + 1
    );

    if (this.canvasChangeHistory.length > this.maxCanvasChangeHistory) {
      this.canvasChangeHistory.shift();
      this.canvasChangeHistoryIndex--;
    }
  };

  goPrevCanvasHistory = () => {
    let newIndex = this.canvasChangeHistoryIndex - 1;

    if (newIndex < 0) newIndex = 0;

    if (this.canvasChangeHistoryIndex === newIndex) return;

    this.canvasChangeHistoryIndex = newIndex;

    const newCanvas = cloneDeep(this.canvasChangeHistory[newIndex]);
    this.canvas = newCanvas;
    this.updateApp();
  };

  goNextCanvasHistory = () => {
    let newIndex = this.canvasChangeHistoryIndex + 1;
    if (newIndex >= this.canvasChangeHistory.length) {
      newIndex = this.canvasChangeHistory.length - 1;
    }

    if (this.canvasChangeHistoryIndex === newIndex) return;

    this.canvasChangeHistoryIndex = newIndex;
    const newCanvas = cloneDeep(this.canvasChangeHistory[newIndex]);
    this.canvas = newCanvas;
    this.updateApp();
  };

  addCmpZIndex = (cmpIndex = this.getSelectedCmpIndex()) => {
    const cmps = this.getCanvasCmps();
    const targetIndex = cmpIndex + 1;
    if (targetIndex >= cmps.length) {
      return;
    }

    const temp = cmps[cmpIndex];
    this.canvas.cmps[cmpIndex] = this.canvas.cmps[targetIndex];
    this.canvas.cmps[targetIndex] = temp;

    this.setSelectedCmpIndex(targetIndex);

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  subCmpZIndex = (cmpIndex = this.getSelectedCmpIndex()) => {
    const cmps = this.getCanvasCmps();
    const targetIndex = cmpIndex - 1;
    if (targetIndex < 0) {
      return;
    }

    const temp = cmps[cmpIndex];
    this.canvas.cmps[cmpIndex] = this.canvas.cmps[targetIndex];
    this.canvas.cmps[targetIndex] = temp;

    this.setSelectedCmpIndex(targetIndex);

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  topCmpZIndex = (cmpIndex = this.getSelectedCmpIndex()) => {
    const cmps = this.getCanvasCmps();
    if (cmpIndex >= cmps.length - 1) {
      return;
    }
    this.canvas.cmps = cmps
      .slice(0, cmpIndex)
      .concat(cmps.slice(cmpIndex + 1))
      .concat(cmps[cmpIndex]);

    this.setSelectedCmpIndex(cmps.length - 1);

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  bottomCmpZIndex = (cmpIndex = this.getSelectedCmpIndex()) => {
    const cmps = this.getCanvasCmps();
    if (cmpIndex <= 0) {
      return;
    }

    this.canvas.cmps = [cmps[cmpIndex]]
      .concat(cmps.slice(0, cmpIndex))
      .concat(cmps.slice(cmpIndex + 1));

    this.setSelectedCmpIndex(0);

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  addToAssembly = (indexes) => {
    if (Array.isArray(indexes)) {
      indexes.forEach((index) => index !== -1 && this.assembly.add(index - 0));
    } else {
      indexes !== -1 && this.assembly.add(indexes);
    }
  };

  // 批量操作组件
  addAndUpdateAssembly = (indexes) => {
    this.addToAssembly(indexes);
    this.updateApp();
  };

  // 判断下标为index的组件是否被批量选中
  belongingToAssembly = (index) => {
    return this.assembly.has(index);
  };

  // 移动的差值
  updateAssemblyCmps = (newStyle) => {
    this.assembly.forEach((index) => {
      const cmp = this.canvas.cmps[index];
      for (const key in newStyle) {
        cmp.style[key] += newStyle[key] - 0;

        if (cmp.style.width < 10) {
          cmp.style.width = 10;
        }
        if (cmp.style.height < 10) {
          cmp.style.height = 10;
        }
      }
    });

    this.updateApp();
  };

  addAssemblyCms = () => {
    this.assembly.forEach((index) => {
      const cmp = this.canvas.cmps[index];
      const newCmp = cloneDeep(cmp);
      newCmp.key = getOnlyKey();

      newCmp.style.top += 40;
      newCmp.style.left += 40;

      this.canvas.cmps.push(newCmp);
    });

    const cmpsLength = this.canvas.cmps.length;
    const assemblySize = this.assembly.size;

    this.assembly.clear();
    for (let i = cmpsLength - assemblySize; i < cmpsLength; i++) {
      this.assembly.add(i);
    }

    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  hasAssembly = () => {
    return this.assembly.size > 1;
  };

  getPublicCanvas = () => {
    const obj = {
      setCanvas: this.setCanvas,
      getCanvas: this.getCanvas,
      getCanvasCmps: this.getCanvasCmps,
      addCmps: this.addCmps,
      deleteCmp: this.deleteCmp,
      subscribe: this.subscribe,
      setSelectedCmpIndex: this.setSelectedCmpIndex,
      getSelectedCmpIndex: this.getSelectedCmpIndex,
      updateSelectedCmp: this.updateSelectedCmp,
      getSelectedCmp: this.getSelectedCmp,
      updateCanvasStyle: this.updateCanvasStyle,
      recordCanvasChangeHistory: this.recordCanvasChangeHistory,
      goPrevCanvasHistory: this.goPrevCanvasHistory,
      goNextCanvasHistory: this.goNextCanvasHistory,
      addCmpZIndex: this.addCmpZIndex,
      subCmpZIndex: this.subCmpZIndex,
      topCmpZIndex: this.topCmpZIndex,
      bottomCmpZIndex: this.bottomCmpZIndex,
      addToAssembly: this.addToAssembly,
      updateAssemblyCmps: this.updateAssemblyCmps,
      addAssemblyCms: this.addAssemblyCms,
      hasAssembly: this.hasAssembly,
      addAndUpdateAssembly: this.addAndUpdateAssembly,
      belongingToAssembly: this.belongingToAssembly,
    };
    return obj;
  };
}
