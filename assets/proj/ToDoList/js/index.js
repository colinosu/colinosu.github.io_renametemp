(function(){

  var doList = {
    init: function() {
      this.cacheDom();
      this.bindEvents();
    },

    cacheDom: function() {
      //access elements
      this.taskInput = document.getElementById("newtask");
      this.addButton = document.getElementsByTagName("button")[0];
      this.incompleteTaskHolder = document.getElementById("incomplete-tasks");
      this.completedTasksHolder = document.getElementById("completed-tasks");
    },
    // Bind the Events about tasks imcompleted the completed
    bindEvents: function(taskListItem, checkBoxEventHandler) {
      // Attaches the addTask event when click the "+" button
      this.addButton.onclick = this.addTask.bind(this);
      // Attaches the bindTaskEvents event for tasks incompleted (delete, Edit, checkbox for complete)
      for (var i=0; i < this.incompleteTaskHolder.children.length;i++){
        this.bindTaskEvents(this.incompleteTaskHolder.children[i], this.taskCompleted);
      }
      // Attaches the bindTaskEvents event for tasks completed (delete, edit)
      for (var i=0; i < this.completedTasksHolder.children.length;i++){
        this.bindTaskEvents(this.completedTasksHolder.children[i], this.taskIncomplete);
      }
    },

    // Events about tasks imcompleted or completed (delete, edit, checkbox for complete)
    bindTaskEvents: function(taskListItem, checkBoxEventHandler) {
      var checkBox = taskListItem.querySelector("input[type=checkbox]");
      var editButton = taskListItem.querySelector("button.edit");
      var deleteButton = taskListItem.querySelector("button.delete");

      editButton.onclick = this.editTask.bind(this);
      deleteButton.onclick = this.deleteTask.bind(this);
      checkBox.onchange = checkBoxEventHandler.bind(this);
    },

    // Create new tasks
    createNewTaskElement: function(taskString) {

      var listItem = document.createElement("li");
      var containsClass = listItem.classList.contains("boxholder");
      var checkBox = document.createElement("input");
      var label = document.createElement("label");
      var editInput = document.createElement("input");
      var editButton = document.createElement("button");
      var deleteButton = document.createElement("button");

      label.innerText = taskString;

      checkBox.type="checkbox";
      editInput.type="text";

      editButton.innerText = "Edit";
      editButton.className = "edit";
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";

      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(editInput);
      listItem.appendChild(deleteButton);
      listItem.appendChild(editButton);
      return listItem;
    },

    // Add the new tasks.
    addTask: function(e) {
      // Attaches createNewTaskElement to add new tasks
      var listItem = this.createNewTaskElement(this.taskInput.value);

      // Put to list of tasks incompleted when add new task
      this.incompleteTaskHolder.appendChild(listItem);
      // Attaches the bindTaskEvents for new tasks added
      this.bindTaskEvents(listItem, this.taskCompleted);

      this.taskInput.value="";
    },

    // Edit the tasks added.
    editTask: function(e) {

      var listItem = e.target.parentNode;

      var editInput = listItem.querySelector('input[type=text]');
      var label = listItem.querySelector("label");
      var containsClass = listItem.classList.contains("editMode");

      // if containsClass is editMode
      if (containsClass) {
        label.innerText = editInput.value; // Display the values edited
      } else {                             // if containsClass isn't editMode
        editInput.value = label.innerText; // Reflect to edit list the currently values
      }

      listItem.classList.toggle("editMode"); // Display the Edit toggle
    },

    // Delete the Tasks
    deleteTask: function(e) {

      var listItem = e.target.parentNode;
      var ul = listItem.parentNode;

      ul.removeChild(listItem);
    },

    // Display the tasks to list of tasks completed
    taskCompleted: function(e) {

      var listItem = e.target.parentNode;
      doList.completedTasksHolder.appendChild(listItem);
      // Attaches bindTaskEvents event to Edit/Delete the tasks within list
      doList.bindTaskEvents(listItem, this.taskIncomplete);
    },

    // Display the tasks to list of tasks incompleted
    taskIncomplete: function(e) {

      var listItem = e.target.parentNode;
      this.incompleteTaskHolder.appendChild(listItem);
      // Attaches bindTaskEvents event to Edit/Delete the tasks within list
      this.bindTaskEvents(listItem, this.taskCompleted);
    },
  }

  doList.init();
}());
