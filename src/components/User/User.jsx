import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card/Card";
import FinWidget from "./FinWidget/FinWidget";
import Wallet from "./Wallet/Wallet";
import styles from "./User.module.css";

import mainAxios from "../../api/mainAxios";
const USER_URL = "/user";

const User = () => {
	const [userData, setUserData] = useState({});
	const [balance, setBalance] = useState(0);

	const fetchData = async () => {
		try {
			const access_token = localStorage.getItem("token");

			const response = await mainAxios.get(USER_URL, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			setUserData(response.data);
			console.log(response.data);
		} catch (err) {
			if (!err?.response) {
				console.log({ message: "Sem resposta do servidor." });
			} else {
				console.log(err?.response.data);
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const userToFinWidget = (data) => {
		setBalance(data);
	};

	const userContent = (
		<>
			<header className={styles["user-header"]}>
				<div className={styles.brand}>
					<Link to="/">
						<h1>tradercoin</h1>
					</Link>
				</div>
				<nav className={styles.menu}>
					<ul className={styles["menu-list"]}>
						<li>
							<Link to="/" className={styles.link}>
								Sair
							</Link>
						</li>
					</ul>
				</nav>
			</header>
			<div className={styles["user-info-deposit"]}>
				<div className={styles["user-history"]}>
					<h2>Sua carteira</h2>
					<Link
						to="/history"
						state={userData.operations}
						className={styles["link-history"]}
					>
						Ver histórico das operações
					</Link>
				</div>
				<FinWidget onChangeStatement={userToFinWidget} />
			</div>
			<Card className={styles["user-wallet"]}>
				<Wallet value={balance} />
			</Card>
		</>
	);

	return (
		<section className={styles["user-wrapper"]}>
			{userData === null ? <p>Carregando conteúdo.</p> : userContent}
		</section>
	);
};

export default User;
