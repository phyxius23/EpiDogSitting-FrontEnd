import { Button, Col, Container, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import imgUser from "../assets/images/imgUser.jpg";
import { useSelector } from "react-redux";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const MyProfilecopysss = () => {
	const token = localStorage.getItem("token");
	const user = useSelector((state) => state.myProfile.user);

	const [address, setAddress] = useState({
		street: "",
		city: "",
		province: "",
		postalCode: "",
		user: user.id,
	});

	const [dog, setDog] = useState({
		name: "",
		age: "",
		breed: "",
		weight: "",
		description: "",
		dogOwner: user.id,
	});

	const sendAddress = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`http://localhost:5001/addresses`, {
				method: "POST",
				body: JSON.stringify(address),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				setAddress({
					street: "",
					city: "",
					province: "",
					postalCode: "",
				});

				// navigate("/accedi");
			}
		} catch (error) {
			alert(error);
		}
	};

	const sendDog = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`http://localhost:5001/dogs`, {
				method: "POST",
				body: JSON.stringify(dog),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				setDog({
					name: "",
					age: "",
					breed: "",
					weight: "",
					description: "",
				});

				// navigate("/accedi");
			}
		} catch (error) {
			alert(error);
		}
	};

	return (
		<Container className="mt-3 mb-4 mb-lg-0 dogsitter-detail">
			{/* FOTO, NOME, CITTÀ CAP */}
			<Row className="justify-content-center align-items-center intro">
				<Col sm={3}>
					<Image src={imgUser} roundedCircle fluid />
				</Col>
				<Col sm={7}>
					<h1 className="display-3" style={{ lineHeight: 1, marginTop: "-6px" }}>
						{user.name}
					</h1>
					<p>Città, CAP</p>
				</Col>
			</Row>

			{/* INDIRIZZO */}
			{/* {user ? (
				<Row className="justify-content-center mt-3 address">
					<Col sm={6}>
						<Form className=" rounded form-register" onSubmit={sendAddress}>
							<Form.Group className="mb-3">
								<Form.Label>Via</Form.Label>
								<Form.Control required type="text" className="" placeholder="Inserisci la via" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Città</Form.Label>
								<Form.Control
									required
									type="text"
									className="input-login"
									placeholder="Inserisci la città"
									value={address.city}
									onChange={(e) => setAddress({ ...address, city: e.target.value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Provincia</Form.Label>
								<Form.Control
									required
									type="text"
									className=""
									placeholder="Inserisci la provincia"
									value={address.province}
									onChange={(e) => setAddress({ ...address, province: e.target.value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>CAP</Form.Label>
								<Form.Control
									required
									type="text"
									className=""
									placeholder="Inserisci il CAP"
									value={address.postalCode}
									onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
								/>
							</Form.Group>

							<div className="d-flex justify-content-end">
								<Button
									className="border-0"
									style={{
										backgroundColor: "#452103",
									}}
									type="submit">
									Salva indirizzo
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			) : (
				<>
					<Row className="justify-content-center mt-3 address">
						<Col sm={10}>
							<div className="mb-0">
								<h4 className="font-weight-bold">INDIRIZZO:</h4>
								<div className="d-flex justify-content-between">
									<p className="mb-0">
										{user.address.street}, {user.address.city} - {user.address.province} - {user.address.postalCode}
									</p>
								</div>
							</div>
						</Col>
					</Row>
					<Row className="justify-content-center mt-3 dog">
						<Col sm={6}>
							<Form className=" rounded form-register" onSubmit={sendDog}>
								<Form.Group className="mb-3">
									<Form.Label>Nome</Form.Label>
									<Form.Control required type="text" className="" placeholder="Inserisci il nome" value={dog.name} onChange={(e) => setDog({ ...dog, name: e.target.value })} />
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Età</Form.Label>
									<Form.Control required type="text" className="input-login" placeholder="Inserisci l'età" value={dog.age} onChange={(e) => setDog({ ...dog, age: e.target.value })} />
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Razza</Form.Label>
									<Form.Control required type="text" className="" placeholder="Inserisci la razza" value={dog.breed} onChange={(e) => setDog({ ...dog, breed: e.target.value })} />
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Peso</Form.Label>
									<Form.Control required type="text" className="" placeholder="Inserisci il peso" value={dog.weight} onChange={(e) => setDog({ ...dog, weight: e.target.value })} />
								</Form.Group>
								<Form.Group className="mb-3">
									<FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
										<Form.Control required as="textarea" placeholder="Inserisci una descrizione" value={dog.description} onChange={(e) => setDog({ ...dog, description: e.target.value })} />
									</FloatingLabel>
								</Form.Group>

								<div className="d-flex justify-content-end">
									<Button
										className="border-0"
										style={{
											backgroundColor: "#452103",
										}}
										type="submit">
										Salva indirizzo
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</>
			)} */}

			{/* DOG */}
			{
				!user && user.dogs > 0 ? (
					// <Row className="justify-content-center mt-3 dog">
					// 	<Col sm={6}>
					// 		<Form className=" rounded form-register" onSubmit={sendDog}>
					// 			<Form.Group className="mb-3">
					// 				<Form.Label>Nome</Form.Label>
					// 				<Form.Control required type="text" className="" placeholder="Inserisci il nome" value={dog.name} onChange={(e) => setDog({ ...dog, name: e.target.value })} />
					// 			</Form.Group>
					// 			<Form.Group className="mb-3">
					// 				<Form.Label>Età</Form.Label>
					// 				<Form.Control required type="text" className="input-login" placeholder="Inserisci l'età" value={dog.age} onChange={(e) => setDog({ ...dog, age: e.target.value })} />
					// 			</Form.Group>
					// 			<Form.Group className="mb-3">
					// 				<Form.Label>Razza</Form.Label>
					// 				<Form.Control required type="text" className="" placeholder="Inserisci la razza" value={dog.breed} onChange={(e) => setDog({ ...dog, breed: e.target.value })} />
					// 			</Form.Group>
					// 			<Form.Group className="mb-3">
					// 				<Form.Label>Peso</Form.Label>
					// 				<Form.Control required type="text" className="" placeholder="Inserisci il peso" value={dog.weight} onChange={(e) => setDog({ ...dog, weight: e.target.value })} />
					// 			</Form.Group>
					// 			<Form.Group className="mb-3">
					// 				{/* <Form.Label>Peso</Form.Label>
					// 				<Form.Control required type="text" className="" placeholder="Inserisci il peso" value={dog.description} onChange={(e) => setAddress({ ...dog, description: e.target.value })} /> */}
					// 				<FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
					// 					<Form.Control required as="textarea" placeholder="Inserisci una descrizione" value={dog.description} onChange={(e) => setDog({ ...dog, description: e.target.value })} />
					// 				</FloatingLabel>
					// 			</Form.Group>

					// 			<div className="d-flex justify-content-end">
					// 				<Button
					// 					className="border-0"
					// 					style={{
					// 						backgroundColor: "#452103",
					// 					}}
					// 					type="submit">
					// 					Salva indirizzo
					// 				</Button>
					// 			</div>
					// 		</Form>
					// 	</Col>
					// </Row>
					<Row className="justify-content-center mt-3 dog">
						<Col sm={10}>
							<div className="lead mb-0">
								<h4 className="font-weight-bold">I MIEI PELOSI:</h4>
								<Row className="">
									<Col xs={4} className="dog-card me-3">
										<p className="mb-0">Nome</p>
										<p className="mb-0">Età</p>
										<p className="mb-0">Razza</p>
										<p className="mb-0">Peso</p>
										<p className="mb-0">Descrizione</p>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				) : null
				// <Row className="justify-content-center mt-3 dog">
				// 	<Col sm={10}>
				// 		<div className="lead mb-0">
				// 			<h4 className="font-weight-bold">I MIEI PELOSI:</h4>
				// 			<Row className="">
				// 				<Col xs={4} className="dog-card me-3">
				// 					<p className="mb-0">Nome</p>
				// 					<p className="mb-0">Età</p>
				// 					<p className="mb-0">Razza</p>
				// 					<p className="mb-0">Peso</p>
				// 					<p className="mb-0">Descrizione</p>
				// 				</Col>

				// 				<Col xs={4} className="dog-card">
				// 					<p className="mb-0">Nome</p>
				// 					<p className="mb-0">Età</p>
				// 					<p className="mb-0">Razza</p>
				// 					<p className="mb-0">Peso</p>
				// 					<p className="mb-0">Descrizione</p>
				// 				</Col>
				// 			</Row>
				//       </div>
				// 	</Col>
				// </Row>

				/* <div className="d-flex justify-content-between mb-2">
          <p>Nome</p>
          <p>$ 0.00</p>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <p>Servizio</p>
          <p>$ 0.00</p>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <p>Servizio</p>
          <p>$ 0.00</p>
        </div> */
			}

			{/* <Button variant="primary">ADD TO CART</Button> */}
		</Container>
	);
};
export default MyProfilecopysss;
