import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import api from '../services/api';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalInstructors: 0,
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, statsResponse] = await Promise.all([
          api.get('/api/courses?featured=true&limit=6'),
          api.get('/api/stats'),
        ]);
        setFeaturedCourses(coursesResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                Education Without Barriers
              </Typography>
              <Typography
                variant="h5"
                sx={{ 
                  mb: 4, 
                  opacity: 0.9, 
                  fontWeight: 300,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)' 
                }}
              >
                Boost your skills and open new opportunities with thousands of courses from top universities and leading companies.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={RouterLink}
                  to="/courses"
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(to right, #f5f7fa 0%, #c3cfe2 100%)',
                    color: '#6e45e2',
                    '&:hover': {
                      background: 'linear-gradient(to right, #e6e9f0 0%, #b5bfda 100%)',
                    },
                    boxShadow: 3,
                    fontWeight: 'bold',
                  }}
                >
                  Explore Courses
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="outlined"
                  size="large"
                  sx={{
                    border: '2px solid white',
                    color: 'white',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.2)',
                      border: '2px solid white',
                    },
                    boxShadow: 2,
                    fontWeight: 'bold',
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '400px',
                }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(145deg, rgba(110,69,226,0.3) 0%, rgba(136,211,206,0.3) 100%)',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.1)'
                  }}
                >
                  <SchoolIcon
                    sx={{
                      fontSize: '200px',
                      opacity: 0.7,
                      color: 'white',
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ 
        py: 6,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        borderRadius: 2,
        my: 4,
        boxShadow: 2
      }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            { 
              icon: <SchoolIcon sx={{ fontSize: 40, color: 'white' }} />, 
              value: `${stats.totalCourses}+`, 
              label: 'Courses Available',
              gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            },
            { 
              icon: <PeopleIcon sx={{ fontSize: 40, color: 'white' }} />, 
              value: `${stats.totalStudents}+`, 
              label: 'Students Enrolled',
              gradient: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)'
            },
            { 
              icon: <TimeIcon sx={{ fontSize: 40, color: 'white' }} />, 
              value: '24/7', 
              label: 'Learning Access',
              gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
            }
          ].map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  background: stat.gradient,
                  color: 'white',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Box sx={{
                  display: 'inline-flex',
                  p: 1,
                  mb: 2,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)'
                }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" component="div" sx={{ 
                  fontWeight: 'bold',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" sx={{
                  mt: 1,
                  opacity: 0.9
                }}>
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Courses Section */}
      <Box sx={{
        py: 6,
        background: 'linear-gradient(135deg, #f9f9f9 0%, #eef2f5 100%)'
      }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ 
              mb: 6, 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Featured Courses
          </Typography>
          <Grid container spacing={4}>
            {featuredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                    }
                  }}
                >
                 <CardMedia
                    component="img"
                    height="200"
                    image={course.thumbnail || `${process.env.PUBLIC_URL}/static/java.webp`}
                    alt={course.title}
                    sx={{
                    transition: 'transform 0.3s',
                    '&:hover': {
                    transform: 'scale(1.05)'
                    }
                    }}
                  />

                  <CardContent sx={{ 
                    flexGrow: 1,
                    background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Chip
                        label={course.category}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
                          color: '#667eea',
                          fontWeight: 'bold'
                        }}
                      />
                      <Chip
                        label={course.difficulty}
                        size="small"
                        sx={{
                          background: 
                            course.difficulty === 'Beginner' ? 
                            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' :
                            course.difficulty === 'Intermediate' ? 
                            'linear-gradient(135deg, #ff9a44 0%, #ffd600 100%)' : 
                            'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom sx={{
                      fontWeight: 'bold'
                    }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {course.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Instructor: {course.instructor}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {course.duration} hours
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{
                    background: 'linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)',
                    borderTop: '1px solid rgba(0,0,0,0.05)'
                  }}>
                    <Button
                      component={RouterLink}
                      to={`/course/${course.id}`}
                      size="small"
                      startIcon={<PlayIcon />}
                      fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #5b72d9 0%, #6b449c 100%)',
                        },
                        fontWeight: 'bold'
                      }}
                    >
                      View Course
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={RouterLink}
              to="/courses"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5d3dbb 0%, #6fc1b6 100%)',
                },
                boxShadow: 4,
                px: 4,
                py: 1.5,
                fontWeight: 'bold'
              }}
            >
              View All Courses
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)'
          }}
        />
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ 
              mb: 3, 
              fontWeight: 'bold',
              position: 'relative',
              zIndex: 1
            }}
          >
            It’s Time to Learn Something New
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ 
              mb: 4,
              opacity: 0.9,
              position: 'relative',
              zIndex: 1
            }}
          >
            Become part of a global learning community and begin your journey now.
          </Typography>
          <Box sx={{ 
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(to right, #f5f7fa 0%, #c3cfe2 100%)',
                color: '#667eea',
                '&:hover': {
                  background: 'linear-gradient(to right, #e6e9f0 0%, #b5bfda 100%)',
                },
                boxShadow: 3,
                mr: 2,
                mb: { xs: 2, sm: 0 },
                fontWeight: 'bold'
              }}
            >
              Get Started
            </Button>
            <Button
              component={RouterLink}
              to="/courses"
              variant="outlined"
              size="large"
              sx={{
                border: '2px solid white',
                color: 'white',
                '&:hover': {
                  background: 'rgba(255,255,255,0.2)',
                  border: '2px solid white',
                },
                boxShadow: 3,
                fontWeight: 'bold'
              }}
            >
              Browse Courses
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
