import ReactDOM from "react-dom/client";
import { App } from "./app";
import "./globals.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(<App />);
}
