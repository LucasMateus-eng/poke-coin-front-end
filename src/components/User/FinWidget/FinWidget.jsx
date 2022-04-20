import { useEffect, useState } from "react";
import mainAxios from "../../../api/mainAxios";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import styles from "./FinWidget.module.css";

const USER_STATEMENT_VALUE = "/balance";
const USER_WALLET_VALUE = "/wallet/value";
const USER_STATEMENT = "/statement";

const FinWidget = (props) => {
	const [statementValue, setStatementValue] = useState(0);
	const [walletValue, setWalletValue] = useState(0);
	const [amount, setAmount] = useState("");

	const fetchStatementValue = async () => {
		try {
			const access_token = localStorage.getItem("token");

			const response = await mainAxios.get(USER_STATEMENT_VALUE, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});

			const { data } = response;

			setStatementValue(data);
			props.onChangeStatement(data);
		} catch (err) {
			if (err.response) {
				console.log(err.response.data);
				console.log(err.response.status);
				console.log(err.response.headers);
			} else {
				console.log(`Error: ${err.message}`);
			}
		}
	};

	const fetchWalletValue = async () => {
		try {
			const access_token = localStorage.getItem("token");

			const response = await mainAxios.get(USER_WALLET_VALUE, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});

			setWalletValue(response?.data);
		} catch (err) {
			if (err.response) {
				console.log(err.response.data);
				console.log(err.response.status);
				console.log(err.response.headers);
			} else {
				console.log(`Error: ${err.message}`);
			}
		}
	};

	useEffect(() => {
		fetchStatementValue();
		fetchWalletValue();
	}, []);

	const handleSubmit = async (e) => {
		const access_token = localStorage.getItem("token");

		e.preventDefault();

		try {
			const response = await mainAxios.post(
				USER_STATEMENT,
				JSON.stringify({ amount }),
				{
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${access_token}`,
					},
				}
			);

			console.log(JSON.stringify(response?.data));
			fetchStatementValue();
			setAmount("");
		} catch (err) {
			if (!err?.response) {
				console.log({ message: "Sem resposta do servidor." });
			} else {
				console.log(err?.response.data);
			}
		}
	};

	const numberFormat = (value) => {
		return value === 0 ? value : value.toFixed(3);
	};

	return (
		<Card className={styles["user-operations"]}>
			<div className={styles["user-financial-info"]}>
				<p>Carteira: $ {numberFormat(walletValue)}</p>
				<p>Saldo: $ {numberFormat(statementValue)}</p>
			</div>
			<form className={styles["user-deposit"]} onSubmit={handleSubmit}>
				<label htmlFor="amount">Valor</label>
				<input
					type="text"
					name="amount"
					id="amount"
					onChange={(e) => setAmount(e.target.value)}
					required
					value={amount}
				/>
				<Button type="submit">Depositar</Button>
			</form>
		</Card>
	);
};

export default FinWidget;
