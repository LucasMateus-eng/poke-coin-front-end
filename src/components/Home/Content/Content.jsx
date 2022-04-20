import styles from "./Content.module.css";
import pokebola from "./pokebola.png";

const Content = () => {
	return (
		<section className={styles["home-content"]}>
			<div className={styles["image-content"]}>
				<img src={pokebola} alt="Pokebola" />
			</div>
		</section>
	);
};

export default Content;
