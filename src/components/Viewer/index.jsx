import { renderHTML } from '../../renderer';
import './styles.css';

export default function Viewer({ content }) {
    const html = renderHTML(content);
  return (
    <div id="viewer">
      <div id="preview"
        dangerouslySetInnerHTML={{__html: html}}
      />
    </div>
  );
}