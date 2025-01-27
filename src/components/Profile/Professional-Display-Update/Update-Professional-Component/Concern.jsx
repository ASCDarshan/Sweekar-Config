/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { toast } from 'react-toastify';
import ajaxCall from '../../../../helpers/ajaxCall';

const Concern = ({ expertId }) => {
    const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
    const [loading, setLoading] = useState(true);
    const [allConcerns, setAllConcerns] = useState([]);
    const [selectedConcerns, setSelectedConcerns] = useState([]);

    const fetchData = async () => {
        try {
            const concernsResponse = await ajaxCall(
                'professionals/concerns/',
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

            if (concernsResponse?.status === 200) {
                setAllConcerns(concernsResponse?.data || []);
            }
            const userConcernResponse = await ajaxCall(
                `professionals/professionalconcern-user/?user=${userId}`,
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

            if (userConcernResponse?.status === 200) {
                const selectedIds = userConcernResponse?.data?.map(item => item.concern) || [];
                setSelectedConcerns(selectedIds);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Error loading concerns");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = async (concernId) => {
        setLoading(true);
        try {
            const response = await ajaxCall(
                `professionals/professionalconcern-create/`,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken}`,
                    },
                    method: "POST",
                    body: JSON.stringify({ concern: concernId, professional: expertId }),
                },
                8000
            );

            if ([200, 201].includes(response.status)) {
                toast.success("Concern updated successfully");
                await fetchData();
            } else {
                toast.error("Failed to update concern");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update concern");
        } finally {
            setLoading(false);
        }
    };

    const handleConcernChange = (event) => {
        const newSelectedIds = event.target.value;
        setSelectedConcerns(newSelectedIds);

        const addedIds = newSelectedIds.filter(id => !selectedConcerns.includes(id));

        if (addedIds.length > 0) {
            handleUpdate(addedIds[0]);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Specializations</InputLabel>
                        <Select
                            multiple
                            value={selectedConcerns}
                            label="Specializations"
                            onChange={handleConcernChange}
                            disabled={loading}
                        >
                            {allConcerns.map((concern) => (
                                <MenuItem key={concern.id} value={concern.id}>
                                    {concern.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Concern;