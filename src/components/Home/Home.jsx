import Header from "./Header/Header";
import Content from "./Content/Content";

import styles from "./Home.module.css";

const Home = () => {
	return (
		<div className={styles["wrapper-home"]}>
			<Header />
			<Content />
		</div>
	);
};

export default Home;
