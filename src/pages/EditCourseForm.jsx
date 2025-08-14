import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import api from '../services/api';

const EditCourseForm = ({ courseId, onClose }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    instructor: '',
    category: '',
    difficulty: 'Beginner',
    duration: '',
    price: '',
    thumbnail: '',
    curriculum: '',
    requirements: ''
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await api.get(`/api/courses/${courseId}`);
        setCourseData({
          ...response.data,
          curriculum: response.data.curriculum?.join('\n') || '',
          requirements: response.data.requirements?.join('\n') || ''
        });
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const handleInputChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/courses/${courseId}`, {
        ...courseData,
        duration: parseInt(courseData.duration),
        price: parseFloat(courseData.price),
        curriculum: courseData.curriculum.split('\n').filter(item => item.trim()),
        requirements: courseData.requirements.split('\n').filter(item => item.trim())
      });
      onClose();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        background: 'linear-gradient(135deg, #f3f4f6, #e0f7fa)'
      }}
    >
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Edit Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Course Title"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Instructor"
              name="instructor"
              value={courseData.instructor}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              name="category"
              value={courseData.category}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                name="difficulty"
                value={courseData.difficulty}
                onChange={handleInputChange}
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Duration (hours)"
              name="duration"
              type="number"
              value={courseData.duration}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price ($)"
              name="price"
              type="number"
              value={courseData.price}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Thumbnail URL"
              name="thumbnail"
              value={courseData.thumbnail}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Curriculum (one item per line)"
              name="curriculum"
              value={courseData.curriculum}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Requirements (one item per line)"
              name="requirements"
              value={courseData.requirements}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
            <Button variant="outlined" onClick={onClose} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditCourseForm;
