/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Email } from "@mui/icons-material";
import ajaxCall from "../../helpers/ajaxCall";
import { useState } from "react";

const ForgotPassword = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email_id: "",
    },

    validationSchema: Yup.object({
      email_id: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),

    onSubmit: (values) => {
      const changePasswordMail = {
        email_id: values.email_id,
      };
      fetchData("users/forgot-password/", changePasswordMail);
    },
  });

  const fetchData = async (url, data) => {
    setLoading(true);
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
          },
          method: "POST",
          body: JSON.stringify(data),
        },
        8000
      );
      if (response?.status === 200) {
        toast.success("Password reset link sent! Please check your email.");
        formik.resetForm();
        onClose();
        navigate("/login");
      } else if (response?.status === 400) {
        toast.error("This email is not registered, Try Signing in Instead.");
      } else {
        toast.error("Failed to send reset link. Please try again later.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
          Reset Password
        </Typography>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Typography color="text.secondary" paragraph>
            Enter your email address and we&apos;ll send you instructions to
            reset your password.
          </Typography>
          <TextField
            fullWidth
            name="email_id"
            label="Email Address"
            type="email"
            value={formik.values.email_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email_id && Boolean(formik.errors.email_id)}
            helperText={formik.touched.email_id && formik.errors.email_id}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose}>Cancel</Button>
          {loading ? (
            <Button disabled>
              <CircularProgress size={24} />
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Send
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ForgotPassword;
