import React from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems";

function App() {
  return (
    <div>
      <h2>Good luck with your assignment! {"\u2728"}</h2>
      <h3>{timelineItems.length} timeline items to render</h3>
    </div>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(<App />);
} else {
  console.error("Elemento com id 'root' não encontrado.");
}
