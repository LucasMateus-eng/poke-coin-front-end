import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import WalletCard from "./WalletCard/WalletCard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import mainAxios from "../../../api/mainAxios";

import styles from "./Wallet.module.css";

const USER_WALLET = "/wallet";

const Wallet = (props) => {
	const [wallet, setWallet] = useState([]);

	useEffect(() => {
		const fetchWallet = async () => {
			try {
				const access_token = localStorage.getItem("token");

				const response = await mainAxios.get(USER_WALLET, {
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				});

				console.log(response.data);

				setWallet(response.data);
			} catch (err) {
				if (!err?.response) {
					toast.error("Sem resposta do servidor.");
					console.log({ message: "Sem resposta do servidor." });
				} else {
					toast.error(err?.response.data.message);
					console.log(err?.response.data);
				}
			}
		};
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
					: React.Children.toArray(
							wallet.map((item) => <WalletCard item={item} />)
					  )}
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
