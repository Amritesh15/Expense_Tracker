import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Fab,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Expense {
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/expenses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        throw new Error('Failed to fetch expenses');
      }
    } catch (error) {
      toast.error('Failed to load expenses');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setExpenses(expenses.filter(expense => expense._id !== id));
        toast.success('Expense deleted successfully');
      } else {
        throw new Error('Failed to delete expense');
      }
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Total Expenses: ${totalExpenses.toFixed(2)}
          </Typography>
        </Paper>
        
        <Paper elevation={3} sx={{ p: 2 }}>
          <List>
            {expenses.map((expense) => (
              <ListItem key={expense._id}>
                <ListItemText
                  primary={`$${expense.amount.toFixed(2)} - ${expense.category}`}
                  secondary={`${expense.description} (${new Date(expense.date).toLocaleDateString()})`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(expense._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>

        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => navigate('/add-expense')}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
};

export default Dashboard; 