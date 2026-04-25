import './styles.css';

export default function Viewer({ content }) {
    return (
        <div id="viewer">
            <div id="preview"
                dangerouslySetInnerHTML={{__html: content}}
            />
        </div>
    );
}