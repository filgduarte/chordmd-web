
# ChordMD Web

A web application for editing, viewing, and exporting songs in the ChordMD format. Built with React and Vite.

## Features

- **Live Editor:** Write and preview ChordMD files in real time.
- **Syntax Highlighting:** Chords, headers, and comments are visually distinguished.
- **Export:**  
	- Save your song as a `.chordmd` text file.
	- Export the rendered view as a PDF.
- **Import:** Load existing `.chordmd` files into the editor.
- **Responsive UI:** Clean, modern interface with accessible controls.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/filgduarte/chordmd-web.git
cd chordmd-web
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Write:** Type your song using ChordMD syntax in the editor.
- **Preview:** The right panel shows a live preview.
- **Save:** Use the "Save as ChordMD" button to download your song.
- **Export PDF:** Use the "Save as PDF" button to export the rendered view.
- **Load:** Use the "Load ChordMD" button to import a `.chordmd` file.

## Project Structure

```
src/
	App.jsx
	components/
		Editor/
		Viewer/
		Navbar/
		Button/
	parser/
	renderer/
public/
```

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://github.com/niklasvh/html2canvas) for PDF export

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
