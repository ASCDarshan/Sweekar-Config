// import { Navigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import * as jwtDecode from 'jwt-decode';

// const AuthGuard = ({ children, userType }) => {
//   const [isAuthorized, setIsAuthorized] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const user = JSON.parse(localStorage.getItem('user') || '{}');

//     if (!token || !user) {
//       setIsAuthorized(false);
//       return;
//     }

//     try {
//       const decodedToken = jwtDecode.jwtDecode(token);
//       const isTokenValid = decodedToken.exp * 1000 > Date.now();
//       const hasCorrectUserType = user.user_type === userType;

//       setIsAuthorized(isTokenValid && hasCorrectUserType);
//     } catch (error) {
//       setIsAuthorized(false);
//       console.error(error);
//     }
//   }, [userType]);

//   if (isAuthorized === null) {
//     return null;
//   }

//   return isAuthorized ? children : <Navigate to="/login" />;
// };

// export default AuthGuard;