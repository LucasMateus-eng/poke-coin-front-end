import { useEffect, useState } from "react";
import Button from "../../UI/Button/Button";
import { useNavigate } from "react-router-dom";

import styles from "./HomeBrokerForm.module.css";

import axios from "axios";
import mainAxios from "../../../api/mainAxios";
import bitcoin from "bitcoin-units";

const ACQUISITION_URL = "/acquisition";
const SALE_URL = "/sale";

const HomeBrokerForm = () => {
	const [pokemonName, setPokemonName] = useState("");
	const [pokemonQuantity, setPokemonQuantity] = useState("");
	const [typeOperation, setTypeOperation] = useState("acquisition");
	const [btcToDollar, setBtcToDollar] = useState(0);

	const [pokemon, setPokemon] = useState({
		name: "",
		base_experience: "",
		img: "",
	});

	const fetchPokemon = async () => {
		try {
			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${pokemonName}`
			);

			console.log(response?.data);
			const { data } = response;

			setPokemon({
				name: data.forms[0].name,
				base_experience: data.base_experience,
				img: data.sprites.other.dream_world.front_default,
			});
		} catch (err) {
			if (!err?.response) {
				console.log({ message: "Sem resposta do servidor." });
			} else {
				console.log(err?.response.data);
			}
		}
	};

	const fetchCurrencyValue = async () => {
		try {
			const key =
				"0348070a38e6e37a0ca95711878657fdde0842079ccf71d791d2cdefea75c44d";

			const response = await axios.get(
				`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&&api_key={${key}}`
			);

			setBtcToDollar(response.data.USD);
			console.log(response.data.USD);
		} catch (err) {
			if (!err?.response) {
				console.log({ message: "Sem resposta do servidor." });
			} else {
				console.log(err?.response.data);
			}
		}
	};

	useEffect(() => {
		const id = setTimeout(() => {
			fetchPokemon();
		}, 600);

		return () => {
			clearTimeout(id);
		};
	}, [pokemonName]);

	useEffect(() => {
		fetchCurrencyValue();
	}, [pokemonQuantity]);

	const navigate = useNavigate();

	const handleClick = async () => {
		bitcoin.setFiat("usd", btcToDollar);
		const factor = bitcoin(1, "satoshi").to("usd").value();

		console.log(factor);

		const totalOperation =
			pokemon.base_experience * parseInt(pokemonQuantity) * factor;

		const operation = {
			name: pokemonName,
			base_experience: pokemon.base_experience,
			quantity: parseInt(pokemonQuantity),
			state: typeOperation === "acquisition" ? "purchased" : "sold",
			total: totalOperation,
		};

		console.log(operation);

		try {
			const OPERATION_URL =
				typeOperation === "acquisition" ? ACQUISITION_URL : SALE_URL;
			const access_token = localStorage.getItem("token");

			const response = await mainAxios.post(
				OPERATION_URL,
				JSON.stringify(operation),
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${access_token}`,
					},
				}
			);

			console.log(JSON.stringify(response?.data));

			navigate("/user", { replace: true });
		} catch (err) {
			if (!err?.response) {
				console.log({ message: "Sem resposta do servidor." });
			} else {
				console.log(err?.response.data);
			}
		}
	};

	const notPokemonInfo = <h2>Pesquise um Pokemon</h2>;

	const pokemonInfo = (
		<>
			<div className={styles["pokemon-image"]}>
				<img src={pokemon.img} alt={pokemon.name} />
			</div>
			<div className={styles["poke-info"]}>
				<p>{`Base experience: ${pokemon.base_experience}`}</p>
			</div>
		</>
	);

	return (
		<div className={styles["form-content"]}>
			<form>
				<div className={styles["field-group"]}>
					<label htmlFor="name">Insira o nome do ativo</label>
					<input
						type="text"
						name="name"
						id="name"
						required
						onChange={(e) => setPokemonName(e.target.value.toLowerCase())}
					/>
				</div>
				<div className={styles["field-group"]}>
					<label htmlFor="quantity">Quantidade</label>
					<input
						type="number"
						name="quantity"
						id="quantity"
						min={1}
						required
						onChange={(e) => setPokemonQuantity(e.target.value)}
					/>
				</div>
				<div className={styles["field-group"]}>
					<label htmlFor="operation">Tipo de operação</label>
					<select
						name="operation"
						id="operation"
						required
						onChange={(e) => setTypeOperation(e.target.value)}
					>
						<option value="acquisition">Compra</option>
						<option value="sale">Venda</option>
					</select>
				</div>
			</form>
			<div className={styles["cover-action"]}>
				<div className={styles["pokemon"]}>
					{pokemon.img === "" ? notPokemonInfo : pokemonInfo}
				</div>
				<div className={styles["form-action"]}>
					<Button onClick={handleClick}>Enviar ordem</Button>
				</div>
			</div>
		</div>
	);
};

export default HomeBrokerForm;
