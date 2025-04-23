document.addEventListener('DOMContentLoaded', function() {
      const taskInput = document.getElementById('taskInput');
      const addBtn = document.getElementById('addBtn');
      const taskList = document.getElementById('taskList');
      const taskCounter = document.getElementById('taskCounter');
      const mandatoryCheckbox = document.getElementById('mandatoryCheckbox');
      const themeToggleBtn = document.getElementById('themeToggleBtn');
      
      // Add task function
      function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        const li = document.createElement('li');
        if (mandatoryCheckbox.checked) {
          li.classList.add('mandatory');
        }
        
        li.innerHTML = `
          <span class="task-text">${taskText}</span>
          <div class="actions">
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
          </div>
        `;
        
        taskList.appendChild(li);
        taskInput.value = '';
        mandatoryCheckbox.checked = false;
        updateTaskCount();
        
        // Add event listeners to new buttons
        li.querySelector('.complete-btn').addEventListener('click', toggleComplete);
        li.querySelector('.delete-btn').addEventListener('click', deleteTask);
      }
      
      // Toggle task completion
      function toggleComplete(e) {
        const li = e.target.closest('li');
        li.classList.toggle('completed');
        updateTaskCount();
      }
      
      // Delete task
      function deleteTask(e) {
        const li = e.target.closest('li');
        li.remove();
        updateTaskCount();
      }
      
      // Update task counter
      function updateTaskCount() {
        const totalTasks = taskList.children.length;
        const completedTasks = document.querySelectorAll('.completed').length;
        taskCounter.textContent = `${completedTasks}/${totalTasks} tasks`;
      }
      
      // Toggle dark mode
      function toggleDarkMode() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeToggleBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('darkMode', isDark);
      }
      
      // Check for saved dark mode preference
      if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
        themeToggleBtn.textContent = 'Light Mode';
      }
      
      // Event listeners
      addBtn.addEventListener('click', addTask);
      taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
      });
      themeToggleBtn.addEventListener('click', toggleDarkMode);
      
      // Initialize task count
      updateTaskCount();
    });