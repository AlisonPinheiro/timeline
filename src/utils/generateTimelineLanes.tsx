import { TimelineItem } from "../models/timeline";

export function generateTimelineLanes(items: TimelineItem[]): TimelineItem[][] {
  const sortedItems = [...items].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const lanes: TimelineItem[][] = [];

  function assignItemToLane(item: TimelineItem) {
    for (const lane of lanes) {
      const lastItem = lane[lane.length - 1];
      if (new Date(lastItem.end) < new Date(item.start)) {
        lane.push(item);
        return;
      }
    }

    lanes.push([item]);
  }

  for (const item of sortedItems) {
    assignItemToLane(item);
  }

  return lanes;
}
