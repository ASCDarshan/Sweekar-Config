import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
// import api from '../../services/axios';

const ClientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    // try {
    //   const response = await api.get('/clients/profile/');
    //   setProfile(response.data);
    // } catch (error) {
    //   setError('Error fetching profile');
    //   console.error('Error:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const response = await api.patch('/clients/profile/', profile);
    //   setSuccess('Profile updated successfully');
    //   setProfile(response.data);
    // } catch (error) {
    //   setError('Error updating profile');
    //   console.error('Error:', error);
    // }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={profile?.user?.profile_picture}
            sx={{ width: 100, height: 100, mr: 2 }}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-photo"
            type="file"
          />
          <label htmlFor="profile-photo">
            <IconButton component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={profile?.user?.first_name || ''}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={profile?.user?.last_name || ''}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                name="date_of_birth"
                value={profile?.date_of_birth || ''}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Blood Group"
                name="blood_group"
                value={profile?.blood_group || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact Name"
                name="emergency_contact_name"
                value={profile?.emergency_contact_name || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact Phone"
                name="emergency_contact_phone"
                value={profile?.emergency_contact_phone || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Medical History"
                name="medical_history"
                value={profile?.medical_history || ''}
                onChange={handleChange}
              />
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

export default ClientProfile;