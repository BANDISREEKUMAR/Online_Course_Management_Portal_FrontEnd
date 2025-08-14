import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import axios from 'axios';

const Payments = () => {
  const [formData, setFormData] = useState({ name: '', email: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.amount) {
      setMessage({ type: 'error', text: 'Please fill all fields.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const res = await loadRazorpayScript();
    if (!res) {
      setMessage({ type: 'error', text: 'Razorpay SDK failed to load.' });
      setLoading(false);
      return;
    }

    try {
      const orderResponse = await axios.post(
        'http://localhost:8080/api/createOrder',
        formData
      );
      const order = orderResponse.data;

      const options = {
        key: 'My_Key',
        amount: order.amount * 100,
        currency: 'INR',
        name: 'Course Portal',
        description: 'Course Payment',
        order_id: order.razorpayOrderId,
        handler: async function (response) {
          try {
            await axios.post('http://localhost:8080/api/paymentCallback', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            setMessage({ type: 'success', text: 'Payment successful!' });
          } catch {
            setMessage({ type: 'error', text: 'Payment verification failed.' });
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email
        },
        theme: { color: '#1976d2' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setMessage({ type: 'error', text: 'Payment initiation failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, #f3f4f6, #e3f2fd)',
          borderRadius: 3
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <PaymentIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Make a Payment
          </Typography>
        </Box>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
            required
          />
          <TextField
            label="Amount (INR)"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            required
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            disabled={loading}
            startIcon={!loading && <PaymentIcon />}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay Now'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Payments;
