
import { useState } from 'react';
import './styles.css';

export default function Editor({ value, onChange }) {
  const [highlightedValue, setHighlightedValue] = useState('');

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

  function handleChange(e) {
    const newValue = e.target.value;
    onChange(newValue);
    setHighlightedValue(highlightChordMD(newValue));
  }

  return (
    <div id="editor">
      <pre id="highlight" dangerouslySetInnerHTML={{ __html: highlightedValue }} />
      <textarea
        id="input"
        value={value}
        onChange={handleChange}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
}