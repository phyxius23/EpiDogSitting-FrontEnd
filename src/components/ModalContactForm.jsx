import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import { IoPaperPlaneSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const ModalContactForm = ({ show, handleCloseModal, service, date, textServiceFn }) => {
	const dogsitter = useSelector((state) => state.dogSitterSelected.content);
	const dogowner = useSelector((state) => state.myProfile.user);

	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm("service_kqd9047", "template_gkui3xl", form.current, "vq0Jgo8VpKRRf3TJX").then(
			(result) => {
				// console.log(form.current);
				toast.success("Email inviata con successo", { autoClose: 1000 });

				handleCloseModal();
			},
			(error) => {
				toast.error(error.text, { autoClose: 1000 });
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
				<Form ref={form} onSubmit={sendEmail} validated>
					<Modal.Body>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Nome</Form.Label>
							<Form.Control type="text" name="user_name" defaultValue={dogowner.name} readOnly />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="name@example.com" name="user_email" defaultValue={dogowner.email} readOnly />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Servizio</Form.Label>
							<Form.Control type="text" placeholder="Servizio" name="dogsitter_service" defaultValue={textServiceFn(service)} readOnly />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Data</Form.Label>
							<Form.Control type="text" placeholder="Data" name="date_service" defaultValue={date} readOnly />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Scegli l'ora</Form.Label>
							{service === "PASSEGGIATA" ? (
								<Form.Select name="hour_service">
									<option value="" disabled>
										Scegli l'ora
									</option>
									<option>7:00</option>
									<option>7:30</option>
									<option>8:00</option>
									<option>8:30</option>
									<option>9:00</option>
									<option>9:30</option>
									<option>10:00</option>
									<option>10:30</option>
									<option>11:00</option>
									<option>11:30</option>
									<option>12:00</option>
									<option>12:30</option>
									<option>13:00</option>
									<option>13:30</option>
									<option>14:00</option>
									<option>14:30</option>
									<option>15:00</option>
									<option>15:30</option>
									<option>16:00</option>
									<option>16:30</option>
									<option>17:00</option>
									<option>17:30</option>
									<option>18:00</option>
									<option>18:30</option>
									<option>19:00</option>
									<option>19:30</option>
									<option>20:00</option>
									<option>20:30</option>
									<option>21:00</option>
									<option>21:30</option>
									<option>22:00</option>
									<option>22:30</option>
									<option>23:00</option>
								</Form.Select>
							) : service === "ASILO_DIURNO" ? (
								<Form.Select name="hour_service" readOnly>
									<option>7.00 - 19.00</option>
								</Form.Select>
							) : (
								<Form.Select name="hour_service" readOnly>
									<option>19.30 - 8.00</option>
								</Form.Select>
							)}
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Messaggio</Form.Label>
							<Form.Control as="textarea" rows={3} name="message" required />
							<Form.Control.Feedback type="invalid">Prego inserire un messaggio</Form.Control.Feedback>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseModal}>
							Chiudi
						</Button>
						<Button type="submit" variant="warning" className="button-send">
							<span className="me-1">Invia</span>
							<IoPaperPlaneSharp />
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};
export default ModalContactForm;
