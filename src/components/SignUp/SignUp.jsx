import { Link } from "react-router-dom";
import ArrowIcon from "../UI/ArrowIcon/ArrowIcon";
import RegisterForm from "./RegisterForm/RegisterForm";

import styles from "./SignUp.module.css";
import carteira from "./carteira.png";

const SignUp = (props) => {
	return (
		<section className={styles.register}>
			<div className={styles["register-form"]}>
				<nav className={styles["login-nav"]}>
					<Link to="/">
						<ArrowIcon className={styles["icon-nav"]} />
					</Link>
				</nav>
				<RegisterForm />
			</div>
			<div className={styles["register-cover"]}>
				<div className={styles["register-image"]}>
					<img src={carteira} alt="Carteira em bitcoin" />
				</div>
			</div>
		</section>
	);
};

export default SignUp;
