import { useEffect, useState } from 'react'
import { Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from "yup";

const todoSchema = yup.object({
  id: yup.number(),
  title: yup.string().required("Title is required")
})

type TodoType = yup.InferType<typeof todoSchema>

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const formik = useFormik<TodoType>({
    initialValues: {
      id: 0,
      title: ""
    },
    validationSchema: todoSchema,
    onSubmit: ({ title }) => {
      const newTodo = { id: Date.now(), title };
      setTodos((prev) => [...prev, newTodo]);
      formik.resetForm();
    }
  });

  useEffect(() => {
    console.log("Todo Changingggggggggg", formik.values)
  }, [formik.values])

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 40 }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="outlined-basic"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          label="Todo Title"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!formik.errors.title && formik.touched.title}
          helperText={formik.touched.title && formik.errors.title}
        />
        <Button type='submit' variant="contained" color="primary" fullWidth>
          Add Todo
        </Button>
      </form>

      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default App
