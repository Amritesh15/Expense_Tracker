import { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Paper, List, ListItem, 
  ListItemText, ListItemSecondaryAction, IconButton, Divider, 
  useTheme, Button 
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Expense {
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => { fetchExpenses(); }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/login'); return; }

      const response = await fetch(`${API_BASE_URL}/api/expenses/getAllExpenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else throw new Error('Failed to fetch expenses');
    } catch {
      toast.error('Failed to load expenses');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setExpenses(expenses.filter(e => e._id !== id));
        toast.success('Expense deleted successfully');
      } else throw new Error('Failed to delete expense');
    } catch {
      toast.error('Failed to delete expense');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4, minHeight: '80vh' }}>
        
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ color: theme.palette.primary.main }}>
            Expense Dashboard
          </Typography>

          {/* ✅ Logout Button in red */}
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Logout
          </Button>
        </Box>

        {/* Total Expenses */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: theme.palette.primary.main, color: 'white' }}>
          <Typography variant="h5" gutterBottom>Total Expenses</Typography>
          <Typography variant="h3">${totalExpenses.toFixed(2)}</Typography>

          {/* Add Expense Button under Total Expenses */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/add-expense')}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Add Expense
            </Button>
          </Box>
        </Paper>

        {/* Recent Expenses */}
        <Paper elevation={3} sx={{ p: 2, mb: 8 }}>
          <Typography variant="h6" gutterBottom sx={{ p: 2 }}>Recent Expenses</Typography>
          <Divider />
          <List>
            {expenses.length === 0 ? (
              <ListItem>
                <ListItemText 
                  primary="No expenses yet"
                  secondary="Click the Add Expense button to add your first expense"
                />
              </ListItem>
            ) : (
              expenses.map(expense => (
                <ListItem key={expense._id}>
                  <ListItemText
                    primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      ${expense.amount.toFixed(2)} - {expense.category}
                    </Typography>}
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          {expense.description}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {new Date(expense.date).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(expense._id)}
                      sx={{ color: theme.palette.error.main }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </Paper>

      </Box>
    </Container>
  );
};

export default Dashboard;
