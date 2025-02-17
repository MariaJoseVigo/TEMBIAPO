// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nueva-tarea-form');
    const input = document.getElementById('nueva-tarea-input');
    const listaTareas = document.getElementById('lista-tareas');
  
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  
    const renderTareas = () => {
      listaTareas.innerHTML = '';
      tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="${tarea.completa ? 'tarea-completa' : ''}">${tarea.titulo}</span>
          <div>
            <button onclick="completarTarea(${index})">&#10003;</button>
            <button onclick="eliminarTarea(${index})">&#10005;</button>
          </div>
        `;
        listaTareas.appendChild(li);
      });
    };
  
    const guardarTareas = () => {
      localStorage.setItem('tareas', JSON.stringify(tareas));
    };
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nuevaTarea = {
        titulo: input.value,
        completa: false,
      };
      tareas.push(nuevaTarea);
      input.value = '';
      guardarTareas();
      renderTareas();
    });
  
    window.completarTarea = (index) => {
      tareas[index].completa = !tareas[index].completa;
      guardarTareas();
      renderTareas();
    };
  
    window.eliminarTarea = (index) => {
      tareas.splice(index, 1);
      guardarTareas();
      renderTareas();
    };
  
    renderTareas();
  });
  