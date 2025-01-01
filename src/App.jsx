import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import Landing from "./pages/Landing/Landing";
import Experts from "./pages/Experts/Experts";
import Centres from "./pages/Centres/Centres";
import Services from "./pages/Services/Services";
import Resources from "./pages/Resources/Resources";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import Client from "./components/Dashboard/Client";
import ClientProfile from "./components/Profile/Client";
import Professional from "./components/Dashboard/Professional";
import ProfessionalProfile from "./components/Profile/Professional";
import ConsultationList from "./components/Consultation/ConsultationList";
import BookConsultation from "./components/Consultation/BookConsultation";
import ConsultationDetail from "./components/Consultation/ConsultationDetail";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/centres" element={<Centres />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />
            <Route path="/resources" element={<Resources />} />

            <Route path="/Client/Dashboard" element={<Client />} />
            <Route path="/Client/Profile" element={<ClientProfile />} />

            <Route path="/Professional/Dashboard" element={<Professional />} />
            <Route
              path="/Professional/Profile"
              element={<ProfessionalProfile />}
            />

            <Route path="/consultations" element={<ConsultationList />} />
            <Route path="/consultation/:id" element={<ConsultationDetail />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
