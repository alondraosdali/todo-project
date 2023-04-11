/* BOOTSTRAP TOOLTIP JS */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
/************************/

let tasks = [
    "Take out trash",
    "Clean dishes",
    "Pick up dry cleaning",
    "Pick up groceries",
    "Practive Javascript"
];
let completedTasks = [];

const todosList = document.getElementById("todosList");
const completedList = document.getElementById("completedList");

const todosListCount = document.getElementById("tasksCount");
const completedListCount = document.getElementById("tasksCompleted");

const initRemoveItemTimer = (item) => setTimeout(()=>{
    item.input.remove();
    item.btn.remove();
    console.log("REMOVAL SUCCESS");
}, 10000);
const cancelTimer = (timer) => clearTimeout(timer);
function createTaskTodoItems(tasks) {
    tasks.forEach((task, index) => {
        let li = createListItem(task, index, createActionBtn);
        todosList.appendChild(li);
    });
}

function createListItem(task, index, btnAction, forCompleted = false) {
    let li = createElement("li", {
        _id: `task${index}`,
        classes: "row justify-content-between p-0 me-2 my-3 align-items-center border border-2 border-dark"
    });
    const taskNameColumn = createElement("div", { classes: "col-md-6"});
    const taskNameP = createElement("p", {classes: "m-0", text: task});
    taskNameColumn.appendChild(taskNameP);
    const taskActionsColumn = createElement("div", { 
        classes: "col-md-4 d-flex align-items-center justify-content-end m-0 p-0"
    });
    const actionBtn = btnAction("btn border-0 p-0", "Remove from Todo List", `
    <span aria-hidden="true">
        <i class="fa-solid fa-xmark"></i>
    </span>
    <span class="visually-hidden">
        Remove from Todo
    </span>
`);
    const completeActionInput =  forCompleted ? 
                                    createCompleteAction(index, true) : 
                                    createCompleteAction(index);
    taskActionsColumn.append(completeActionInput, actionBtn);
    li.append(taskNameColumn, taskActionsColumn);
    return li;
}

function createElement(
    element,
    options = { _id: "", classes: "", text: "" }
) {
    const el = document.createElement(element);

    for(const property in options) {
        // console.log("PROPERTY -----> ", property);
        // console.log("PROPERTY VALUE ------> ", options[property]);
        switch(property) {
            case "classes":
                el.classList = options[property];
                break;
            case "_id":
                el.id = options[property];
                break;
            case "text":
                el.textContent = options[property];
                break;
            default:
                console.log("Property not listed.");
                // return "";
        }
    }

    return el;
}

function createCompleteAction(index, isCompleted = false) {
    const form = createElement("form", { classes: "text-center px-2 py-2"});
    const label = createElement("label", { classes: "visually-hidden", text: "Completed"});
    const input = createElement("input");
    input.type = "checkbox";
    let _id;
    if(isCompleted) {
        _id = `taskInputCompleted${index}`;
        input.checked = true;
        input.id = _id;
        label.setAttribute("for", _id);
    } else {
        _id = `taskInput${index}`;
        input.id = _id;
        label.setAttribute("for", _id);
    }
    form.append(label, input);
    return form;
}

function createActionBtn(elClasses, elTitle, elContent) {
    const btnWrapper = createElement("div", { classes: "px-2 py-2"});
    const btn = createElement("btn", {classes: elClasses});
    btn.setAttribute("data-bs-toggle", "tooltip");
    btn.setAttribute("data-bs-title", elTitle);
    btn.setAttribute("type", "button");
    btn.innerHTML = elContent;
    btnWrapper.appendChild(btn);
    return btnWrapper;
}
function moveToCompleted(taskElement) {
    // Removes element from DOM
    taskElement.remove();
    // Remove item from the array
    // TBC
    const taskTxt = taskElement.childNodes[0].textContent;
    // Push task to completed list
    completedTasks.push(taskTxt);
    // Create new completed task id
    const taskId = `completed${completedTasks.at(-1).replace(" ", "")}`;
    // Create new completed task list item
    const newTask = createListItem(taskTxt, taskId, true);
    // Create action undo btn
    const undoBtn = createActionBtn("btn btn-primary", "Undo", "Undo");
    undoBtn.id="undoBtn";
    const timerId = initRemoveItemTimer({ input: newTask.querySelector("input"), btn: undoBtn})
    undoBtn.addEventListener("click", () => {
        cancelTimer(timerId);
        newTask.remove();
        tasks.push(taskTxt);
        todosList.appendChild(taskElement);
        completedTasks.pop();
    })
    newTask.appendChild(undoBtn);
    completedList.appendChild(newTask);

}
createTaskTodoItems(tasks);

todosList.addEventListener("change", (e) => {
    const task = document.querySelector(`li#task${e.target.id.replace("taskInput", "")}`);
    const taskTxt = task.childNodes[0].textContent;
    const isConfirmed = confirm(`Are you sure you want to mark task, ${taskTxt}, as complete?`);
    if(isConfirmed) {
        alert(`You've marked task, ${taskTxt}, as complete. You'll have a window of 3 minutes before you're able to undo this action if it was a mistake.`);
        moveToCompleted(task);
    } else {
        e.target.checked = false;
        alert("No changes made.");
    }
});




