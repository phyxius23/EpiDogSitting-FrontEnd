import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm("service_kqd9047", "template_gkui3xl", form.current, "vq0Jgo8VpKRRf3TJX").then(
			(result) => {
				console.log(result.text);
				form.current.reset();
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

	return (
		<Form ref={form} onSubmit={sendEmail}>
			<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				<Form.Label>Nome</Form.Label>
				<Form.Control type="text" name="user_name" />
			</Form.Group>
			<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" placeholder="name@example.com" name="user_email" />
			</Form.Group>
			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				<Form.Label>Example textarea</Form.Label>
				<Form.Control as="textarea" rows={3} name="message" />
			</Form.Group>
			<Button type="submit">Invia</Button>
		</Form>
	);
};
export default ContactForm;
