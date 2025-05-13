import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('Todo App', () => {
  beforeEach(() => {
    render(<App />)
  })
  test('renders form and initial state', () => {
    expect(screen.getByLabelText(/todo title/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  test('shows validation error when submitting empty title', async () => {
    fireEvent.click(screen.getByRole('button', { name: /add todo/i }));
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
  });

  test('adds a todo item and displays it in the list', async () => {
    const input = screen.getByLabelText(/todo title/i);
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByRole('button', { name: /add todo/i }));
    await waitFor(() => {
      expect(screen.getByText('New Todo')).toBeInTheDocument();
    });
  });
});
