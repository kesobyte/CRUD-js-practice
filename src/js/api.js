import axios from 'axios';

// Assigning the base API URL to a variable
const BASE_URL = 'https://6633a04df7d50bbd9b4a1c49.mockapi.io/todos';

//Get All Todos
export const getTodos = async () => {
  try {
    //Using GET to fetch data
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (e) {
    throw new Error('Failed to fetch all todos');
  }
};

//Add a Todo
export const addTodo = async todo => {
  try {
    //Using POST to add data
    const response = await axios.post(BASE_URL, todo);
    return response;
  } catch (e) {
    throw new Error('Failed to add todo');
  }
};

//Delete a Todo
export const deleteTodo = async id => {
  try {
    //Using DELETE to delete data
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (e) {
    throw new Error('Failed to delete todo');
  }
};

//Update a Todo
export const updateTodo = async (id, status) => {
  try {
    //Using PUT to update data
    const response = await axios.put(`${BASE_URL}/${id}`, {
      isDone: !status,
    });
    return response.data;
  } catch (e) {
    throw new Error('Failed to update todo');
  }
};
