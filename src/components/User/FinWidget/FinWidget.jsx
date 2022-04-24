import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";

import mainAxios from "../../../api/mainAxios";
import numberFormat from "../../../helpers/numberFormat";
import styles from "./FinWidget.module.css";

const USER_STATEMENT_VALUE = "/balance";
const USER_WALLET_VALUE = "/wallet/value";
const USER_STATEMENT = "/statement";

const FinWidget = ({ onChangeStatement }) => {
	const [statementValue, setStatementValue] = useState(0);
	const [walletValue, setWalletValue] = useState(0);
	const [amount, setAmount] = useState("");

	useEffect(() => {
		const fetchFinancialData = async () => {
			try {
				const access_token = localStorage.getItem("token");

				const [statement, walletValue] = await Promise.all([
					mainAxios.get(USER_STATEMENT_VALUE, {
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					}),
					mainAxios.get(USER_WALLET_VALUE, {
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					}),
				]);

				console.log(statement);
				setStatementValue(statement?.data);
				onChangeStatement(statement?.data);

				console.log(walletValue);
				setWalletValue(walletValue?.data);
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

		fetchFinancialData();
	}, [statementValue, walletValue, onChangeStatement]);

	const handleSubmit = async (e) => {
		const access_token = localStorage.getItem("token");

		e.preventDefault();

		try {
			if (amount === "") {
				toast.error("O depósito não pode ser vazio!");
				return;
			}

			const response = await mainAxios.post(
				USER_STATEMENT,
				JSON.stringify({ amount: parseInt(amount) }),
				{
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${access_token}`,
					},
				}
			);

			console.log(JSON.stringify(response?.data));

			toast.success(response?.data.message);
			setAmount("");
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

	return (
		<Card className={styles["user-operations"]}>
			<div className={styles["user-financial-info"]}>
				<p>Carteira: $ {numberFormat(walletValue)}</p>
				<p>Saldo: $ {numberFormat(statementValue)}</p>
			</div>
			<form className={styles["user-deposit"]} onSubmit={handleSubmit}>
				<label htmlFor="amount">Valor</label>
				<input
					type="number"
					name="amount"
					id="amount"
					min={1}
					value={amount}
					required
					onChange={(e) => setAmount(e.target.value)}
				/>
				<Button type="submit">Depositar</Button>
			</form>
		</Card>
	);
};

export default FinWidget;
