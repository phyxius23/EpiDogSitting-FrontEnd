import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserLoggedAction } from "../redux/actions";
import zampa from "../assets/images/zampa.png";
import { toast } from "react-toastify";

const LoginFunzionante = () => {
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const sendLogin = async (e) => {
		e.preventDefault();

		if (!isValidEmail(login.email)) {
			return toast.warning("Formato email errato");
		}

		try {
			const response = await fetch(`http://localhost:5001/auth/login`, {
				method: "POST",
				body: JSON.stringify(login),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const data = await response.json();

				localStorage.setItem("token", data.accessToken);

				setLogin({
					email: "",
					password: "",
				});
				dispatch(getUserLoggedAction(toast));

				navigate("/my-profile");
			} else {
				toast.error("Credenziali errate");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	// validazione email
	const isValidEmail = (email) => {
		const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
		return emailRegex.test(email);
	};

	return (
		<Container>
			<Row className="justify-content-center my-5 login">
				<div className="wrapperImg">
					<div>
						<Image src={zampa} fluid />
						<Image src={zampa} fluid />
						<Image src={zampa} fluid />
						<Image src={zampa} fluid />
					</div>
				</div>
				<Col xs={12}>
					<h1 className="text-center">Esegui il login</h1>
				</Col>
				<Col xs={6}>
					<Form className=" rounded p-5 my-3 form-login" onSubmit={sendLogin}>
						<Form.Group className="mb-3">
							<Form.Label>E-mail</Form.Label>
							<Form.Control
								required
								type="email"
								className="input-login"
								placeholder="Inserisci la tua email"
								autoFocus
								value={login.email}
								onChange={(e) => setLogin({ ...login, email: e.target.value })}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								required
								pattern="(^[0-9]{4}$)"
								title="La password deve essere composta da 4 caratteri"
								type="password"
								className="input-login"
								placeholder="Inserisci la tua password"
								value={login.password}
								onChange={(e) => setLogin({ ...login, password: e.target.value })}
							/>
						</Form.Group>
						<div className="d-flex justify-content-end">
							<Button className="border-0" type="submit" variant="warning">
								Entra
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginFunzionante;
