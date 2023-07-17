import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserLoggedAction } from "../redux/actions";
import zampa from "../assets/images/zampa.png";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});

	// const [error, setError] = useState(null);
	// const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const sendLogin = async (e) => {
		e.preventDefault();

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

				toast.success("Credenziali corrette", { autoClose: 1000 });

				setTimeout(() => {
					navigate("/my-profile");
				}, 2000);
			} else {
				toast.error("Credenziali errate", { autoClose: 1000 });
			}
		} catch (error) {
			// setError(error);
			// setErrorMessage(error.message);
			toast.error(error.message, { autoClose: 1000 });
		}
	};
	return (
		<Container>
			<ToastContainer />
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
								type="text"
								className="input-login"
								placeholder="Inserisci la tua email"
								value={login.email}
								onChange={(e) => setLogin({ ...login, email: e.target.value })}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								required
								type="password"
								className="input-login"
								placeholder="Inserisci la tua password"
								value={login.password}
								onChange={(e) => setLogin({ ...login, password: e.target.value })}
							/>
						</Form.Group>
						<div className="d-flex justify-content-end">
							<Button
								className="border-0"
								style={{
									backgroundColor: "",
								}}
								type="submit">
								Entra
							</Button>
						</div>
						{/* {error && (
							<Alert className="mt-3" variant="danger" onClose={() => setError(null)} dismissible>
								{errorMessage}
							</Alert>
						)} */}
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
