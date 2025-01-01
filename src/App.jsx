import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Landing from "./pages/Landing/Landing";
import Services from "./pages/Services/Services";
import Experts from "./pages/Experts/Experts";
import Centres from "./pages/Centres/Centres";
import Blog from "./pages/Blog/Blog";
import Resources from "./pages/Resources/Resources";
import Contact from "./pages/Contact/Contact";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import ClientDashboard from "./components/Dashboard/Client";
import ProfessionalDashboard from "./components/Dashboard/Professional";
import ClientProfile from "./components/Profile/Client";
import ProfessionalProfile from "./components/Profile/Professional";
import ConsultationList from "./components/Consultation/ConsultationList";
import BookConsultation from "./components/Consultation/BookConsultation";
import ConsultationDetail from "./components/Consultation/ConsultationDetail";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar />
            <div style={{ flex: 1, paddingBottom: "20px" }}>
              <Routes>
                <Route
                  path="/login"
                  element={
                    isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
                  }
                />
                <Route
                  path="/register"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/dashboard" />
                    ) : (
                      <Register />
                    )
                  }
                />
                <Route path="/" element={<Landing />} />
                <Route path="/services" element={<Services />} />
                <Route path="/experts" element={<Experts />} />
                <Route path="/centres" element={<Centres />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/contact" element={<Contact />} />

                <Route
                  path="/dashboard"
                  element={
                    isAuthenticated ? (
                      localStorage
                        .getItem("user")
                        ?.includes('"user_type":"CLIENT"') ? (
                        <Navigate to="/client/dashboard" />
                      ) : (
                        <Navigate to="/professional/dashboard" />
                      )
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route path="/client/dashboard" element={<ClientDashboard />} />
                <Route path="/client/profile" element={<ClientProfile />} />

                <Route
                  path="/professional/dashboard"
                  element={<ProfessionalDashboard />}
                />
                <Route
                  path="/professional/profile"
                  element={<ProfessionalProfile />}
                />

                <Route path="/consultations" element={<ConsultationList />} />
                <Route
                  path="/consultation/:id"
                  element={<ConsultationDetail />}
                />
                <Route
                  path="/book-consultation"
                  element={<BookConsultation />}
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
