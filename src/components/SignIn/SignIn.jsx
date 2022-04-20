import ArrowIcon from "../UI/ArrowIcon/ArrowIcon";
import LoginForm from "./LoginForm/LoginForm";
import { Link } from "react-router-dom";

import styles from "./SignIn.module.css";
import loginImage from "./login.png";

const SignIn = () => {
	return (
		<section className={styles.login}>
			<div className={styles["login-cover"]}>
				<nav className={styles["login-nav"]}>
					<Link to="/">
						<ArrowIcon className={styles["icon-nav"]} />
					</Link>
				</nav>
				<div className={styles["login-image-cover"]}>
					<div className={styles["login-image"]}>
						<img src={loginImage} alt="Investimentos" />
					</div>
				</div>
			</div>
			<div className={styles["login-form"]}>
				<nav className={styles["login-form-nav"]}>
					<Link to="/">
						<ArrowIcon className={styles["icon-form"]} />
					</Link>
				</nav>
				<LoginForm />
			</div>
		</section>
	);
};

export default SignIn;
