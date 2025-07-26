const addBtn = document.querySelector('.add-btn');
const main = document.querySelector('.main');

const updateNotes = () => {
  const noteContent = document.querySelectorAll('.note-content');
  const notes = [];
  noteContent.forEach((t)=>{
    let value = t.textContent.trim();
    if (value) {
      notes.push(value);
    }
  });
  localStorage.setItem("notes",JSON.stringify(notes));
};

const addNewNote = (text = '') => {
  const note = document.createElement("div");
  note.classList.add('note');
  const htmlContent = `
      <div class="note-header">
        <a class="edit-btn"><i class="fas fa-edit"></i></a>
        <a class="delete-btn"><i class="fas fa-trash-alt"></i></a>
      </div>
      <div class="note-content">
      </div>
  `;
  
  note.insertAdjacentHTML("afterbegin",htmlContent);
  
  const editBtn = note.querySelector(".edit-btn");
  const deleteBtn = note.querySelector(".delete-btn");
  const noteContent = note.querySelector(".note-content");
  
  noteContent.textContent = text;
  noteContent.contentEditable = text ? false : true;
  
  deleteBtn.onclick = () => {
    note.remove();
    updateNotes();
  };
  
  editBtn.onclick = () => {
    if (noteContent.isContentEditable) {
      noteContent.contentEditable = false;
    }
    else {
      noteContent.contentEditable = true;
    }
  };
  noteContent.onblur = () => {
      updateNotes();
    };
  
  main.appendChild(note);
  
};

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
  notes.map( t => addNewNote(t));
}

addBtn.onclick = () => addNewNote();