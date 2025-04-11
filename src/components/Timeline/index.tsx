import { TimelineItemComponent } from "./TimelineItem";
import { formatDate } from "../../utils/formatDate";
import { getInclusiveDaySpan } from "../../utils/getInclusiveDaySpan";
import { TimelineNavigation } from "./TimelineNavigation";
import { TimelineZoomControls } from "./TimelineZoomControls";
import { useTimelineHandlers } from "../../hooks/useTimelineHandlers";

import timelineItems from "../../timelineItems";
import { MonthMarker } from "../../models/timeline"; 

export function Timeline() {
  const {
    lanes,
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
  } = useTimelineHandlers(timelineItems);

  const generateMonthMarkers = (): MonthMarker[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const markers: MonthMarker[] = [];
    const currentDate = new Date(start.getFullYear(), start.getMonth(), 1);

    while (currentDate <= end) {
      const totalDays = getInclusiveDaySpan(startDate, endDate);
      const daysSinceStart = getInclusiveDaySpan(
        startDate,
        currentDate.toISOString().split("T")[0]
      );
      const position = (daysSinceStart / totalDays) * 100;

      markers.push({
        date: new Date(currentDate),
        position,
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return markers;
  };

  const monthMarkers = generateMonthMarkers();
  return (
    <div className="flex flex-col h-full">
      <div className="relative flex items-center justify-between p-4  bg-sky-200 ">
        <div className="w-8" />

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <TimelineNavigation
            onLeft={() => shiftTimeline("left")}
            onRight={() => shiftTimeline("right")}
            dateRange={`${formatDate(startDate)} - ${formatDate(endDate)}`}
          />
        </div>

        <div className="flex items-center space-x-2">
          <TimelineZoomControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
        </div>
      </div>

      <div className="flex-1 overflow-x-auto" onWheel={handleWheel}>
        <div
          className="relative"
          style={{
            width: `${100 * zoomLevel}%`,
            minHeight: `${lanes.length * 50 + 30}px`,
          }}
        >
          <div className="h-8 relative bg-sky-100 w-full">
            {monthMarkers.map((marker, index) => (
              <div
                key={index}
                className="absolute top-0 h-full"
                style={{ left: `${marker.position}%` }}
              >
                <div className="absolute top-0 h-6 flex items-center justify-center transform -translate-x-1/2">
                  <div className="text-xs font-medium text-center">
                    {marker.date.toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="absolute top-0 w-px h-screen bg-gray-200" />
              </div>
            ))}
          </div>

          {lanes.map((lane, laneIndex) => (
            <div
              key={laneIndex}
              className="relative h-12 border-b border-gray-100"
              style={{ top: 24 }}
            >
              {lane.map((item) => (
                <TimelineItemComponent
                  key={item.id}
                  item={item}
                  startDate={startDate}
                  endDate={endDate}
                  zoomLevel={zoomLevel}
                  updateItem={updateItem}
                  isEditingId={isEditingId}
                  setIsEditingId={setIsEditingId}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
