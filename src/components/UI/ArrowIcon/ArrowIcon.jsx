import { HiArrowNarrowLeft } from "react-icons/hi";
import { IconContext } from "react-icons";
import styles from "./ArrowIcon.module.css";

const ArrowIcon = (props) => {
	return (
		<IconContext.Provider
			value={{ className: `${styles.icon} ${props.className}` }}
		>
			<HiArrowNarrowLeft />
		</IconContext.Provider>
	);
};

export default ArrowIcon;
