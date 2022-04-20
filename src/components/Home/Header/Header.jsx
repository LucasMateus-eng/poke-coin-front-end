import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = (props) => {
	return (
		<header className={styles["header-home"]}>
			<div className={styles.brand}>
				<Link to="/">
					<h1>tradercoin</h1>
				</Link>
			</div>
			<nav className={styles.menu}>
				<ul className={styles["menu-list"]}>
					<li>
						<Link to="login" className={styles.link}>
							Acesse
						</Link>
					</li>
					<li>
						<Link to="register" className={styles.link}>
							Cadastre-se
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
