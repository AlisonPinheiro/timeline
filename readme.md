# 📊 Airtable Timeline

A React + TypeScript application that renders an interactive timeline based on items with start and end dates. Built with a focus on performance, responsiveness, and a smooth user experience.

---

## 🚀 Technologies Used

- **Node.js 20**
- **React 18**
- **TypeScript**
- **TailwindCSS**
- **Parcel 2**
- **React Icons**

---

## 🗂️ Project Structure

```
src/
├── components/
│   └── Timeline/
│       ├── index.tsx
│       ├── TimelineItem.tsx
│       ├── TimelineNavigation.tsx
│       └── TimelineZoomControls.tsx
│
├── hooks/
│   ├── useTimelineHandlers.ts
│   └── useTimelineItemHandlers.ts
│
├── models/
│   └── timeline.ts
│
├── styles/
│   └── global.css
│
├── utils/
│   ├── formatDate.ts
│   ├── getInclusiveDaySpan.ts
│   └── generateTimelineLanes.ts
│
├── timelineItems.ts
├── App.tsx
└── index.tsx
```

---

## 🧰 Available Scripts

```json
"scripts": {
  "start": "parcel src/index.html --open"
}
```

---

## 🧪 Mock Data

The `timelineItems.ts` file contains an array of objects:

```ts
{
  id: number;
  name: string;
  start: string; // "YYYY-MM-DD"
  end: string;   // "YYYY-MM-DD"
}
```

---

## ⚙️ Features

- Organized into multiple horizontal lanes to avoid overlaps
- Drag & drop support to move events
- Resizable items by dragging edges
- Editable event names via double-click
- Period navigation with arrows
- Zoom controls via buttons and Ctrl/Cmd + scroll
- Fully responsive interface using TailwindCSS

---

## 📦 Installation

```bash
git clone <repo-url>
cd timeline
npm install
npm run start
```

---

## ✅ Requirements

- Node.js **v20+**
- npm **v9+**
- Modern browser

---

## 💡 Future Improvements

- Integration with Airtable API
- Export timeline as PDF or image
- Multi-select and batch actions
- Special date markers (e.g. today, holidays)

---

## 🧠 Author

Project developed by Renan.