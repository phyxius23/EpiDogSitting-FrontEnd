import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import { IoPaperPlaneSharp } from "react-icons/io5";

const ModalContactForm = ({ show, handleCloseModal, service }) => {
	const dogsitter = useSelector((state) => state.dogSitterSelected.content);
	const dogowner = useSelector((state) => state.myProfile.user);

	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm("service_kqd9047", "template_gkui3xl", form.current, "vq0Jgo8VpKRRf3TJX").then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

	return (
		<>
			<Modal show={show} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						<h3>Contatta {dogsitter.name}</h3>
					</Modal.Title>
				</Modal.Header>
				<Form ref={form} onSubmit={sendEmail}>
					<Modal.Body>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Nome</Form.Label>
							<Form.Control type="text" name="user_name" value={dogowner.name} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="name@example.com" name="user_email" value={dogowner.email} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Servizio</Form.Label>
							<Form.Control type="text" placeholder="Servizio" name="dogsitter_service" value={service} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Example textarea</Form.Label>
							<Form.Control as="textarea" rows={3} name="message" />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseModal}>
							Chiudi
						</Button>
						<Button type="submit" variant="primary" onClick={handleCloseModal}>
							<span>Invia</span>
							<IoPaperPlaneSharp />
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};
export default ModalContactForm;
