
import { useMemo, useState, useRef } from 'react';
import './styles.css';

export default function Editor({ value, onChange }) {
    const [currentLine, setCurrentLine] = useState(0);
    const [currentColumn, setCurrentColumn] = useState(0);
    const lines = value.split('\n');
    
    // Calcula estatísticas
    const stats = useMemo(() => {
        const charCount = value.length;
        const lineCount = lines.length;
        const wordCount = value.trim().split(/\s+/).filter(w => w.length > 0).length;
        return { lineCount, wordCount, charCount };
    }, [value, lines]);

    // Valida sintaxe ChordMD
    const validationErrors = useMemo(() => {
        const errors = new Set();
        lines.forEach((line, idx) => {
            // Detecta [] vazio
            if (/\[\s*\]/.test(line)) {
                errors.add(idx);
            }
            // Detecta #, ##, ### sem espaço após
            if (/^#+[^\s#]/.test(line)) {
                errors.add(idx);
            }
        });
        return errors;
    }, [lines]);

    const highlightedLines = useMemo(() =>
        lines.map((line, idx) => {
            const html = highlightChordMD(line);
            const isError = validationErrors.has(idx);
            const isCurrent = currentLine === idx;
            const classes = `editor-line${isCurrent ? ' current' : ''}${isError ? ' error' : ''}`;
            return `<div class="${classes}"><span class="line-number">${idx + 1}</span><span class="line-content">${html || '&nbsp;'}</span></div>`;
        }).join(''),
        [value, currentLine, validationErrors]
    );
    const textareaRef = useRef(null);
    const highlightRef = useRef(null);

    // Sincroniza o scroll entre textarea e pre
    const handleScroll = () => {
        if (textareaRef.current && highlightRef.current) {
            highlightRef.current.scrollTop = textareaRef.current.scrollTop;
            highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };

    return (
        <div id="editor">
            <div id="code-area">
                <pre id="highlight" ref={highlightRef} dangerouslySetInnerHTML={{ __html: highlightedLines }} />
                <textarea
                    id="input"
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onClick={handleCursor}
                    onKeyUp={handleCursor}
                    onScroll={handleScroll}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder={'Type your song here using ChordMD syntax. For example:\n# My Song Title\n## Artist Name\n\n### Verse 1\n[Am]This is a [G]song with [F]chords.\n\n### Chorus\n> [C]Chorus [G]goes [Am]here.'}
                />
            </div>
            <div id="status-bar">
                <span className="status-info">
                    {`L${currentLine + 1}:C${currentColumn + 1}`}
                </span>
                <span className="status-separator">•</span>
                <span className="status-stats">
                    {`${stats.lineCount} lines • ${stats.wordCount} words • ${stats.charCount} characters`}
                </span>
                {validationErrors.size > 0 && (
                    <>
                        <span className="status-separator">•</span>
                        <span className="status-error">
                            {`${validationErrors.size} syntax errors on lines: ${[...validationErrors].map(i => i + 1).join(', ')}`}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
    
    
    function highlightChordMD(text) {
        let hltext = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        hltext = hltext
            // sections
            .replace(/^### (.*)$/gm, '<span class="section">### $1</span>')
            // metas
            .replace(/^## (.*)$/gm, '<span class="meta">## $1</span>')
            // title
            .replace(/^# (.*)$/gm, '<span class="title"># $1</span>')
            // chords
            .replace(/\[([^\]]+)\]/g, '<span class="chord">[$1]</span>')
            // blockquote
            .replace(/^&gt;(.*)$/gm, '<span class="blockquote">&gt;</span>$1')
            // comment
            .replace(/^\/\/(.*)$/gm, '<span class="comment">//$1</span>');
            
        return hltext;
    }

    // Atualiza linha e coluna atual ao mover o cursor
    function handleCursor(e) {
        const pos = e.target.selectionStart;
        const textUptoCursor = value.slice(0, pos);
        const lines = textUptoCursor.split('\n');
        const lineIdx = lines.length - 1;
        const colIdx = lines[lines.length - 1].length;
        setCurrentLine(lineIdx);
        setCurrentColumn(colIdx);
    }
}