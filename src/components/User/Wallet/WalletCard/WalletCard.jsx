import { useEffect, useState } from "react";
import axios from "axios";
import bitcoin from "bitcoin-units";

import styles from "./WalletCard.module.css";

const WalletCard = ({ item }) => {
	const [factor, setFactor] = useState(0);
	const [currentValue, setCurrentValue] = useState(0);

	const updateCurrentValue = () => {
		bitcoin.setFiat("usd", factor);
		const base = bitcoin(1, "satoshi").to("usd").value();

		const totalOperation = item.base_experience * item.quantity * base;

		setCurrentValue(totalOperation);
	};

	useEffect(() => {
		const fetchCurrentDolar = async () => {
			try {
				const key = process.env.REACT_BTC_KEY;

				const response = await axios.get(
					`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&&api_key={${key}}`
				);

				console.log(response.data.USD);

				setFactor(response.data.USD);
				updateCurrentValue();
			} catch (err) {
				if (!err?.response) {
					console.log({ message: "Sem resposta do servidor." });
				} else {
					console.log(err?.response.data);
				}
			}
		};

		fetchCurrentDolar();
	});

	return (
		<>
			<div className={styles["poke-coin"]}>
				<div className={styles["poke-coin-name"]}>
					<h2>{item.name}</h2>
				</div>
				<div className={styles["poke-coin-info"]}>
					<div className={styles["poke-coin-character"]}>
						<p>{`Base experience: ${item["base_experience"]}`}</p>
						<p>{`Quantidade: ${item.quantity}`}</p>
					</div>
					<div className={styles["poke-coin-value"]}>
						<p>{`$ ${currentValue.toFixed(4)}`}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default WalletCard;
