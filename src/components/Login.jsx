import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserLoggedAction } from "../redux/actions";
import { toast } from "react-toastify";

const Login = () => {
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
		// <div>
		<main className="form-signin">
			<Row className="justify-content-center align-items-center">
				<Col xs={11} sm={9} md={6} lg={5} xl={4}>
					<Form className="p-5 shadow-lg" onSubmit={sendLogin}>
						{/* <Image class="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
						<h1 className="h3 mb-3 fw-normal">Esegui Login</h1>

						<FloatingLabel controlId="email" label="Email" className="">
							<Form.Control
								required
								type="email"
								placeholder="name@example.com"
								autoFocus
								value={login.email}
								onChange={(e) => setLogin({ ...login, email: e.target.value })}
								className="input-login"
							/>
						</FloatingLabel>

						<FloatingLabel controlId="password" label="Password" className="mb-3">
							<Form.Control
								required
								type="password"
								placeholder="Password"
								pattern="(^[0-9]{4}$)"
								title="La password deve essere composta da 4 caratteri"
								value={login.password}
								onChange={(e) => setLogin({ ...login, password: e.target.value })}
								className="input-login"
							/>
						</FloatingLabel>
						<Button type="submit" variant="warning" className="w-100">
							Sign in
						</Button>
					</Form>
				</Col>
			</Row>

			{/* <Row className="justify-content-center my-5 login">
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
			</Row> */}

			{/* </div> */}
		</main>
	);
};

export default Login;
