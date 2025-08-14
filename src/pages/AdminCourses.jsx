import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  CardMedia,
  Button,
  Chip,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import api from '../services/api';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    category: '',
    difficulty: 'Beginner',
    duration: '',
    price: '',
    thumbnail: '',
    curriculum: '',
    requirements: '',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/api/admin/courses');
      setCourses(response.data);
      setError('');
    } catch {
      setError('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        category: course.category,
        difficulty: course.difficulty,
        duration: course.duration.toString(),
        price: course.price.toString(),
        thumbnail: course.thumbnail || '',
        curriculum: course.curriculum?.join('\n') || '',
        requirements: course.requirements?.join('\n') || '',
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: '',
        description: '',
        instructor: '',
        category: '',
        difficulty: 'Beginner',
        duration: '',
        price: '',
        thumbnail: '',
        curriculum: '',
        requirements: '',
      });
    }
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingCourse(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      ...formData,
      duration: parseInt(formData.duration),
      price: parseFloat(formData.price),
      curriculum: formData.curriculum.split('\n').filter(Boolean),
      requirements: formData.requirements.split('\n').filter(Boolean),
    };

    try {
      if (editingCourse) {
        await api.put(`/api/admin/courses/${editingCourse.id}`, courseData);
      } else {
        await api.post('/api/admin/courses', courseData);
      }
      handleCloseDialog();
      fetchCourses();
    } catch (err) {
      console.error('Error saving course:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/api/admin/courses/${id}`);
        fetchCourses();
      } catch (err) {
        console.error('Error deleting course:', err);
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
            📚 Course Management
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
            Add Course
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

        <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Difficulty</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow hover key={course.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 50, height: 30, mr: 2, borderRadius: 1 }}
                        image={course.thumbnail || 'https://via.placeholder.com/50x30'}
                        alt={course.title}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {course.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {course.description.substring(0, 50)}...
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <Chip label={course.category} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip label={course.difficulty} size="small" color={getDifficultyColor(course.difficulty)} />
                  </TableCell>
                  <TableCell>{course.duration} hrs</TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell>
                    <Chip
                      label={course.active ? 'Active' : 'Inactive'}
                      size="small"
                      color={course.active ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => handleOpenDialog(course)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(course.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Dialog */}
        <Dialog open={showDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 'bold' }}>
            {editingCourse ? 'Edit Course' : 'Add New Course'}
          </DialogTitle>
          <DialogContent dividers>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Course Title" value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Description" multiline rows={3} value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Instructor" value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Category" value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Difficulty</InputLabel>
                    <Select value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}>
                      <MenuItem value="Beginner">Beginner</MenuItem>
                      <MenuItem value="Intermediate">Intermediate</MenuItem>
                      <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Duration (hrs)" type="number" value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Price ($)" type="number" value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Thumbnail URL" value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Curriculum (one per line)" multiline rows={4} value={formData.curriculum}
                    onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Requirements (one per line)" multiline rows={3} value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingCourse ? 'Update Course' : 'Create Course'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminCourses;
