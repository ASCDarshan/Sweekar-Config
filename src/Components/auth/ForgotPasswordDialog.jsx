// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   InputAdornment,
// } from '@mui/material';
// import { Email } from '@mui/icons-material';
// import { useState } from 'react';
// import api from '../../services/axios';

// const ForgotPasswordDialog = ({ open, onClose }) => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       await api.post('/users/reset-password/', { email });
//       setSuccess('Password reset instructions have been sent to your email.');
//       setTimeout(() => {
//         onClose();
//         setEmail('');
//         setSuccess('');
//       }, 3000);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to send reset email');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         sx: { borderRadius: 2 }
//       }}
//     >
//       <DialogTitle>
//         <Typography variant="h5" fontWeight="bold">
//           Reset Password
//         </Typography>
//       </DialogTitle>
//       <form onSubmit={handleSubmit}>
//         <DialogContent>
//           <Typography color="text.secondary" paragraph>
//             Enter your email address and we&apos;ll send you instructions to reset your password.
//           </Typography>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           {success && (
//             <Alert severity="success" sx={{ mb: 2 }}>
//               {success}
//             </Alert>
//           )}

//           <TextField
//             fullWidth
//             label="Email Address"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Email color="primary" />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 3 }}>
//           <Button
//             onClick={onClose}
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             variant="contained"
//             disabled={loading}
//           >
//             Send Instructions
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// };

// export default ForgotPasswordDialog;