/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import imgUser from "../assets/images/imgUser.jpg";
import { useDispatch, useSelector } from "react-redux";
import ModalContactForm from "./ModalContactForm";
import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { addFavoriteAction, removeFavoriteAction } from "../redux/actions";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import favoriteChecked from "../assets/icons/dog-favorite.png";
import dogHouse from "../assets/icons/dog-house.png";
import dogTraining from "../assets/icons/dog-training.png";
import dogWalking from "../assets/icons/dog-walking.png";

const DogSitterDetail = () => {
	const dogsitter = useSelector((state) => state.dogSitterSelected.content);
	const dogowner = useSelector((state) => state.myProfile.user);
	const favorites = useSelector((state) => state.favorites.content);
	const dispatch = useDispatch();

	// open/close modal form to contact dogsitter
	const [show, setShow] = useState(false);

	const handleCloseModal = () => setShow(false);
	const handleShowModal = () => {
		if (serviceSelected && date) {
			setShow(true);
		} else {
			if (!date) {
				toast.warn("Seleziona una data", { autoClose: 1500 });
			}
			if (!serviceSelected) {
				toast.warn("Seleziona un servizio", { autoClose: 1500 });
			}
		}
	};

	// add service
	const [serviceSelected, setServiceSelected] = useState("");

	// icon service
	const iconServiceFn = (service) => {
		switch (service) {
			case "PASSEGGIATA":
				return dogWalking;
			case "ASILO_DIURNO":
				return dogTraining;
			case "PERNOTTAMENTO":
				return dogHouse;
			default:
				break;
		}
	};

	// transform string service
	const textServiceFn = (service) => {
		switch (service) {
			case "PASSEGGIATA":
				return "Passeggiata";
			case "ASILO_DIURNO":
				return "Asilo diurno";
			case "PERNOTTAMENTO":
				return "Pernottamento";
			default:
				break;
		}
	};

	// calendar
	const [date, setDate] = useState(new Date());

	const onChange = (date) => {
		setDate(date.toLocaleDateString());
	};

	// add/remove favorite
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		setIsFavorite(
			favorites.find((favorite) => {
				return favorite.dogSitter === dogsitter.id;
			})
		);
	}, [dogsitter]);

	const saveFavorite = () => {
		setIsFavorite(true);

		dispatch(addFavoriteAction(dogowner.id, dogsitter.id));
	};

	const removeFavorite = () => {
		setIsFavorite(false);

		const favoriteId = favorites.find((favorite) => {
			return favorite.dogSitter === dogsitter.id;
		});

		dispatch(removeFavoriteAction(favoriteId.id));
	};

	return (
		<div className="mt-3 mb-4 mb-lg-0 dogsitter-selected">
			{dogsitter ? (
				<>
					{/* FOTO, NOME, CITTÀ CAP */}
					<Row className="align-items-center intro">
						<Col xs={3}>
							<Image src={imgUser} className="shadow-lg" roundedCircle fluid />
						</Col>
						<Col xs={9} className="position-relative">
							<h1 className="display-3" style={{ lineHeight: 1, marginTop: "-6px" }}>
								{dogsitter.name}
							</h1>
							<p>
								{dogsitter.address.city}, {dogsitter.address.postalCode}
							</p>
							{/* AGGIUNGO ICONA PREFERITI DIVERSIFICATA */}
							{isFavorite ? (
								<div className="favoriteIcon show" onClick={removeFavorite}>
									<Image src={favoriteChecked} />
								</div>
							) : (
								<div className="favoriteIcon" onClick={saveFavorite}>
									<Image src={favoriteChecked} />
								</div>
							)}
						</Col>
					</Row>

					{/* DESCRIZIONE */}
					<Row className="mt-4 description">
						<Col>
							<Card className="lead shadow border-0">
								<Card.Body>
									<Card.Title className="px-3">
										<h4>Description:</h4>
									</Card.Title>
									<Card.Text className="px-3">{dogsitter.description}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>

					{/* SERVIZI */}
					<Row className="mt-4 service">
						<Col>
							<Card className="border-0 shadow">
								<Card.Body>
									<Card.Title>
										<h4 className="font-weight-bold">SERVIZI:</h4>
									</Card.Title>
									{dogsitter.offerings.map((service) => (
										<div className={`d-flex justify-content-between mb-2 service-row  ${service.type === serviceSelected ? "selected" : ""}`} key={service.id}>
											<div className="d-flex align-items-center">
												<Image src={iconServiceFn(service.type)} className="serviceIcon" />
												<Card.Text>{textServiceFn(service.type)}</Card.Text>
											</div>

											<div className="d-flex align-items-center">
												<p className="me-2">€ {service.price}</p>
												<IoAddCircle className="cursor-pointer" onClick={service.type === serviceSelected ? () => setServiceSelected("") : () => setServiceSelected(service.type)} />
											</div>
										</div>
									))}
								</Card.Body>
							</Card>
						</Col>
					</Row>

					{/* CALENDAR */}
					<Row className="mt-4">
						<Col>
							<Calendar onChange={onChange} defaultValue={date} className="shadow" />
						</Col>
					</Row>

					{/* CONTACT FORM */}
					<Row>
						<Col className="d-flex justify-content-end">
							<Button onClick={handleShowModal} variant="warning" className="shadow mt-3">
								<span>Contatta il dogsitter</span>
							</Button>
							<ModalContactForm show={show} handleCloseModal={handleCloseModal} service={serviceSelected} date={date} textServiceFn={textServiceFn} />
						</Col>
					</Row>
				</>
			) : (
				<div>
					<h3 className="display-6">Seleziona un DogSitter!</h3>
				</div>
			)}
		</div>
	);
};
export default DogSitterDetail;
