# 📊 Airtable Timeline

Aplicação React + TypeScript que renderiza uma timeline interativa com base em itens contendo datas de início e fim. Desenvolvido com foco em performance, responsividade e experiência de usuário fluida.

---

## 🚀 Tecnologias Utilizadas

- **Node.js 20**
- **React 18**
- **TypeScript**
- **TailwindCSS**
- **Parcel 2**
- **React Icons**

---

## 🗂️ Estrutura de Pastas

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

## 🧰 Scripts Disponíveis

```json
"scripts": {
  "start": "parcel src/index.html --open"
}
```

---

## 🧪 Mock de Dados

O arquivo `timelineItems.ts` contém uma lista de objetos com:

```ts
{
  id: number;
  name: string;
  start: string; // "YYYY-MM-DD"
  end: string;   // "YYYY-MM-DD"
}
```

---

## ⚙️ Funcionalidades

- Organização em múltiplas "lanes" (faixas horizontais)
- Drag & drop para movimentação de eventos
- Resize pelas bordas para ajustar datas
- Edição de nomes por duplo clique
- Navegação por período com setas
- Zoom com botões e scroll + ctrl/cmd
- Interface responsiva e leve

---

## 📦 Instalação

```bash
git clone <repo-url>
cd timeline
npm install
npm run start
```

---

## ✅ Requisitos

- Node.js **v20+**
- npm **v9+**
- Navegador moderno

---

## 💡 Melhorias Futuras

- Integração com a API do Airtable
- Exportação para PDF ou imagem
- Seleção múltipla e ações em lote
- Marcação de datas especiais (ex: hoje, feriados)

---

## 🧠 Autor

Projeto desenvolvido por Renan.