import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import WalletCard from "./WalletCard/WalletCard";
import { Link } from "react-router-dom";
import mainAxios from "../../../api/mainAxios";

import styles from "./Wallet.module.css";

const USER_WALLET = "/wallet";

const Wallet = (props) => {
	const [wallet, setWallet] = useState([]);

	const fetchWallet = async () => {
		try {
			const access_token = localStorage.getItem("token");

			const response = await mainAxios.get(USER_WALLET, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			setWallet(response.data);
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
		fetchWallet();
	}, []);

	const initialContent = (
		<Card className={styles["wallet-initial"]}>
			<p>Puxa! Você ainda não comprou nenhum ativo.</p>
			<p>
				{props.value !== 0
					? "Comece a investir."
					: "Faça um depósito e comece a investir."}
			</p>
		</Card>
	);

	return (
		<Card className={styles["wallet-user"]}>
			<Card className={styles["wallet-content"]}>
				{wallet.length === 0
					? initialContent
					: wallet.map((item) => <WalletCard item={item} />)}
			</Card>
			<div className={styles["wallet-action"]}>
				<nav>
					<Link to="/homebroker" className={styles.link}>
						Operar
					</Link>
				</nav>
			</div>
		</Card>
	);
};

export default Wallet;
