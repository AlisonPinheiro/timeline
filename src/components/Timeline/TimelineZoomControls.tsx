import { FiZoomIn, FiZoomOut } from "react-icons/fi";

interface TimelineZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function TimelineZoomControls({
  onZoomIn,
  onZoomOut,
}: TimelineZoomControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        className="flex items-center justify-center w-8 h-8 bg-white  hover:bg-gray-100"
        onClick={onZoomOut}
      >
        <FiZoomOut size={16} />
      </button>
      <button
        className="flex items-center justify-center w-8 h-8 bg-white   hover:bg-gray-100"
        onClick={onZoomIn}
      >
        <FiZoomIn size={16} />
      </button>
    </div>
  );
}
