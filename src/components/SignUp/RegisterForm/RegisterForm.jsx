import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainAxios from "../../../api/mainAxios";
import Button from "../../UI/Button/Button";
import styles from "./RegisterForm.module.css";

const REGISTER_URL = "/auth/register";

const RegisterForm = (props) => {
	const [name, setName] = useState("");
	const [cpf, setCPF] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			name: name,
			cpf: cpf,
			email: email,
			password: password,
		};

		try {
			const response = await mainAxios.post(
				REGISTER_URL,
				JSON.stringify(data),
				{
					headers: { "Content-Type": "application/json" },
				}
			);

			console.log(JSON.stringify(response?.data));

			setName("");
			setCPF("");
			setEmail("");
			setPassword("");

			navigate("/login", { replace: true });
		} catch (err) {
			if (!err?.response) {
				console.log({ message: "Sem resposta do servidor." });
			} else {
				console.log(err?.response.data);
			}
		}
	};

	return (
		<div className={styles["form-content"]}>
			<div className={styles["form-text"]}>
				<h2>Abra sua conta</h2>
				<p>Preencha com os seus dados os campos abaixo.</p>
			</div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles["fields-group"]}>
					<div className={styles["field-group"]}>
						<label htmlFor="name">Nome</label>
						<input
							type="text"
							name="name"
							id="name"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className={styles["field-group"]}>
						<label htmlFor="cpf">CPF</label>
						<input
							type="text"
							name="cpf"
							id="cpf"
							required
							value={cpf}
							onChange={(e) => setCPF(e.target.value)}
						/>
					</div>
					<div className={styles["field-group"]}>
						<label htmlFor="email">E-mail</label>
						<input
							type="email"
							name="email"
							id="email"
							required
							value={email}
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

export default RegisterForm;
