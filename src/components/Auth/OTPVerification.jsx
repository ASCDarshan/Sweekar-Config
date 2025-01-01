import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  Box,
  TextField,
} from "@mui/material";
import api from "../../services/axios";

const OTPVerification = ({ open, onClose, phone, onVerificationComplete }) => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (open && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0) {
      setCanResend(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [open, countdown]);

  const handleResendOTP = async () => {
    try {
      await api.post("/users/send-otp/", { phone });
      setCountdown(30);
      setCanResend(false);
      setError("");
    } catch (err) {
      setError("Failed to resend OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await api.post("/users/verify-otp/", {
        phone,
        otp,
      });
      onVerificationComplete(response.data);
    } catch (err) {
      setError("Invalid OTP");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          Enter OTP
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color="text.secondary" paragraph>
          Please enter the OTP sent to {phone}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {countdown > 0 ? (
              `Resend OTP in ${countdown}s`
            ) : (
              <Button onClick={handleResendOTP} disabled={!canResend}>
                Resend OTP
              </Button>
            )}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleVerifyOTP}
          disabled={otp.length !== 6}
        >
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OTPVerification;
