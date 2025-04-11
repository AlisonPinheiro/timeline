import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";

interface TimelineNavigationProps {
  onLeft: () => void;
  onRight: () => void;
  dateRange: string;
}

export function TimelineNavigation({
  onLeft,
  onRight,
  dateRange,
}: TimelineNavigationProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <button
          className="flex items-center justify-center w-8 h-8 bg-white border rounded hover:bg-gray-100"
          onClick={onLeft}
        >
          <FiChevronLeft size={16} />
        </button>
        <div className="flex items-center space-x-2">
        <FiCalendar size={16} className="text-gray-500" />
        <span>{dateRange}</span>
      </div>
        <button
          className="flex items-center justify-center w-8 h-8 bg-white border rounded hover:bg-gray-100"
          onClick={onRight}
        >
          <FiChevronRight size={16} />
        </button>
      </div>


    </div>
  );
}
