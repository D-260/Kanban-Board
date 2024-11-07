// Function to add a new task to a column
function addTask(columnId) {
    const taskText = prompt('Enter task description:');
    if (!taskText) return;

    const task = document.createElement('div');
    task.classList.add('kanban-task');
    task.textContent = taskText;
    task.setAttribute('draggable', true);

    // Add drag and drop event listeners
    task.addEventListener('dragstart', handleDragStart);
    task.addEventListener('dragend', handleDragEnd);

    document.getElementById(columnId).querySelector('.kanban-tasks').appendChild(task);
}

// Drag and drop event handlers
let draggedTask = null;

function handleDragStart(event) {
    draggedTask = event.target;
    setTimeout(() => event.target.style.display = 'none', 0);
}

function handleDragEnd(event) {
    setTimeout(() => {
        draggedTask.style.display = 'block';
        draggedTask = null;
    }, 0);
}

// Allow drop on columns
const columns = document.querySelectorAll('.kanban-column');

columns.forEach(column => {
    column.addEventListener('dragover', event => {
        event.preventDefault(); // Prevent default to allow drop
    });

    column.addEventListener('drop', event => {
        event.preventDefault(); // Prevent default behavior
        if (draggedTask) {
            // Append the dragged task to the correct column
            const targetContainer = event.target.closest('.kanban-column').querySelector('.kanban-tasks');
            targetContainer.appendChild(draggedTask);
        }
    });
});
