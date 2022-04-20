import styles from "./Button.module.css";

const Button = (props) => {
	const classes = `${styles.button} ${props.className}`;

	return (
		<button
			className={classes}
			type={props.type || "button"}
			value={props.value}
			name={props.name}
			form={props.form}
			onClick={props.onClick}
			onSubmit={props.onSubmit}
		>
			{props.children}
		</button>
	);
};

export default Button;
