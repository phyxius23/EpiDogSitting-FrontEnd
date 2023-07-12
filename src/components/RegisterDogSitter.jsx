import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisterDogSitter = () => {
	const [register, setRegister] = useState({
		nome: "",
		cognome: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const sendRegister = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`http://localhost:5001/auth/register/dogsitters`, {
				method: "POST",
				body: JSON.stringify(register),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				setRegister({
					nome: "",
					cognome: "",
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
				<h1 className="text-center">Registrati! Diventa un DogSitter</h1>
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
									value={register.nome}
									onChange={(e) => setRegister({ ...register, nome: e.target.value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Cognome</Form.Label>
								<Form.Control
									required
									type="text"
									className="input-login"
									placeholder="Inserisci il tuo cognome"
									value={register.cognome}
									onChange={(e) => setRegister({ ...register, cognome: e.target.value })}
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
										backgroundColor: "",
									}}
									type="submit">
									Registrati
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
			{/* <h1 className="text-center">Registra un DogSitter</h1>

			<Row className="justify-content-center">
				<Col xs={4}>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="name@example.com" />
						</Form.Group>
					</Form>
				</Col>
			</Row>

			<Row className="justify-content-center">
				<Col xs={4}>
					<InputGroup className="mb-3">
						<InputGroup.Text id="name">Nome</InputGroup.Text>
						<Form.Control placeholder="Name" aria-label="Name" aria-describedby="name" />
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Text id="cognome">Cognome</InputGroup.Text>
						<Form.Control placeholder="Cognome" aria-label="Cognome" aria-describedby="cognome" />
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Text id="email">E-mail</InputGroup.Text>
						<Form.Control placeholder="E-mail" aria-label="E-mail" aria-describedby="email" />
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Text>$</InputGroup.Text>
						<Form.Control aria-label="Amount (to the nearest dollar)" />
						<InputGroup.Text>.00</InputGroup.Text>
					</InputGroup>
				</Col>
			</Row> */}
		</>
	);
};
export default RegisterDogSitter;
