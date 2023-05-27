let myPromise = async () => {
  var introAudio = new Audio("./Newrecording19.mp3");
  await introAudio.play();
};

myPromise();

let inputElement = document.getElementById("inputElement");
let todoListCont = document.getElementById("todoListCont");
let addBtn = document.getElementById("addBtn");
let saveBtn = document.getElementById("saveBtn");

function deleteTodo(todoListId) {
  let presentTodoList = document.getElementById(todoListId);
  todoListCont.removeChild(presentTodoList);

  let todoIndex = todoListArray.findIndex(function (eachTodo) {
    let todoId = "todo" + eachTodo.uniqueId;
    if (todoId === todoListId) {
      return true;
    } else {
      return false;
    }
  });

  todoListArray.splice(todoIndex, 1);
}

function changeCheckboxStatus(checkBoxId, listContentId, todoListId) {
  let presentCheckBox = document.getElementById(checkBoxId);
  let presentListContent = document.getElementById(listContentId);

  if (presentCheckBox.checked == true) {
    presentListContent.classList.add("checked");
  } else {
    presentListContent.classList.remove("checked");
  }

  let todoIndex = todoListArray.findIndex(function (eachTodo) {
    let todoId = "todo" + eachTodo.uniqueId;
    if (todoId === todoListId) {
      return true;
    } else {
      return false;
    }
  });

  if (todoListArray[todoIndex].isChecked === true) {
    todoListArray[todoIndex].isChecked = false;
  } else {
    todoListArray[todoIndex].isChecked = true;
  }
}

function createTodo(todoObj) {
  let todoList = document.createElement("li");
  let todoListId = "todo" + todoObj.uniqueId;
  todoList.id = todoListId;
  todoList.classList.add("todolist");
  todoListCont.appendChild(todoList);

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  let checkBoxId = "checkBox" + todoObj.uniqueId;
  checkBox.id = checkBoxId;
  checkBox.checked = todoObj.isChecked;
  checkBox.classList.add("checkbox");
  todoList.appendChild(checkBox);

  let listCont = document.createElement("div");
  listCont.classList.add("list-cont");
  todoList.appendChild(listCont);

  let listContent = document.createElement("label");
  listContent.setAttribute("for", checkBoxId);
  let listContentId = "listContent" + todoObj.uniqueId;
  listContent.id = listContentId;
  listContent.textContent = todoObj.text;
  listContent.classList.add("list-content");
  if (todoObj.isChecked === true) {
    listContent.classList.add("checked");
  }
  listCont.appendChild(listContent);

  let deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fa-solid  fa-trash-can delete-icon");
  listCont.appendChild(deleteIcon);

  inputElement.value = "";

  deleteIcon.onclick = function () {
    deleteTodo(todoListId);
  };

  checkBox.onclick = function () {
    changeCheckboxStatus(checkBoxId, listContentId, todoListId);
  };
}

addBtn.onclick = async () => {
  const snd = new Audio("ButtonClickSound.mp3");
  await snd.play();

  let UserInputTask = inputElement.value;
  if (UserInputTask === "") {
    alert("Please enter valid text!");
  } else {
    let todoObj = {
      text: UserInputTask,
      uniqueId: count,
      isChecked: false,
    };

    todoListArray.push(todoObj);

    createTodo(todoObj);

    count += 1;
  }
};

function getSavedTodos() {
  let storedTodoString = localStorage.getItem("todoArray");
  let parsedTodoArray = JSON.parse(storedTodoString);

  if (parsedTodoArray === null) {
    return [];
  } else {
    return parsedTodoArray;
  }
}

saveBtn.onclick = () => {
  var snd = new Audio("ButtonClickSound.mp3");
  snd.play();

  let todoArrayString = JSON.stringify(todoListArray);
  localStorage.setItem("todoArray", todoArrayString);
};

todoListArray = getSavedTodos();
let count = 0;
for (let todo of todoListArray) {
  if (todo.uniqueId > count) {
    count = todo.uniqueId;
  }
}
count = count + 1;
if (todoListArray === []) {
  count = 0;
}

for (let todo of todoListArray) {
  createTodo(todo);
}
