const notesContainer = document.getElementById('notesContainer');
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const searchInput = document.getElementById('searchInput');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Функция для отображения заметок
function renderNotes(filter = '') {
    notesContainer.innerHTML = '';
    const filteredNotes = notes.filter(note => note.text.includes(filter));

    filteredNotes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <span>${note.text}</span>
            <div>
                <button onclick="editNote(${index})">Редактировать</button>
                <button onclick="deleteNote(${index})">Удалить</button>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// добавления заметки
function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        notes.push({ text: noteText });
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        renderNotes();
        notifyStorageChange();
    }
}

// редактирования заметки
function editNote(index) {
    const newNoteText = prompt('Редактировать заметку:', notes[index].text);
    if (newNoteText !== null) {
        notes[index].text = newNoteText;
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        notifyStorageChange();
    }
}

// удаления заметки
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    notifyStorageChange();
}

// Обработчик события для добавления заметки
addNoteBtn.addEventListener('click', addNote);

// Обработка ввода поиска
searchInput.addEventListener('input', () => {
    renderNotes(searchInput.value);
});

// Функция для уведомления об изменениях в localStorage
function notifyStorageChange() {
    window.dispatchEvent(new Event('storage'));
}

// Синхронизация заметок между открытыми окнами
window.addEventListener('storage', () => {
    notes = JSON.parse(localStorage.getItem('notes')) || [];
    renderNotes(searchInput.value);
});

// Рендерим заметки при загрузке
renderNotes();
