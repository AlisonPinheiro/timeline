export interface TimelineItem {
  id: number;
  name: string;
  start: string;
  end: string;
}

export type DragType = "start" | "end" | "move" | null;

export interface TimelineItemProps {
  item: TimelineItem;
  startDate: string;
  endDate: string;
  zoomLevel: number;
  updateItem: (id: number, updatedItem: TimelineItem) => void;
  isEditingId: string | null;
  setIsEditingId: (id: string | null) => void;
}

export interface MonthMarker {
  date: Date;
  position: number;
}