import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { putImageDogAction } from "../redux/actions";
import { toast } from "react-toastify";

const ModalUpdateImage = ({ show, handleCloseModal, dog }) => {
	const dispatch = useDispatch();
	// const oldImage = useSelector ((state) => state.myProfile.user);
	const [image, setImage] = useState("");

	const sendImage = (e) => {
		e.preventDefault();

		handleCloseModal();

		const formData = new FormData();
		formData.append("multipartFile", image);

		// console.log(dog.image.id);

		dispatch(putImageDogAction(dog.id, dog.image.id, formData, toast));
	};

	return (
		<>
			{/* FORM UPDATE IMAGE */}
			<Modal show={show} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						<h3>Sostituisci la foto di {dog.name}</h3>
					</Modal.Title>
				</Modal.Header>
				<Form className="rounded form-register" onSubmit={sendImage}>
					<Modal.Body>
						<Form.Group className="my-3">
							<Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} multiple />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseModal}>
							Chiudi
						</Button>
						<Button className="border-0" type="submit" variant="warning">
							Salva immagine
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};
export default ModalUpdateImage;
