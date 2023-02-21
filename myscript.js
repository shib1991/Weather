const form = document.querySelector('#form');
const formL = document.querySelector('#Low');
const taskInput = document.querySelector('#task_input');
const taskInputL = document.querySelector('#tasks_inputL');
const tasksListH = document.querySelector('#taskslistH');
const tasksListL = document.querySelector('#taskslistL');

const ActiveTask = document.querySelector('#ActiveTask')
//Добавление задачи
form.addEventListener('submit', addTaskH);
formL.addEventListener('submit', addTaskL);
//Удаление задачи
tasksListH.addEventListener('click', deleteTask);
tasksListL.addEventListener('click', deleteTask);
//Отмечаем завершенные задачи
tasksListH.addEventListener('click', doneTask);
tasksListL.addEventListener('click', doneTask);

//HighTasks
function addTaskH(event) {
    event.preventDefault(); //Отменяем отправку формы.
    //Достаем текст задачи из поля ввода
    const taskText = taskInput.value
    //Формируем разметку для новой задачи
    const taskHTML = `<div class="ActiveTask">
    <div class="task_status">
        <label class="radio-input">
            <input type="checkbox" class="input_radio">
            <div class="radio_out">
                <div class="radio_in"></div>
            </div>
            
        </label>
    </div>
    <div class="task_description">
    <span  class="Task_label"> ${taskText}</span>
    </div>
    <input type="image" name="delete_task" id="delete_task" src="./src/icon2.png" class="TaskDelIcon">
</div>`


    //Добавляем разметку на страницу

    tasksListH.insertAdjacentHTML('beforeend', taskHTML);
    //очистка поля ввода

    taskInput.value = "";

}
//LowTasks
function addTaskL(eventL) {
    eventL.preventDefault(); //Отменяем отправку формы.
    //Достаем текст задачи из поля ввода
    const taskTextL = taskInputL.value
    //Формируем разметку для новой задачи
    const taskHTMLL = `<div class="ActiveTask">
    <div class="task_status">
        <label class="radio-input">
            <input type="checkbox" value="false" class="input_radio">
            <div class="radio_out">
                <div class="radio_in"></div>
            </div>
            
        </label>
    </div>
    <div class="task_description">
        <span> ${taskTextL}</span>
    </div>
    <input type="image" name="delete_task" id="delete_task" src="./src/icon2.png" class="TaskDelIcon">
</div>
</div>`


    //Добавляем разметку на страницу

    tasksListL.insertAdjacentHTML('beforeend', taskHTMLL);
    //очистка поля ввода

    taskInputL.value = "";
}


function deleteTask(event) {
    if (event.target.classList.contains('TaskDelIcon')) {
        const parentNode = event.target.closest('.ActiveTask');
        parentNode.remove();
    }
}


//Отмечаем завершенные задачи
function doneTask(event) {
    if (event.target.classList.contains('radio_in')){
        const parentNodechekbox = event.target.closest('.ActiveTask');
        parentNodechekbox.classList.toggle('TaskDone');
    }
}