import { useState, useEffect, useRef, MouseEvent, ChangeEvent, KeyboardEvent } from "react";
import { formatDate } from "../../utils/formatDate";
import { getInclusiveDaySpan } from "../../utils/getInclusiveDaySpan";
import { TimelineItemProps, DragType } from "../../models/timeline";
import { useTimelineItemHandlers } from "../../hooks/useTimelineItemHandlers";

export function TimelineItemComponent({
  item,
  startDate,
  endDate,
  zoomLevel,
  updateItem,
  isEditingId,
  setIsEditingId,
}: TimelineItemProps) {
  const {
    itemName,
    setItemName,
    dragType,
    nameInputRef,
    handleMouseDown,
    handleNameChange,
    handleNameBlur,
    handleNameKeyDown,
    handleDoubleClick,
  } = useTimelineItemHandlers({
    item,
    zoomLevel,
    startDate,
    endDate,
    updateItem,
    isEditingId,
    setIsEditingId,
  });
  
  const totalDays = getInclusiveDaySpan(startDate, endDate);
  const itemStartDays = getInclusiveDaySpan(startDate, item.start);
  const itemDuration = getInclusiveDaySpan(item.start, item.end);

  const leftPosition = (itemStartDays / totalDays) * 100;
  const widthPercentage = (itemDuration / totalDays) * 100;
  const minWidth = Math.max(widthPercentage, 2);
  const itemIdStr = String(item.id);

  useEffect(() => {
    if (isEditingId === itemIdStr && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingId, item.id]);

  return (
    <div
      className="absolute rounded shadow-md border border-gray-200 bg-sky-300 flex flex-col overflow-hidden"
      style={{
        left: `${leftPosition}%`,
        width: `${minWidth}%`,
        height: "42px",
        cursor: dragType === "move" ? "grab" : "auto",
        position: "absolute",
        zIndex: dragType ? 2 : 1,
      }}
      onMouseDown={(e) => handleMouseDown(e, "move")}
      onDoubleClick={handleDoubleClick}
    >
      <button className=" px-2 h-full text-sm text-left">
        {isEditingId === itemIdStr ? (
          <input
            ref={nameInputRef}
            type="text"
            value={itemName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            className="flex-1 bg-white border rounded px-1 text-sm"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <p
            className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis"
            title={item.name}
          >
            {item.name}
          </p>
        )}
        <p className="text-xs text-gray-500 ml-1 whitespace-nowrap">
          {widthPercentage > 5 && formatDate(item.start)}{" "}
          {widthPercentage > 9 && `- ${formatDate(item.end)}`}
        </p>
      </button>

      <div
        className="absolute left-0 top-0 w-2 h-full cursor-col-resize bg-sky-300  hover:opacity-100"
        onMouseDown={(e) => handleMouseDown(e, "start")}
      />
      <div
        className="absolute right-0 top-0 w-2 h-full cursor-col-resize bg-sky-300 hover:opacity-100"
        onMouseDown={(e) => handleMouseDown(e, "end")}
      />
    </div>
  );
}
