import type { FC, ReactNode } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { CanvasContext } from "@/utils/context";
import ContextMenu from "./contextMenu";
import Lines from "./Line";
import Rotate from "./rotate";
import StretchDots from "./dots";
import { isTextComponent } from "@/utils";

interface IProps {
  children?: ReactNode;
  selectedIndex: any;
  zoom: any;
}

const EditLine: FC<IProps> = ({ selectedIndex, zoom }) => {
  const canvasContext = useContext(CanvasContext);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [textareaFocused, setTextareaFocused] = useState(false);
  const textareaRef = useRef(null);
  const prevSelectedIndexRef = useRef(selectedIndex);
  const prevShowContextMenuRef = useRef(showContextMenu);

  useEffect(() => {
    if (
      prevShowContextMenuRef.current &&
      prevSelectedIndexRef.current !== selectedIndex
    ) {
      // Perform your action here
      hideShowContextMenu();
    }

    prevSelectedIndexRef.current = selectedIndex;
    prevShowContextMenuRef.current = showContextMenu;
  }, [selectedIndex, showContextMenu]);

  const onMouseDownOfCmp = (e) => {
    if (textareaFocused) {
      return;
    }
    e.preventDefault();

    let startX = e.pageX;
    let startY = e.pageY;

    const move = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom);

      canvasContext.updateAssemblyCmps({ top: disY, left: disX });

      startX = x;
      startY = y;
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      canvasContext.recordCanvasChangeHistory();
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const valueChange = (e) => {
    const newValue = e.target.value;
    const textHeight = (textareaRef.current as any).scrollHeight;
    canvasContext.updateSelectedCmp({ height: textHeight }, newValue);
    canvasContext.recordCanvasChangeHistory();
  };

  const handleShowContextMenu = (e) => {
    e.preventDefault();
    setShowContextMenu(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hideShowContextMenu = () => {
    setShowContextMenu(false);
  };

  const cmp = canvasContext.getSelectedCmp();
  if (!cmp) {
    return null;
  }

  const { style } = cmp;

  const { width, height } = style;
  const transform = `rotate(${style.transform}deg)`;
  return (
    <div
      className="absolute cursor-move"
      style={{
        zIndex: 99999,
        width,
        height,
        top: style.top,
        left: style.left,
        transform,
      }}
      onDoubleClick={() => {
        setTextareaFocused(true);
        setShowContextMenu(false);
      }}
    >
      {cmp.type === isTextComponent && textareaFocused ? (
        <textarea
          ref={textareaRef}
          value={cmp.value}
          onChange={valueChange}
          onBlur={() => {
            setTextareaFocused(false);
          }}
          style={{
            ...style,
            width,
            height,
            top: 0,
            left: 0,
          }}
        />
      ) : (
        <div
          className="absolute min-w-[20px] min-h-[20px]"
          style={{
            width,
            height,
          }}
          onMouseDown={onMouseDownOfCmp}
          onContextMenu={handleShowContextMenu}
        ></div>
      )}

      {showContextMenu && (
        <ContextMenu
          style={{
            top: 2,
            left: width / 2,
            transform: `scale(${100 / zoom}) rotate(${0 - style.transform}deg)`,
          }}
        />
      )}

      <Lines style={{ width, height }} />

      <StretchDots
        zoom={zoom}
        style={{
          width,
          height,
          transform: `scale(${100 / zoom})`,
        }}
      />

      <Rotate
        zoom={zoom}
        style={{ width, height, transform: `scale(${100 / zoom})` }}
      />
    </div>
  );
};

export default EditLine;
