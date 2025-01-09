import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import ajaxCall from "../../helpers/ajaxCall";
import { toast } from "react-toastify";

const Professional = () => {
  const user = JSON.parse(localStorage.getItem("loginInfo")).user;
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [expert, setExpert] = useState({});

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profile_picture: file });
    }
  };

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken}`,
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data || {});
        setProfile(response?.data || {});
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`professionals/professional-user/?user=${user}`, setExpert);
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(profile).forEach((key) => {
      formData.append(key, profile[key]);
    });

    try {
      const response = await ajaxCall(
        `professionals/professional-update/${expert.id}/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken}`,
          },
          method: "PATCH",
          body: formData,
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Profile Updated Successfully.");
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      } else if ([401].includes(response.status)) {
        toast.error("Invalid Credentials.");
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar
            src={profile?.profile_picture ? URL.createObjectURL(profile?.profile_picture) : expert?.user?.profile_picture}
            sx={{ width: 100, height: 100, mr: 2 }}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="profile-photo"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="profile-photo">
            <IconButton component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={expert?.user?.username || ""}
            onChange={handleChange}
          />
        </Box>
        <form onSubmit={handleUpdate}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={profile?.user?.first_name || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={profile?.user?.last_name || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="License Number"
                name="license_number"
                value={profile?.license_number || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                type="number"
                name="years_of_experience"
                value={profile?.years_of_experience || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Biography"
                name="biography"
                value={profile?.biography || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Consultation Fee"
                type="number"
                name="hourly_rate"
                value={profile?.hourly_rate || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Languages Spoken"
                name="languages_spoken"
                value={profile?.languages_spoken || ""}
                onChange={handleChange}
                helperText="Separate languages with commas"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Specializations</InputLabel>
                <Select
                  multiple
                  value={profile?.concerns?.map((concern) => concern.id) || []}
                  onChange={(e) => {
                    const selectedIds = e.target.value;
                    const selectedConcerns = expert?.concerns?.filter((concern) =>
                      selectedIds.includes(concern.id)
                    );
                    setProfile({ ...profile, concerns: selectedConcerns });
                  }}
                  name="specializations"
                >
                  {expert?.concerns?.map((concern) => (
                    <MenuItem key={concern.id} value={concern.id}>
                      {concern.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Professional;
