import { getTodos, addTodo, deleteTodo, updateTodo } from './api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio.js';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio.js';

//Target element
const addBtnEl = document.querySelector('.addBtn');
const myUL = document.getElementById('myUL');
const myInput = document.getElementById('myInput');
let currentId = 0;

//Call function fillTodoList() upon loading the page
window.addEventListener('DOMContentLoaded', fillTodoList);

//Add Close Button to each Todo in the list
function addCloseBtn(li) {
  let span = document.createElement('span'); //<span></span>
  let close = document.createTextNode('\u00D7'); //X
  span.className = 'close';
  span.appendChild(close);
  li.appendChild(span);
}

//////////////////////////////////////////////

//Fill the Todo list
function fillTodoList() {
  getTodos()
    .then(todos => {
      todos.forEach(({ text, isDone, id }) => createLi(text, isDone, id));
      return todos; //Pass the todos array to the next then block
    })
    .then(todos => {
      if (todos.length > 0) {
        currentId = parseInt(todos[todos.length - 1].id) + 1;
        console.log(currentId);
      }
    });
}

//Creation of list function
function createLi(text, isDone, id) {
  let li = document.createElement('li');
  li.innerText = text;
  li.dataset.id = id;
  myUL.appendChild(li);

  if (isDone) li.className = 'checked';
  addCloseBtn(li);
}

//////////////////////////////////////////////

//Add Todo
addBtnEl.addEventListener('click', async () => {
  let todo = myInput.value.trim();

  //Validation
  if (todo === '') {
    Notify.failure('Please input a todo');
    return;
  }

  let todoObj = {
    text: todo,
  };

  try {
    let todoRes = await addTodo(todoObj);
    if (todoRes.status === 201) {
      createLi(todo, false, currentId);
      Notify.success('Todo was added successfully');
    }
  } catch (e) {
    Notify.failure('Something went wrong. Please try again');
  }
});

//////////////////////////////////////////////

//Delete Todo
myUL.addEventListener('click', e => {
  if (e.target.tagName === 'SPAN') {
    Confirm.show(
      'Please confirm',
      'Are you sure you want to delete this todo?',
      'Yes',
      'Cancel',
      () => {
        Notify.info('Todo has been deleted');
        deleteTodo(e.target.parentElement.getAttribute('data-id'));
        e.target.parentNode.remove();
      }
    );
  }
});

//////////////////////////////////////////////

//Update Todo
myUL.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    updateTodo(e.target.dataset.id, e.target.classList.contains('checked'));
    e.target.classList.toggle('checked');
    Notify.success('Todo was updated');
  }
});
