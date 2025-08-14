import React, { useState } from "react";
import {
  School as SchoolIcon,
  Payment as PaymentIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Container,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCourseForm from "./AddCourseForm";
import EditCourseForm from "./EditCourseForm";

const AdminDashboard = () => {
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const navigate = useNavigate();

  const features = [
    {
      title: "Manage Courses",
      icon: <SchoolIcon fontSize="large" />,
      color: "#1976d2",
      onClick: () => navigate("/admin/courses"),
    },
    {
      title: "View Enrollments",
      icon: <MenuBookIcon fontSize="large" />,
      color: "#f57c00",
      onClick: () => navigate("/admin/enrollments"),
    },
    {
      title: "Payments",
      icon: <PaymentIcon fontSize="large" />,
      color: "#d32f2f",
      onClick: () => navigate("/admin/payments"),
    },
    {
      title: "Add Course",
      icon: <AddIcon fontSize="large" />,
      color: "#0288d1",
      onClick: () => setShowAddCourse(true),
    },
    {
      title: "Edit Course",
      icon: <EditIcon fontSize="large" />,
      color: "#c2185b",
      onClick: () => {
        setCourseId(1); 
        setShowEditCourse(true);
      },
    },
    {
      title: "Admin Profile",
      icon: <PersonIcon fontSize="large" />,
      color: "#512da8",
      onClick: () => navigate("/profile"),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff, #ffffff)",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            mb: 6,
            p: 3,
            borderRadius: 3,
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
            color: "white",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Admin Dashboard
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Manage courses, enrollments, payments, and more
          </Typography>
        </Box>

        {/* Content */}
        {!showAddCourse && !showEditCourse ? (
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "transform 0.25s, box-shadow 0.25s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardActionArea onClick={feature.onClick}>
                    <CardContent
                      sx={{
                        textAlign: "center",
                        py: 4,
                        color: "white",
                        background: feature.color,
                      }}
                    >
                      <Box sx={{ mb: 1 }}>{feature.icon}</Box>
                      <Typography variant="h6" fontWeight="bold">
                        {feature.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : showAddCourse ? (
          <AddCourseForm onClose={() => setShowAddCourse(false)} />
        ) : (
          <EditCourseForm
            courseId={courseId}
            onClose={() => setShowEditCourse(false)}
          />
        )}
      </Container>
    </Box>
  );
};

export default AdminDashboard;
