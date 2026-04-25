import { useState, useMemo } from 'react'
import { parseChordMD } from './parser';
import Navbar from './components/Navbar'
import Editor from './components/Editor'
import Viewer from './components/Viewer'
import { renderHTML } from './renderer';

function App() {
    const [chordMD, setChordMD] = useState('')
    const ast = useMemo(() => parseChordMD(chordMD, { fileExtension: ".chordmd" }), [chordMD]);
    const renderedHTML = useMemo(() => renderHTML(ast), [ast]);

    return (
        <>
            <Navbar songTitle={ast.title && ast.title} chordMD={[chordMD, setChordMD]} />
            <main>
                <Editor value={chordMD} onChange={value => setChordMD(value)} />
                <Viewer content={renderedHTML} />
            </main>
        </>
    )
}

export default App
