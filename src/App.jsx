import { useState } from 'react'
import { parseChordMD } from './parser';
import Navbar from './components/Navbar'
import Editor from './components/Editor'
import Viewer from './components/Viewer'

function App() {
  const [chordMD, setChordMD] = useState('')
  const [ast, setAst] = useState(null)

  const update = (value) => {
    setChordMD(value);

    const parsedAst = parseChordMD(value, {
      fileExtension: ".chordmd"
    });

    if (parsedAst) {
      setAst(parsedAst);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <Editor value={chordMD} onChange={update} />
        <Viewer content={ast} />
      </main>
    </>
  )
}

export default App
