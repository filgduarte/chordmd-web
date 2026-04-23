import './styles.css'

export default function Editor({ value, onChange }) {
  return (
    <textarea
      id='editor'
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}