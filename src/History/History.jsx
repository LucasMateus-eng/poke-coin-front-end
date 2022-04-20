import React from "react";
import { useLocation, Link } from "react-router-dom";
import ArrowIcon from "../components/UI/ArrowIcon/ArrowIcon";
import styles from "./History.module.css";

const History = () => {
	const location = useLocation();
	const operations = location.state;

	const dateFormat = (date) => {
		const options = {
			year: "numeric",
			month: "short",
			weekday: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			timeZoneName: "short",
		};

		const newDate = new Date(date);

		return newDate.toLocaleDateString("pt-BR", options);
	};

	console.log(operations);

	const operationsDontExists = (
		<>
			<div className={styles["history-nav"]}>
				<nav>
					<Link to="/user">
						<ArrowIcon className={styles["icon-nav"]} />
					</Link>
				</nav>
			</div>
			<div className={styles["history-header"]}>
				<h2>Histórico das operações</h2>
			</div>
			<div className={styles["history-content"]}>
				<h3>Você não tem nenhum histórico.</h3>
			</div>
		</>
	);

	const operationsExists = (
		<>
			<div className={styles["history-nav"]}>
				<nav>
					<Link to="/user">
						<ArrowIcon className={styles["icon-nav"]} />
					</Link>
				</nav>
			</div>
			<div className={styles["history-header"]}>
				<h2>Histórico das operações</h2>
			</div>
			<div className={styles["history-content"]}>
				{React.Children.toArray(
					operations.map((item) => (
						<div className={styles["history-card"]}>
							<div className={styles["history-name"]}>
								<p>{item.name}</p>
							</div>
							<div className={styles["history-state"]}>
								<p>{item.state}</p>
							</div>
							<div className={styles["history-quantity"]}>
								<p>Quantidade: {item.quantity}</p>
							</div>
							<div className={styles["history-total"]}>
								<p>
									Total: {item.total === 0 ? item.total : item.total.toFixed(3)}
								</p>
							</div>
							<div className={styles["history-date"]}>
								<p>{dateFormat(item.created_at)}</p>
							</div>
						</div>
					))
				)}
			</div>
		</>
	);

	return (
		<section className={styles.history}>
			{operations.length === 0 ? operationsDontExists : operationsExists}
		</section>
	);
};

export default History;
