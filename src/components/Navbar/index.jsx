import { FilePen, FileMusic, FolderOpen } from 'lucide-react'
import { loadChordMDFile, saveChordMDFile, saveHTMLAsPDF } from '../../utils/fileHandling'
import Button from '../Button'
import './styles.css'

export default function Navbar({songTitle, chordMD: [chordMD, setChordMD]}) {
    return(
        <header id='navbar'>
            <div id='logo'>
                <h1>ChordMD</h1>
                <small>v0.1.0</small>
            </div>
            <nav>
                <Button
                    icon={FolderOpen}
                    iconColor="var(--color-primary)"
                    label="Open ChordMD"
                    helpText="Open a ChordMD file"
                    onClick={() => loadChordMDFile(setChordMD)}
                />
                <Button
                    icon={FilePen}
                    iconColor="var(--color-primary)"
                    label="Save as ChordMD"
                    helpText="Save the source ChordMD file"
                    onClick={() => saveChordMDFile(chordMD, songTitle ?? null)}
                />
                <Button
                    icon={FileMusic}
                    iconColor="var(--color-primary)"
                    label="Save as PDF"
                    helpText="Save the rendered version as PDF"
                    onClick={() => saveHTMLAsPDF("viewer", songTitle ?? null) }
                />
            </nav>
        </header>
    )
}