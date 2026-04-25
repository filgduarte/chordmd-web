import './styles.css'

export default function Button({ icon: Icon, ...props }) {
    return (
        <button
            title={props.helpText}
            className={`button ${props.className ?? ''}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {Icon && (
                <Icon
                    size={props.iconSize ?? 16}
                    color={props.iconColor ?? "currentColor"}
                />
            )}
            {props.label}
        </button>
    )
}