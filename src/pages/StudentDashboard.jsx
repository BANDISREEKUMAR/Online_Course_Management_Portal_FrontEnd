import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Box,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  AccessTime as TimeIcon,
  School as SchoolIcon,
  TrendingUp as TrendingIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    averageProgress: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [enrollmentsResponse, statsResponse] = await Promise.all([
        api.get('/api/enrollments/my-courses'),
        api.get('/api/students/stats'),
      ]);
      setEnrolledCourses(enrollmentsResponse.data);
      setStats(statsResponse.data);
      setError('');
    } catch (error) {
      setError('Failed to load dashboard data.');
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'warning';
    return 'error';
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
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #3f51b5, #2196f3)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Continue your learning journey 🚀
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {[
          { icon: <SchoolIcon sx={{ fontSize: 40 }} />, label: 'Enrolled Courses', value: stats.totalCourses, color: '#3f51b5' },
          { icon: <TrophyIcon sx={{ fontSize: 40 }} />, label: 'Completed Courses', value: stats.completedCourses, color: '#4caf50' },
          { icon: <TimeIcon sx={{ fontSize: 40 }} />, label: 'Hours Learned', value: stats.totalHours, color: '#ff9800' },
          { icon: <TrendingIcon sx={{ fontSize: 40 }} />, label: 'Average Progress', value: `${stats.averageProgress}%`, color: '#2196f3' },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                textAlign: 'center',
                py: 3,
                borderRadius: 4,
                background: `linear-gradient(145deg, ${stat.color}20, #ffffff)`,
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-6px)' },
              }}
            >
              <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* My Courses */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        My Courses
      </Typography>

      {enrolledCourses.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 8, borderRadius: 4 }}>
          <SchoolIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No courses enrolled yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start your learning journey by exploring our course catalog
          </Typography>
          <Button
            component={RouterLink}
            to="/courses"
            variant="contained"
            size="large"
            startIcon={<PlayIcon />}
          >
            Browse Courses
          </Button>
        </Card>
      ) : (
        <Grid container spacing={4}>
          {enrolledCourses.map((enrollment) => (
            <Grid item xs={12} md={6} lg={4} key={enrollment.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={enrollment.course.thumbnail || 'https://via.placeholder.com/300x200'}
                  alt={enrollment.course.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip label={enrollment.course.category} size="small" color="primary" variant="outlined" />
                    <Chip
                      label={enrollment.course.difficulty}
                      size="small"
                      color={
                        enrollment.course.difficulty === 'Beginner'
                          ? 'success'
                          : enrollment.course.difficulty === 'Intermediate'
                          ? 'warning'
                          : 'error'
                      }
                    />
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {enrollment.course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    by {enrollment.course.instructor}
                  </Typography>

                  {/* Progress */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Progress
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {enrollment.progress || 0}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={enrollment.progress || 0}
                      color={getProgressColor(enrollment.progress || 0)}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  {/* Duration */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {enrollment.course.duration} hours
                    </Typography>
                  </Box>

                  {/* Status */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </Typography>
                    <Chip
                      label={enrollment.status}
                      size="small"
                      color={enrollment.status === 'COMPLETED' ? 'success' : 'primary'}
                    />
                  </Box>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    component={RouterLink}
                    to={`/course/${enrollment.course.id}`}
                    variant="contained"
                    fullWidth
                    startIcon={<PlayIcon />}
                  >
                    Continue Learning
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Recent Activity */}
      {enrolledCourses.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            Recent Activity
          </Typography>
          <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <List>
                {enrolledCourses.slice(0, 5).map((enrollment, index) => (
                  <ListItem key={index} divider={index < enrolledCourses.length - 1}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${enrollment.course.title} - ${enrollment.progress || 0}% completed`}
                      secondary={`Last accessed: ${new Date(
                        enrollment.lastAccessedAt || enrollment.enrolledAt
                      ).toLocaleDateString()}`}
                    />
                    <Chip
                      label={enrollment.status}
                      size="small"
                      color={enrollment.status === 'COMPLETED' ? 'success' : 'primary'}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default StudentDashboard;
