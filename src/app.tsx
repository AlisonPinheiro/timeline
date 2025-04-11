import { Timeline } from "./components/Timeline";
export function App() {
  return (
    <>
      <header className="bg-white shadow-sm p-4 border-b">
        <div>
          <h1 className="text-xl font-semibold">Timeline for Airtable</h1>
          <h2 className="text-sm text-gray-500">
            Drag items to move them, drag edges to resize, double-click to edit names
          </h2>
        </div>
        <div>
          
        </div>

      </header>
      <main className="overflow-hidden">
        <Timeline />
      </main>
    </>
  );
}
