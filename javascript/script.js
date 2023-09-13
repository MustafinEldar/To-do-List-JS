let notes = JSON.parse(localStorage.getItem("notes")) || [
    {
      title: 'Изучить JavaScript',
      completed: true, 
    },
    {
      title: 'Изучить React',
      completed: false, 
    },
  ];
  
  const inputElement = document.getElementById('title')
  const createBtn = document.getElementById('create')
  const listElement = document.getElementById('list')
  const deleteModal = document.getElementById('deleteModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const confirmBtn = document.getElementById('confirmBtn');
  
  function render() {
      listElement.innerHTML = '';
      if (notes.length === 0) {
          listElement.innerHTML = '<p>Нет элементов</p>';
      }
      for (let i = 0; i < notes.length; i++) {
          listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
      }
      localStorage.setItem("notes", JSON.stringify(notes));
  }
  
  render();
  
  createBtn.onclick = function () {
      if (inputElement.value.length ===0) {
          return
      }
      const newNote = {
          title: inputElement.value,
          completed: false,
      }
      notes.push(newNote)
      render()
      inputElement.value = ''
  }
  
  listElement.onclick = function (event) {
      if (event.target.dataset.index) {
          const index = Number(event.target.dataset.index)
          const type = event.target.dataset.type
  
          if (type === 'toggle') {
              notes[index].completed = !notes[index].completed
          } else if (type === 'remove') {
              notes.splice(index, 1)
          }
  
          render()
      }
  }
  
  function getNoteTemplate(note, index) {
    return `
    <li>
        <span class="${note.completed ? 'completed' : ''}">${note.title}</span>
        <div class="button-container">
        <button data-index="${index}" data-type="toggle" class="buttonEditTask buttonCheck">Пометить как ${note.completed ? 'невыполненное' : 'выполненное'}</button>
        <div class="vertical-buttons">
                <button data-index="${index}" data-type="edit" class="buttonEditTask buttonEditDelete">Редактировать</button>
                <button data-index="${index}" data-type="remove" class="buttonEditTask buttonEditDelete">Удалить</button>
            </div>
    </div>
    </li>
    `;
  }



  listElement.onclick = function (event) {
    if (event.target.dataset.index) {
        const index = Number(event.target.dataset.index)
        const type = event.target.dataset.type
  
        if (type === 'toggle') {
            notes[index].completed = !notes[index].completed
            render()
        } else if (type === 'edit') {
            // Отобразить модальное окно перед редактированием
            editModal.style.display = 'block';
            document.getElementById('newText').value = notes[index].title;
            confirmEditBtn.onclick = function () {
                notes[index].title = document.getElementById('newText').value;
                render()
                editModal.style.display = 'none';
            }
        } else if (type === 'remove') {
            // Отобразить модальное окно перед удалением
            deleteModal.style.display = 'block';
            confirmBtn.onclick = function () {
                notes.splice(index, 1)
                render()
                deleteModal.style.display = 'none';
            }
        }
    }
  }

// Если пользователь нажимает кнопку отмены, скрыть модальное окно
cancelBtn.onclick = function () {
  deleteModal.style.display = 'none';

}

cancelEditBtn.onclick = function () {
    editModal.style.display = 'none';
  }
  

