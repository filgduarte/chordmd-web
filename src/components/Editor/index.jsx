
import { useMemo } from 'react';
import './styles.css';

export default function Editor({ value, onChange }) {
    const highlightedChordMD = useMemo(() => highlightChordMD(value), [value]);

    function highlightChordMD(text) {
        let hltext = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        hltext = hltext
            // chords
            .replace(/\[([^\]]+)\]/g, '<span class="chord">[$1]</span>')
            // headers
            .replace(/^### (.*)$/gm, '<span class="section">### $1</span>')
            .replace(/^## (.*)$/gm, '<span class="meta">## $1</span>')
            .replace(/^# (.*)$/gm, '<span class="title"># $1</span>')
            // blockquote
            .replace(/^&gt;(.*)$/gm, '<span class="blockquote">&gt;</span>$1')
            // comment
            .replace(/^\/\/(.*)$/gm, '<span class="comment">//$1</span>');
            
        return hltext;
    }

    return (
        <div id="editor">
            <pre id="highlight" dangerouslySetInnerHTML={{ __html: highlightedChordMD }} />
            <textarea
                id="input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder='Type your song here using ChordMD syntax. For example:

# My Song Title
## Artist Name

### Verse 1
[Am]This is a [G]song with [F]chords.

### Chorus
> [C]Chorus [G]goes [Am]here.'
            />
        </div>
    );
}