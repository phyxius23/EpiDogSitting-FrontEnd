import { Button, Col, Container, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import imgUser from "../assets/images/imgUser.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { postAddressAction, postDogAction } from "../redux/actions";
import AddAddressForm from "./AddAddressForm";
import AddDogForm from "./AddDogForm";

const MyProfileCopy = () => {
	// const token = localStorage.getItem("token");
	const dogowner = useSelector((state) => state.myProfile.user);

	const dispatch = useDispatch();

	const [address, setAddress] = useState({
		street: "",
		city: "",
		province: "",
		postalCode: "",
	});

	const [dog, setDog] = useState({
		name: "",
		age: "",
		breed: "",
		weight: "",
		description: "",
	});

	const sendAddress = (e) => {
		e.preventDefault();
		dispatch(postAddressAction(dogowner.id, address));

		setAddress({
			street: "",
			city: "",
			province: "",
			postalCode: "",
		});
	};

	const sendDog = (e) => {
		e.preventDefault();
		dispatch(postDogAction(dogowner.id, dog));

		setDog({
			name: "",
			age: "",
			breed: "",
			weight: "",
			description: "",
		});
	};

	//console.log(address.user);

	// useEffect(() => {
	// 	dispatch(postAddressAction(address));
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// const [dog, setDog] = useState({
	// 	name: "",
	// 	age: "",
	// 	breed: "",
	// 	weight: "",
	// 	description: "",
	// 	dogOwner: user.id,
	// });

	// const sendAddress = async (e) => {
	// 	e.preventDefault();

	// 	try {
	// 		// setAddress({ ...address, user: dogowner.id });
	// 		// console.log(address);
	// 		const response = await fetch(`http://localhost:5001/api/dogowner/` + dogowner.id + "/address", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 			body: JSON.stringify(address),
	// 		});
	// 		if (response.ok) {
	// 			// dispatch(postAddressAction(address));
	// 			// dispatch();

	// 			setAddress({
	// 				street: "",
	// 				city: "",
	// 				province: "",
	// 				postalCode: "",
	// 				// user: "",
	// 			});

	// 			// navigate("/accedi");
	// 		}
	// 	} catch (error) {
	// 		alert(error);
	// 	}
	// };

	// const sendDog = async (e) => {
	// 	e.preventDefault();

	// 	try {
	// 		const response = await fetch(`http://localhost:5001/dogs`, {
	// 			method: "POST",
	// 			body: JSON.stringify(dog),
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		});
	// 		if (response.ok) {
	// 			setDog({
	// 				name: "",
	// 				age: "",
	// 				breed: "",
	// 				weight: "",
	// 				description: "",
	// 			});

	// 			// navigate("/accedi");
	// 		}
	// 	} catch (error) {
	// 		alert(error);
	// 	}
	// };

	return (
		<Container className="mt-3 mb-4 mb-lg-0 dogsitter-detail">
			{/* FOTO, NOME, CITTÀ CAP */}
			<Row className="justify-content-center align-items-center intro">
				<Col sm={3}>
					<Image src={imgUser} roundedCircle fluid />
				</Col>
				<Col sm={7}>
					<h1 className="display-3" style={{ lineHeight: 1, marginTop: "-6px" }}>
						{dogowner.name}
						{/* {console.log(dogowner)} */}
					</h1>
					<p>Città, CAP</p>
				</Col>
			</Row>

			{/* INDIRIZZO */}
			{
				!dogowner.address && <AddAddressForm />
				// : (
				// <Row className="justify-content-center mt-3 address">
				// 	<Col sm={6}>
				// 		<Form className=" rounded form-register" onSubmit={sendAddress}>
				// 			<Form.Group className="mb-3">
				// 				<Form.Label>Via</Form.Label>
				// 				<Form.Control required type="text" className="" placeholder="Inserisci la via" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
				// 			</Form.Group>
				// 			<Form.Group className="mb-3">
				// 				<Form.Label>Città</Form.Label>
				// 				<Form.Control
				// 					required
				// 					type="text"
				// 					className="input-login"
				// 					placeholder="Inserisci la città"
				// 					value={address.city}
				// 					onChange={(e) => setAddress({ ...address, city: e.target.value })}
				// 				/>
				// 			</Form.Group>
				// 			<Form.Group className="mb-3">
				// 				<Form.Label>Provincia</Form.Label>
				// 				<Form.Control
				// 					required
				// 					type="text"
				// 					className=""
				// 					placeholder="Inserisci la provincia"
				// 					value={address.province}
				// 					onChange={(e) => setAddress({ ...address, province: e.target.value })}
				// 				/>
				// 			</Form.Group>
				// 			<Form.Group className="mb-3">
				// 				<Form.Label>CAP</Form.Label>
				// 				<Form.Control
				// 					required
				// 					type="text"
				// 					className=""
				// 					placeholder="Inserisci il CAP"
				// 					value={address.postalCode}
				// 					onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
				// 				/>
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
				// 	<h1>Indirizzo impostato</h1>
				// )
			}
			{dogowner.address && dogowner.dogs.length === 0 && (
				<AddDogForm />
				// <Row className="justify-content-center mt-3 dog">
				// 	<h1>Indirizzo inserito</h1>
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
				// 					<Form.Control required type="text" className="" placeholder="Inserisci il peso" value={dog.description} onChange={(e) => setAddress({ ...dog, description: e.target.value })} /> */}
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
			)}
		</Container>
	);
};
export default MyProfileCopy;
