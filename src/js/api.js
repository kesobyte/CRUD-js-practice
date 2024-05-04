import axios from 'axios';

// Assigning the base API URL to a variable
const BASE_URL = 'https://6633a04df7d50bbd9b4a1c49.mockapi.io/todos';

//Get All Todos
export const getTodos = async () => {
  //Using GET to fetch data
  let response = await axios.get(BASE_URL);
  return response.data;
};

//Add a Todo
export const addTodo = async todo => {
  //Using POST to add data
  let response = await axios.post(BASE_URL, todo);
  return response;
};

//Delete a Todo
export const deleteTodo = async id => {
  //Using DELETE to delete data
  return await axios.delete(`${BASE_URL}/${id}`);
};

//Update a Todo
export const updateTodo = async (id, status) => {
  return await axios.put(`${BASE_URL}/${id}`, {
    isDone: !status,
  });
};
