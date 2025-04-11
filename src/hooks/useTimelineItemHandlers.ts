import { useRef, useState, useEffect, MouseEvent, ChangeEvent, KeyboardEvent } from "react";
import { TimelineItem, DragType } from "../models/timeline";
import { getInclusiveDaySpan } from "../utils/getInclusiveDaySpan";

interface TimelineItemHandlerProps {
  item: TimelineItem;
  zoomLevel: number;
  startDate: string;
  endDate: string;
  updateItem: (id: number, updatedItem: TimelineItem) => void;
  isEditingId: string | null;
  setIsEditingId: (id: string | null) => void;
}

export function useTimelineItemHandlers({
  item,
  zoomLevel,
  startDate,
  endDate,
  updateItem,
  isEditingId,
  setIsEditingId,
}: TimelineItemHandlerProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [itemName, setItemName] = useState(item.name);
  const [dragType, setDragType] = useState<DragType>(null);

  const totalDays = getInclusiveDaySpan(startDate, endDate);

  useEffect(() => {
    if (isEditingId === String(item.id) && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingId, item.id]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>, type: DragType) => {
    e.preventDefault();
    e.stopPropagation();

    setDragType(type);

    const startX = e.clientX;
    const initialStart = new Date(item.start);
    const initialEnd = new Date(item.end);

    const handleMouseMove = (e: MouseEvent | globalThis.MouseEvent) => {
      const deltaX = e.clientX - startX;
      const daysDelta = Math.round(
        (deltaX / window.innerWidth) * totalDays * (1 / zoomLevel)
      );

      const newStart = new Date(initialStart);
      const newEnd = new Date(initialEnd);

      if (type === "start") {
        newStart.setDate(initialStart.getDate() + daysDelta);
        if (newStart < initialEnd) {
          updateItem(item.id, { ...item, start: newStart.toISOString().split("T")[0] });
        }
      } else if (type === "end") {
        newEnd.setDate(initialEnd.getDate() + daysDelta);
        if (newEnd > initialStart) {
          updateItem(item.id, { ...item, end: newEnd.toISOString().split("T")[0] });
        }
      } else if (type === "move") {
        newStart.setDate(initialStart.getDate() + daysDelta);
        newEnd.setDate(initialEnd.getDate() + daysDelta);
        updateItem(item.id, {
          ...item,
          start: newStart.toISOString().split("T")[0],
          end: newEnd.toISOString().split("T")[0],
        });
      }
    };

    const handleMouseUp = () => {
      setDragType(null);
      document.removeEventListener("mousemove", handleMouseMove as any);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove as any);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  const handleNameBlur = () => {
    updateItem(item.id, { ...item, name: itemName });
    setIsEditingId(null);
  };

  const handleNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleNameBlur();
  };

  const itemIdStr = String(item.id);

    const handleDoubleClick = () => {
    setIsEditingId(itemIdStr);
    };

  return {
    itemName,
    setItemName,
    dragType,
    nameInputRef,
    handleMouseDown,
    handleNameChange,
    handleNameBlur,
    handleNameKeyDown,
    handleDoubleClick
  };
}
