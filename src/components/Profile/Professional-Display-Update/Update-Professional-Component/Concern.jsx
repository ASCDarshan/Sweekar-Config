/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Chip } from "@mui/material";
import { toast } from "react-toastify";
import ajaxCall from "../../../../helpers/ajaxCall";

const Concern = ({ expertId }) => {
    const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
    const [loading, setLoading] = useState(true);
    const [allConcerns, setAllConcerns] = useState([]);
    const [selectedConcerns, setSelectedConcerns] = useState([]);

    const fetchData = async () => {
        try {
            const concernsResponse = await ajaxCall(
                "professionals/concerns/",
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken
                            }`,
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
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken
                            }`,
                    },
                    method: "GET",
                },
                8000
            );

            if (userConcernResponse?.status === 200) {
                const selectedIds =
                    userConcernResponse?.data?.map((item) => item.concern) || [];
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

    const handleChipClick = async (concernId) => {
        if (selectedConcerns.includes(concernId)) {
            return;
        }

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
                toast.success("Specialization added successfully");
                await fetchData();
            } else {
                toast.error("Failed to add specialization");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to add specialization");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Grid container spacing={1}>
                {allConcerns.map((concern) => (
                    <Grid item key={concern.id}>
                        <Chip
                            label={concern.name}
                            onClick={() => handleChipClick(concern.id)}
                            color={selectedConcerns.includes(concern.id) ? "primary" : "default"}
                            variant={selectedConcerns.includes(concern.id) ? "filled" : "outlined"}
                            disabled={loading}
                            sx={{
                                '&:hover': {
                                    backgroundColor: selectedConcerns.includes(concern.id)
                                        ? 'primary.main'
                                        : 'action.hover'
                                }
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Concern;