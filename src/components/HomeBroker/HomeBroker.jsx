import { Link } from "react-router-dom";
import ArrowIcon from "../UI/ArrowIcon/ArrowIcon";
import Card from "../UI/Card/Card";
import HomeBrokerForm from "./HomeBrokerForm/HomeBrokerForm";

import styles from "./HomeBroker.module.css";

const HomeBroker = () => {
	return (
		<section className={styles.homebroker}>
			<nav className={styles["homebroker-nav"]}>
				<Link to="/user">
					<ArrowIcon className={styles["icon-nav"]} />
				</Link>
			</nav>
			<Card className={styles["homebroker-form"]}>
				<HomeBrokerForm />
			</Card>
		</section>
	);
};

export default HomeBroker;
