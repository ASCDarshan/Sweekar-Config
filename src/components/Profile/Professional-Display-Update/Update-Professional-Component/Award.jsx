import { useState } from 'react';
import {
    Box,
    Grid,
    TextField,
    Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import ajaxCall from '../../../../helpers/ajaxCall';

const Award = ({ expertId }) => {
    const [formData, setFormData] = useState({
        professional: expertId,
        title: "",
        issuing_organization: "",
        date_received: "",
        description: "",

    });
    const [isLoading, setisLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setisLoading(true);
        event.preventDefault();

        try {
            const response = await ajaxCall(
                "professionals/award-create/",
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken}`,
                    },
                    method: "POST",
                    body: JSON.stringify(formData),
                },
                8000
            );
            if ([200, 201].includes(response.status)) {
                toast.success("Message Sent Successfully.");
                setisLoading(false);
                setFormData({ name: "", email: "", message: "", phone: "" });
            } else if ([400, 404].includes(response.status)) {
                toast.error("Some Problem Occurred. Please try again.");
                setisLoading(false);
            }
            else if ([401].includes(response.status)) {
                toast.error("Invalid Credentials.");
                setisLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Box sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Issuing organization"
                            type="text"
                            name="issuing_organization"
                            value={formData.issuing_organization}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            rows={4}
                            type="date"
                            label="Date received"
                            name="date_received"
                            value={formData.date_received}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Description"
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                            sx={{ mt: 2 }}
                        >
                            {isLoading ? "Adding..." : "Add Award"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Award;