/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import MobileBottomNav from "./components/Navbar/MobileBottomNav";
import Footer from "./components/Footer/Footer";

import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/Blog/BlogDetail";
import Contact from "./pages/Contact/Contact";
import Landing from "./pages/Landing/Landing";
import Experts from "./pages/Experts/Experts";
import ExpertsDetails from "./pages/Experts/ExpertsDetails";
import Services from "./pages/Services/Services";
import Resources from "./pages/Resources/Resources";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import Client from "./components/Dashboard/ClientDashboard/Client";
import ClientProfileDisplay from "./components/Profile/Client-Display-Update/ClientProfileDisplay";

import Professional from "./components/Dashboard/ProfessionalDashboard/Professional";
import ProfessionalProfileDisplay from "./components/Profile/Professional-Display-Update/ProfessionalProfileDisplay";
import ConsultationList from "./components/Dashboard/ProfessionalDashboard/MyConsultation/ConsultationList";
import ConsultationDetail from "./components/Dashboard/ProfessionalDashboard/MyConsultation/ConsultationDetail";
import ScrollToTop from "./components/UI/ScrollToTop";
import ResponsiveClient from "./components/Dashboard/ClientDashboard/ResponsiveClient";

const Layout = ({ children }) => {
  const location = useLocation();

  const noFooterPaths = [
    "/blog",
    "/Client/Dashboard",
    "/Client/Profile",
    "/Professional/Dashboard",
    "/Professional/Profile",
    "/consultations",
    "/consultation",
    "/book-consultation",
    "/login",
    "/register",
  ];

  const shouldHideFooter =
    noFooterPaths.includes(location.pathname) ||
    location.pathname.startsWith("/consultation/") ||
    location.pathname.startsWith("/experts");

  return (
    <>
      <ScrollToTop />
      <Navbar />
      {children}
      <MobileBottomNav />
      {!shouldHideFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="top-center" autoClose={5000} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/services" element={<Services />} />
              {/* <Route path="/experts" element={<Experts />} /> */}
              <Route path="/experts/:id/" element={<ExpertsDetails />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blogs/:blogId" element={<BlogDetail />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/Client/Dashboard" element={<ResponsiveClient />} />
              <Route
                path="/Client/Profile"
                element={<ClientProfileDisplay />}
              />

              <Route
                path="/Professional/Dashboard"
                element={<Professional />}
              />
              <Route
                path="/Professional/Profile"
                element={<ProfessionalProfileDisplay />}
              />
              <Route path="/consultations" element={<ConsultationList />} />
              <Route
                path="/consultation/:id"
                element={<ConsultationDetail />}
              />

              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
          </Layout>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
