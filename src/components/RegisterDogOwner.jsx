import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterDogOwner = () => {
	const [register, setRegister] = useState({
		name: "",
		surname: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const sendRegister = async (e) => {
		e.preventDefault();

		if (!isValidEmail(register.email)) {
			return toast.warning("Formato email errato");
		}

		try {
			const response = await fetch(`http://localhost:5001/auth/register/dogowners`, {
				method: "POST",
				body: JSON.stringify(register),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				setRegister({
					name: "",
					surname: "",
					email: "",
					password: "",
				});

				toast.success("Registrazione avvenuta con successo", { autoClose: 1000 });

				navigate("/accedi");
			} else {
				toast.error("Registrazione non eseguita", { autoClose: 1000 });
			}
		} catch (error) {
			// alert(error);
			toast.error("Registrazione non eseguita", { autoClose: 1000 });
		}
	};

	// validazione email
	const isValidEmail = (email) => {
		const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
		return emailRegex.test(email);
	};

	return (
		<>
			<main className="form-signup">
				<Row className="justify-content-center align-items-center">
					<Col xs={11} sm={9} md={6} lg={5} xl={4}>
						<Form className="p-5 shadow-lg" onSubmit={sendRegister}>
							<h1 className="h3 mb-3 fw-normal">Esegui Registrazione</h1>

							<FloatingLabel controlId="name" label="Nome" className="">
								<Form.Control
									required
									type="text"
									placeholder="Inserisci il tuo nome"
									autoFocus
									pattern="(^[A-Za-z]{3,}$)"
									title="Sono permessi un minimo di 3 caratteri"
									value={register.name}
									onChange={(e) => setRegister({ ...register, name: e.target.value })}
									className="input-login"
								/>
							</FloatingLabel>

							<FloatingLabel controlId="surname" label="Cognome" className="">
								<Form.Control
									required
									type="text"
									placeholder="Inserisci il tuo cognome"
									pattern="(^[A-Za-z]{1,}$)"
									title="Sono permessi solo caratteri"
									value={register.surname}
									onChange={(e) => setRegister({ ...register, surname: e.target.value })}
									className="input-login"
								/>
							</FloatingLabel>

							<FloatingLabel controlId="email" label="Email" className="">
								<Form.Control
									required
									type="email"
									placeholder="Inserisci la tua email"
									pattern="(^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$)"
									title="Il formato email inserito non è valido"
									value={register.email}
									onChange={(e) => setRegister({ ...register, email: e.target.value })}
									className="input-login"
								/>
							</FloatingLabel>

							<FloatingLabel controlId="password" label="Password" className="mb-3">
								<Form.Control
									required
									type="password"
									placeholder="Inserisci la tua password"
									pattern="(^[0-9]{4}$)"
									title="La password deve essere composta da 4 caratteri"
									value={register.password}
									onChange={(e) => setRegister({ ...register, password: e.target.value })}
									className="input-login"
								/>
							</FloatingLabel>

							<Button type="submit" variant="warning" className="w-100">
								Registrati
							</Button>
						</Form>
					</Col>
				</Row>
			</main>
		</>
	);
};
export default RegisterDogOwner;
