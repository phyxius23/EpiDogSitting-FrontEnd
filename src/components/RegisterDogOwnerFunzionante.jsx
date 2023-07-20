import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterDogOwnerFunzionante = () => {
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
			<Container className="">
				<h1 className="text-center">Che aspetti, approfitta dei nostri dogsitters! Registrati!!</h1>
				<Row className="justify-content-center">
					<Col xs={6}>
						<Form className=" rounded form-register" onSubmit={sendRegister}>
							<Form.Group className="mb-3">
								<Form.Label>Nome</Form.Label>
								<Form.Control
									type="text"
									className="input-login"
									placeholder="Inserisci il tuo nome"
									pattern="(^[A-Za-z]{3,}$)"
									title="Sono permessi un minimo di 3 caratteri"
									autoFocus
									value={register.name}
									onChange={(e) => setRegister({ ...register, name: e.target.value })}
									required
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Cognome</Form.Label>
								<Form.Control
									type="text"
									className="input-login"
									placeholder="Inserisci il tuo cognome"
									pattern="(^[A-Za-z]{1,}$)"
									title="Sono permessi solo caratteri"
									value={register.surname}
									onChange={(e) => setRegister({ ...register, surname: e.target.value })}
									required
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									className="input-login"
									placeholder="Inserisci la tua email"
									value={register.email}
									onChange={(e) => setRegister({ ...register, email: e.target.value })}
									required
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									className="input-login"
									placeholder="Inserisci la tua password"
									value={register.password}
									onChange={(e) => setRegister({ ...register, password: e.target.value })}
									required
								/>
							</Form.Group>

							<div className="d-flex justify-content-end">
								<Button type="submit" className="border-0" variant="warning">
									Registrati
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};
export default RegisterDogOwnerFunzionante;
