import { Col, Row } from "react-bootstrap";

const Home = () => {
	return (
		<Row>
			<Col
				className="text-center bg-image"
				style={{
					backgroundImage: "url('https://images.pexels.com/photos/9040443/pexels-photo-9040443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
					backgroundSize: "cover",
					height: 650,
				}}>
				<div className="h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}>
					<div className="d-flex justify-content-center align-items-center h-100">
						<div className="text-white">
							<h1 className="mb-3">EpiDogSitting</h1>
						</div>
					</div>
				</div>
			</Col>
		</Row>
	);
};
export default Home;
