import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../UI/Button/Button";

import styles from "./LoginForm.module.css";

import mainAxios from "../../../api/mainAxios";
const LOGIN_URL = "/auth/login";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { setAuth } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await mainAxios.post(
				LOGIN_URL,
				JSON.stringify({ email, password }),
				{
					headers: { "Content-type": "application/json" },
				}
			);

			console.log(JSON.stringify(response?.data));

			const accessToken = response?.data?.token;

			setAuth({ email, password, accessToken });
			setEmail("");
			setPassword("");
			localStorage.setItem("token", accessToken);

			toast.success(response?.data.message);
			navigate("/user", { replace: true });
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
		<div className={styles["form-content"]}>
			<div className={styles["form-text"]}>
				<h2>Bora investir!</h2>
				<p>Seja bem-vindo(a)! Entre com os dados cadastrados.</p>
			</div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles["fields-group"]}>
					<div className={styles["field-group"]}>
						<label htmlFor="email">E-mail</label>
						<input
							type="email"
							name="email"
							id="email"
							value={email}
							autoComplete="off"
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className={styles["field-group"]}>
						<label htmlFor="password">Senha</label>
						<input
							type="password"
							name="password"
							id="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>
				<div className={styles["action-form"]}>
					<Button type="submit">Entrar</Button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
