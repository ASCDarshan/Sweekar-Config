import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Navbar from "./Components/common/Navbar"
import Footer from "./Components/common/Footer"
import LandingPage from "./Components/pages/LandingPage"
import ServicesPage from './Components/pages/ServicesPage';
import ExpertsPage from './Components/pages/ExpertsPage';
import CentresPage from './Components/pages/CentresPage';
import BlogPage from './Components/pages/BlogPage';
import ResourcesPage from './Components/pages/ResourcesPage';
import ContactPage from './Components/pages/ContactPage';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import ClientDashboard from './Components/dashboard/ClientDashboard';
import ProfessionalDashboard from './Components/dashboard/ProfessionalDashboard';
import ClientProfile from './Components/profile/ClientProfile';
import ProfessionalProfile from './Components/profile/ProfessionalProfile';
import ConsultationList from './Components/consultation/ConsultationList';
import BookConsultation from './Components/consultation/BookConsultation';
import ConsultationDetail from './Components/consultation/ConsultationDetail';


function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1, paddingBottom: '20px' }}>
              <Routes>
                <Route path="/login" element={
                  isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
                } />
                <Route path="/register" element={
                  isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
                } />
                <Route path="/" element={
                  <LandingPage />
                } />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/experts" element={<ExpertsPage />} />
                <Route path="/centres" element={<CentresPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route
                  path="/dashboard"
                  element={
                    isAuthenticated ? (
                      localStorage.getItem('user')?.includes('"user_type":"CLIENT"') ? (
                        <Navigate to="/client/dashboard" />
                      ) : (
                        <Navigate to="/professional/dashboard" />
                      )
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/client/dashboard"
                  element={
                    // <AuthGuard userType="CLIENT">
                    <ClientDashboard />
                    // </AuthGuard>
                  }
                />
                <Route
                  path="/client/profile"
                  element={
                    // <AuthGuard userType="CLIENT">
                    <ClientProfile />
                    // </AuthGuard>
                  }
                />

                <Route
                  path="/professional/dashboard"
                  element={
                    // <AuthGuard userType="PROFESSIONAL">
                    <ProfessionalDashboard />
                    // </AuthGuard>
                  }
                />
                <Route
                  path="/professional/profile"
                  element={
                    // <AuthGuard userType="PROFESSIONAL">
                    <ProfessionalProfile />
                    // </AuthGuard>
                  }
                />

                <Route
                  path="/consultations"
                  element={
                    // <AuthGuard userType="*">
                    <ConsultationList />
                    // </AuthGuard>
                  }
                />
                <Route
                  path="/consultation/:id"
                  element={
                    // <AuthGuard userType="*">
                    <ConsultationDetail />
                    // </AuthGuard>
                  }
                />
                <Route
                  path="/book-consultation"
                  element={
                    // <AuthGuard userType="CLIENT">
                    <BookConsultation />
                    // </AuthGuard>
                  }
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
}

export default App;