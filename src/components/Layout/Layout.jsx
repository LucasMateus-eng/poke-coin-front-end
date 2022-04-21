import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Layout.module.css";

const Layout = () => {
	return (
		<main className={styles.wrapper}>
			<ToastContainer autoClose={3000} />
			<Outlet />
		</main>
	);
};

export default Layout;
