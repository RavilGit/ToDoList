let addtaskbtn = document.getElementById('add-task-button');
let textField = document.getElementById('input-task');
let taskList = document.getElementById('task-list');
let tasks = [];

//downloading tasks from localStorage
if (localStorage.getItem('task')){
   tasks = JSON.parse(localStorage.getItem('task'));
   displayTasks();
}

//Event listener for adding tasks
addtaskbtn.addEventListener('click', function (){
   if (!textField.value || !textField.value.match(/^[?!(),.а-яА-ЯёЁa-zA-Z0-9\s ]*$/)) {
       alert('do not try');
       textField.value = '';
       return;
   }

   let newTask = {
      task: textField.value,
      checked: false,
      important: false
   }

   tasks.push(newTask);
   displayTasks();
   textField.value = '';
   localStorage.setItem('task', JSON.stringify(tasks));
});

//main function that creates new task and adds it to array and Ulist on html
function displayTasks(){
   let li = '';
   if (tasks.length === 0) taskList.innerHTML = '';

   tasks.forEach((item, index) => {
     li += `
     <li class="task__item">
        <input type="checkbox" id="item__${index}" ${item.checked ? 'checked' : ''} required>
        <span id="item__${index}" class="task ${item.important ? ' important' : ''}  ${item.checked ? ' checked-task' : ''}">${item.task}</span>
        <button type="button" class="delete-btn" id='btn__${index}'>X</button>
     </li>
     `;
     taskList.innerHTML = li;
  });
}

// checkbox checker
taskList.addEventListener('change', function (event){
   let idInput = event.target.getAttribute('id');
   let span = taskList.querySelector('span[id=' + idInput + ']');

   tasks.forEach((item) => {
      if (item.task === span.innerHTML){
         item.checked = !item.checked;
         displayTasks();
         localStorage.setItem('task', JSON.stringify(tasks));
      }
   });
});

// importance checker
taskList.addEventListener('contextmenu', function (event){
   event.preventDefault();
   tasks.forEach(item => {
      if (item.task === event.target.innerHTML){
         item.important = !item.important;
         displayTasks();
         localStorage.setItem('task', JSON.stringify(tasks));
      }
   });
});

// delete button
taskList.addEventListener('click', function (event){
   let item = event.target.getAttribute('id');
   if (item.startsWith('btn')){
      let index = +item.replace(/[^0-9]/g,'');
      tasks.splice(index, 1);
      displayTasks();
      localStorage.setItem('task', JSON.stringify(tasks));
   }
});
