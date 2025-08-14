import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from "@mui/material";
import api from "../services/api";

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get("/api/admin/enrollments");
        setEnrollments(res.data);
        setErr("");
      } catch (e) {
        console.error(e);
        setErr("Failed to load enrollments");
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        sx={{
          background: "linear-gradient(135deg, #f0f4ff, #ffffff)",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (err)
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{err}</Alert>
      </Container>
    );

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 6,
        pb: 6,
        background: "linear-gradient(135deg, #f9fbff 0%, #ffffff 100%)",
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      }}
    >
      <Box
        sx={{
          mb: 5,
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Enrollments Overview
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Manage and review all course enrollments in the system
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {enrollments.map((en) => (
          <Grid item xs={12} md={6} key={en.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Enrollment #{en.id}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2" gutterBottom>
                  <strong>Course ID:</strong> {en.courseId || "—"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>User ID:</strong> {en.userId || "—"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Amount:</strong> ${en.amount}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Payment ID:</strong> {en.paymentId}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  <strong>Status:</strong>{" "}
                  <Chip
                    label={en.status}
                    color={
                      en.status.toLowerCase() === "completed"
                        ? "success"
                        : en.status.toLowerCase() === "pending"
                        ? "warning"
                        : "default"
                    }
                    size="small"
                  />
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(en.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminEnrollments;
