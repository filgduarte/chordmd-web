import { FilePen, FileMusic } from 'lucide-react'
import Button from '../Button'
import './styles.css'

function saveChordMDFile(content, songTitle) {
    const filename = songTitle ? `${songTitle}.chordmd` : "untitled.chordmd";
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default function Navbar({songTitle, chordMD,}) {
    return(
        <header id='navbar'>
            <h1>ChordMD</h1>
            <nav>
                <Button
                    icon={FilePen}
                    iconColor="var(--color-primary)"
                    label="Save as ChordMD"
                    helpText="Save the source ChordMD file"
                    onClick={() => saveChordMDFile(chordMD, songTitle && songTitle)}
                />
                <Button
                    icon={FileMusic}
                    iconColor="var(--color-primary)"
                    label="Save as PDF"
                    helpText="Save the rendered version as PDF"
                    onClick={() => {}}
                />
            </nav>
        </header>
    )
}