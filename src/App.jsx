import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";
import "./App.css";
import { Container } from "react-bootstrap";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import RegisterDogSitter from "./components/RegisterDogSitter";
import RegisterDogOwner from "./components/RegisterDogOwner";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import DogSitter from "./components/DogSitter";
import { ToastContainer } from "react-toastify";
import MyFooter from "./components/MyFooter";

function App() {
	return (
		<BrowserRouter>
			<Container fluid>
				<MyNavbar />
				<ToastContainer theme="colored" autoClose={1000} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/accedi" element={<Login />} />
					<Route path="/my-profile" element={<MyProfile />} />
					<Route path="/cerca-dogsitters" element={<DogSitter />} />
					<Route path="/crea-account-proprietario" element={<RegisterDogOwner />} />
					{/* <Route path="/diventa-dog-sitter" element={<RegisterDogSitter />} /> */}
				</Routes>
				<MyFooter />
			</Container>
		</BrowserRouter>
	);
}
export default App;
