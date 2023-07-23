import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postDogAction } from "../redux/actions";
import { toast } from "react-toastify";

const AddDogForm = () => {
	const dogowner = useSelector((state) => state.myProfile.user);
	const dispatch = useDispatch();

	const [dog, setDog] = useState({
		name: "",
		age: "",
		breed: "",
		weight: "",
		description: "",
		// se la elimino devo eliminarla o renderla opzionale lato backend
	});

	const sendDog = (e) => {
		e.preventDefault();
		dispatch(postDogAction(dogowner.id, dog, toast));

		setDog({
			name: "",
			age: "",
			breed: "",
			weight: "",
			// description: "",
		});
	};

	return (
		<Row className="justify-content-center mt-5 dog">
			<Col sm={6}>
				<Card className="card__first-dog shadow">
					<Form className=" rounded form-register" onSubmit={sendDog}>
						<Card.Title className="border-bottom mb-3">
							<h4 className="font-weight-bold">Inserisci il tuo animale:</h4>
						</Card.Title>

						<Form.Group className="mb-3">
							<Form.Label>Nome</Form.Label>
							<Form.Control required type="text" className="" placeholder="Inserisci il nome" value={dog.name} onChange={(e) => setDog({ ...dog, name: e.target.value })} />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Età</Form.Label>
							<Form.Control required type="number" max={120} className="input-login" placeholder="Inserisci l'età" value={dog.age} onChange={(e) => setDog({ ...dog, age: e.target.value })} />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Razza</Form.Label>
							<Form.Control required type="text" className="" placeholder="Inserisci la razza" value={dog.breed} onChange={(e) => setDog({ ...dog, breed: e.target.value })} />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Peso</Form.Label>
							<Form.Control required type="number" max={120} placeholder="Inserisci il peso" value={dog.weight} onChange={(e) => setDog({ ...dog, weight: e.target.value })} />
						</Form.Group>
						{/* <Form.Group className="mb-3">
						<FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
							<Form.Control required as="textarea" placeholder="Inserisci una descrizione" value={dog.description} onChange={(e) => setDog({ ...dog, description: e.target.value })} />
						</FloatingLabel>
					</Form.Group> */}

						<div className="d-flex justify-content-end">
							<Button type="submit" variant="warning" className="border-0">
								Salva animale
							</Button>
						</div>
					</Form>
				</Card>
			</Col>
		</Row>
	);
};
export default AddDogForm;
