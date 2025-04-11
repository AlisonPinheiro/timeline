import { useState, WheelEvent } from "react";
import { TimelineItem } from "../models/timeline";
import { generateTimelineLanes } from "../utils/generateTimelineLanes";

export function useTimelineHandlers(timelineItems: TimelineItem[]) {
  const [items, setItems] = useState<TimelineItem[]>(timelineItems);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const initialStartDate = new Date(
    Math.min(...timelineItems.map((item) => new Date(item.start).getTime()))
  );
  const initialEndDate = new Date(
    Math.max(...timelineItems.map((item) => new Date(item.end).getTime()))
  );

  const [startDate, setStartDate] = useState<string>(
    initialStartDate.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    initialEndDate.toISOString().split("T")[0]
  );
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [lanes, setLanes] = useState<TimelineItem[][]>(
    generateTimelineLanes(items)
  );

  const updateItem = (id: number, updatedItem: TimelineItem) => {
    const updatedItems = items.map((item) =>
      item.id === id ? updatedItem : item
    );
    setItems(updatedItems);
    setLanes(generateTimelineLanes(updatedItems));
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev * 1.5, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev / 1.5, 0.5));
  };

  const shiftTimeline = (direction: "left" | "right") => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeSpan = end.getTime() - start.getTime();
    const shiftAmount = timeSpan * 0.1;

    const offset = direction === "left" ? -shiftAmount : shiftAmount;

    start.setTime(start.getTime() + offset);
    end.setTime(end.getTime() + offset);

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.metaKey || e.ctrlKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        setZoomLevel((prev) => Math.min(prev * 1.1, 5));
      } else {
        setZoomLevel((prev) => Math.max(prev / 1.1, 0.5));
      }
    }
  };

  return {
    items,
    setItems,
    lanes,
    setLanes,
    zoomLevel,
    startDate,
    endDate,
    isEditingId,
    setIsEditingId,
    updateItem,
    handleZoomIn,
    handleZoomOut,
    shiftTimeline,
    handleWheel,
  };
}
