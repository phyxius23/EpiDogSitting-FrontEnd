import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

				navigate("/accedi");
			}
		} catch (error) {
			alert(error);
		}
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
									required
									type="text"
									className="input-login"
									placeholder="Inserisci il tuo nome"
									value={register.name}
									onChange={(e) => setRegister({ ...register, name: e.target.value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Cognome</Form.Label>
								<Form.Control
									required
									type="text"
									className="input-login"
									placeholder="Inserisci il tuo cognome"
									value={register.surname}
									onChange={(e) => setRegister({ ...register, surname: e.target.value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Email</Form.Label>
								<Form.Control
									required
									type="email"
									className="input-login"
									placeholder="Inserisci la tua email"
									value={register.email}
									onChange={(e) => setRegister({ ...register, email: e.target.value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Password</Form.Label>
								<Form.Control
									required
									type="password"
									className="input-login"
									placeholder="Inserisci la tua password"
									value={register.password}
									onChange={(e) => setRegister({ ...register, password: e.target.value })}
								/>
							</Form.Group>

							<div className="d-flex justify-content-end">
								<Button
									className="border-0"
									style={{
										backgroundColor: "#452103",
									}}
									type="submit">
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
export default RegisterDogOwner;
