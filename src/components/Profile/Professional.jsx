import { useState } from "react";
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Alert,
  Box,
  Avatar,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Loading from "../UI/Loading";

const Professional = () => {
  const error = "";
  const success = "";
  const specializations = [];
  const [profile, setProfile] = useState(null);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar
            src={profile?.user?.profile_picture}
            sx={{ width: 100, height: 100, mr: 2 }}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="profile-photo"
            type="file"
          />
          <label htmlFor="profile-photo">
            <IconButton component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <form>
          <Grid container spacing={3}>
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
                name="consultation_fee"
                value={profile?.consultation_fee || ""}
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
                  value={profile?.specializations?.map((s) => s.id) || []}
                  onChange={handleChange}
                  name="specializations"
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={
                            specializations.find((s) => s.id === value)?.name
                          }
                        />
                      ))}
                    </Box>
                  )}
                >
                  {specializations.map((spec) => (
                    <MenuItem key={spec.id} value={spec.id}>
                      {spec.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Professional;
