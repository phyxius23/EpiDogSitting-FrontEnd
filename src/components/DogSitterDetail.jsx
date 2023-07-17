/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Image, Row } from "react-bootstrap";
import imgUser from "../assets/images/imgUser.jpg";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "./ModalContactForm";
import { useEffect, useState } from "react";
import { IoHeartOutline, IoHeartSharp, IoAddCircleOutline, IoAddCircle } from "react-icons/io5";
import { addFavoriteAction, removeFavoriteAction } from "../redux/actions";
import Calendar from "react-calendar";
import { ToastContainer, toast } from "react-toastify";

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
				toast.error("Seleziona una data", { autoClose: 1500 });
			}
			if (!serviceSelected) {
				toast.error("Seleziona un servizio", { autoClose: 1500 });
			}
		}
	};

	// add service
	const [serviceSelected, setServiceSelected] = useState("");

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
		<div className="mt-3 mb-4 mb-lg-0 dogsitter-detail">
			<ToastContainer />
			{dogsitter && (
				<>
					{/* FOTO, NOME, CITTÀ CAP */}
					<Row className="align-items-center intro">
						<Col sm={3}>
							<Image src={imgUser} roundedCircle fluid />
						</Col>
						<Col sm={9} className="position-relative">
							<h1 className="display-3" style={{ lineHeight: 1, marginTop: "-6px" }}>
								{dogsitter.name}
							</h1>
							<p>
								{dogsitter.address.city}, {dogsitter.address.postalCode}
							</p>
							{/* AGGIUNGO ICONA PREFERITI DIVERSIFICATA */}
							{isFavorite ? (
								<div className="favoriteIcon" onClick={removeFavorite}>
									<IoHeartSharp />
								</div>
							) : (
								<div className="favoriteIcon" onClick={saveFavorite}>
									<IoHeartOutline />
								</div>
							)}
						</Col>
					</Row>

					{/* DESCRIZIONE */}
					<Row className="mt-3 description">
						<Col sm={12}>
							<p className="lead">
								<span className="font-weight-bold">Description: </span>
								<span>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur minima et quae tempora sequi assumenda officia. Ducimus dolores officiis voluptatem, magnam
									maxime aut dolorem iure. Ea beatae sint repellat!
								</span>
							</p>
						</Col>
					</Row>

					{/* SERVIZI */}
					<Row className="mt-3 service">
						<Col sm={12}>
							<div className="mb-0">
								<h4 className="font-weight-bold">SERVIZI:</h4>
								{dogsitter.offerings.map((service) =>
									service.type === serviceSelected ? (
										<div className="d-flex justify-content-between mb-2 service-row selected" key={service.id}>
											<p>{service.type}</p>
											<div className="d-flex align-items-center">
												<p className="me-2">€ {service.price}</p>
												<IoAddCircle className="cursor-pointer" onClick={() => setServiceSelected("")} />
											</div>
										</div>
									) : (
										<div className="d-flex justify-content-between mb-2 service-row" key={service.id}>
											<p>{service.type}</p>
											<div className="d-flex align-items-center">
												<p className="me-2">€ {service.price}</p>
												<IoAddCircleOutline className="cursor-pointer" onClick={() => setServiceSelected(service.type)} />
											</div>
										</div>
									)
								)}
							</div>
						</Col>
					</Row>

					{/* CALENDAR */}
					<Row className="mt-3">
						<Col>
							<Calendar onChange={onChange} defaultValue={date} />
						</Col>
					</Row>

					{/* CONTACT FORM */}
					<Row>
						<Col className="d-flex justify-content-end">
							<Button onClick={handleShowModal} variant="secondary" className="mt-3">
								<span>Contatta il dogsitter</span>
							</Button>
							<ContactForm show={show} handleCloseModal={handleCloseModal} service={serviceSelected} date={date} />
						</Col>
					</Row>
				</>
			)}
		</div>
	);
};
export default DogSitterDetail;
