import {
  addNoteElement,
  addNotesLink, addNotesSection, addPinnedNoteElement, authorInput,
  authorLabel, contentInput, contentLabel,
  noteList,
  notePreview,
  notes,
  notesLink, notesSection, pinned, titleInput, titleLabel,
} from './elements';

let arr = [];
let pinnedArr = [];
let appMode = 'add';
let targetUpdatingNote = '';
export function getMode() {
  if (localStorage.getItem('Mode')) {
    appMode = localStorage.getItem('Mode');
  }
  return appMode;
}
export function saveMode() {
  localStorage.setItem('Mode', appMode);
}
export function showAddNote() {
  addNotesSection.style.display = 'block';
  notesSection.style.display = 'none';
  addNotesLink.classList.add('active');
  notesLink.classList.remove('active');
}
export function showNoteList() {
  addNotesSection.style.display = 'none';
  notesSection.style.display = 'grid';
  addNotesLink.classList.remove('active');
  notesLink.classList.add('active');
  notePreview.classList.remove('show');
  noteList.classList.remove('close');
  clearAfter();
}
export function getData() {
  if (localStorage.getItem('Notes')) {
    arr = JSON.parse(localStorage.getItem('Notes'));
    // eslint-disable-next-line no-use-before-define
    appendNotes();
  }
  return arr;
}
export function getPinnedData() {
  if (localStorage.getItem('pinnedNotes')) {
    pinnedArr = JSON.parse(localStorage.getItem('pinnedNotes'));
    // eslint-disable-next-line no-use-before-define
    appendPinnedNotes();
  }
  return pinnedArr;
}
export function saveData() {
  localStorage.setItem('Notes', JSON.stringify(arr));
  localStorage.setItem('pinnedNotes', JSON.stringify(pinnedArr));
  arr = JSON.parse(localStorage.getItem('Notes'));
  pinnedArr = JSON.parse(localStorage.getItem('pinnedNotes'));
}
export function addToArr(note) {
  if (note.isPinned) {
    pinnedArr.push(note);
    return;
  }
  arr.push(note);
}
function checkEmptyInput() {
  if (titleInput.value.trim() === '') {
    titleLabel.classList.add('error');
    return false;
  }
  titleLabel.classList.remove('error');
  if (authorInput.value.trim() === '') {
    authorLabel.classList.add('error');
    return false;
  }
  authorLabel.classList.remove('error');
  if (contentInput.value.trim() === '') {
    contentLabel.classList.add('error');
    return false;
  }
  contentLabel.classList.remove('error');
  return true;
}
function handleDate() {
  const day = new Date().getDate();
  const monthNumber = new Date().getMonth();
  const year = new Date().getFullYear();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[monthNumber];
  return `${month} ${day}, ${year}`;
}
export function handleInputs(pinnedStatus) {
  const date = handleDate();
  const note = {
    id: Date.now(),
    title: titleInput.value,
    author: authorInput.value,
    content: contentInput.value,
    isPinned: pinnedStatus === 'pinned',
    date,
  };
  return note;
}
function clearAfter() {
  titleInput.value = '';
  authorInput.value = '';
  contentInput.value = '';
  addNoteElement.value = 'Add Note';
  addPinnedNoteElement.value = 'Add Pinned Note';
}
function createNoteElement(note) {
  return `
  <div class="note" data-id=${note.id}>
    <h3 class="heading-h3">${note.title}</h3>
    <p class="small-text">
      ${note.content.slice(0, 35)}...
    </p>
    <div>
      <div class="date small-text">${note.date}</div>
      <button class="delete small-text">delete</button>
    </div>
  </div>`;
}
function appendNotes(Arr) {
  notes.innerHTML = Arr?.map((note) => createNoteElement(note)).join('')
    || arr?.map((note) => createNoteElement(note)).join('');
}
function appendPinnedNotes(Arr) {
  pinned.innerHTML = Arr?.map((note) => createNoteElement(note)).join('')
    || pinnedArr?.map((note) => createNoteElement(note)).join('');
}
export function addNote() {
  if (!checkEmptyInput()) {
    return;
  }
  appMode = 'add';
  saveMode();
  const note = handleInputs();
  addToArr(note);
  saveData();
  appendNotes();
  clearAfter();
}
export function addPinnedNote() {
  if (!checkEmptyInput()) {
    return;
  }
  appMode = 'add';
  saveMode();
  const note = handleInputs('pinned');
  addToArr(note);
  saveData();
  appendPinnedNotes();
  clearAfter();
}
export function deleteNote(noteID) {
  arr = arr.filter((Note) => parseInt(Note.id) !== parseInt(noteID));
  saveData();
  appendNotes();
}
export function handleUpdate(note) {
  titleInput.value = note.title;
  authorInput.value = note.author;
  contentInput.value = note.content;
  addNoteElement.value = 'Update Note';
  addPinnedNoteElement.value = 'Update Pinned Note';
  appMode = 'update';
  saveMode();
  showAddNote();
  targetUpdatingNote = note;
}
function pinNote() {
  const targetIndex = arr.findIndex((note) => targetUpdatingNote.id == note.id);
  arr[targetIndex].title = titleInput.value;
  arr[targetIndex].author = authorInput.value;
  arr[targetIndex].content = contentInput.value;
  arr[targetIndex].isPinned = true;
  pinnedArr.push(arr[targetIndex]);
  arr.splice(targetIndex, 1);
  saveData();
  appendNotes();
  appendPinnedNotes();
  clearAfter();
  showNoteList();
  appMode = 'add';
  saveMode();
}
function unPinNote() {
  const targetIndex = pinnedArr.findIndex((note) => targetUpdatingNote.id == note.id);

  pinnedArr[targetIndex].title = titleInput.value;
  pinnedArr[targetIndex].author = authorInput.value;
  pinnedArr[targetIndex].content = contentInput.value;
  pinnedArr[targetIndex].isPinned = false;
  arr.push(pinnedArr[targetIndex]);
  pinnedArr.splice(targetIndex, 1);
  saveData();
  appendNotes();
  appendPinnedNotes();
  clearAfter();
  showNoteList();
  appMode = 'add';
  saveMode();
}

export function updateNote() {
  if (targetUpdatingNote.isPinned === true) {
    unPinNote();
    return;
  }
  const targetIndex = arr.findIndex((note) => targetUpdatingNote.id == note.id);
  arr[targetIndex].title = titleInput.value;
  arr[targetIndex].author = authorInput.value;
  arr[targetIndex].content = contentInput.value;
  saveData();
  appendNotes();
  clearAfter();
  showNoteList();
  appMode = 'add';
  saveMode();
}
export function updatePinnedNote() {
  if (targetUpdatingNote.isPinned === false) {
    pinNote();
    return;
  }
  const targetIndex = pinnedArr.findIndex((note) => targetUpdatingNote.id == note.id);

  pinnedArr[targetIndex].title = titleInput.value;
  pinnedArr[targetIndex].author = authorInput.value;
  pinnedArr[targetIndex].content = contentInput.value;

  saveData();
  appendPinnedNotes();
  clearAfter();
  showNoteList();
  appMode = 'add';
  saveMode();
}
export function deletePinnedNote(noteID) {
  pinnedArr = pinnedArr.filter((Note) => parseInt(Note.id) !== parseInt(noteID));
  saveData();
  appendPinnedNotes();
}
function createNotePreview(targetedNote) {
  return `
    <h1 class="h1-heading note__title">
      ${targetedNote.title}
    </h1>
    <span class="note__auther small-text">${targetedNote.date} / By ${targetedNote.author}</span>
    <div class="note__content lage-text">
      ${targetedNote.content}
    </div>
    <button class="updateButton">+</button>`;
}
export function showNotePreview(showId) {
  const targetedNote = arr.find((note) => parseInt(showId) === parseInt(note.id));
  [...pinned.children].map((e) => e.classList.remove('active'));
  [...notes.children].map((e) => {
    if (parseInt(e.dataset.id) === parseInt(showId)) {
      e.classList.add('active');
    } else {
      e.classList.remove('active');
    }
    notePreview.classList.add('show');
    noteList.classList.add('hide');
    return 0;
  });
  notePreview.innerHTML = createNotePreview(targetedNote);

  const updateButton = document.querySelector('.updateButton');
  updateButton?.addEventListener('click', () => handleUpdate(targetedNote));
}
export function showPinnedNotePreview(showId) {
  const targetedNote = pinnedArr.find((note) => parseInt(showId) === parseInt(note.id));
  [...notes.children].map((e) => e.classList.remove('active'));
  [...pinned.children].map((e) => {
    if (parseInt(e.dataset.id) === parseInt(showId)) {
      e.classList.add('active');
    } else {
      e.classList.remove('active');
    }
    notePreview.classList.add('show');
    noteList.classList.add('hide');
    return 0;
  }); // update note
  notePreview.innerHTML = createNotePreview(targetedNote);
  const updateButton = document.querySelector('.updateButton');
  updateButton?.addEventListener('click', () => handleUpdate(targetedNote));
}
export function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
export const debouncedSearch = debounce(searchNotes, 300);
export const debouncedSearchPinnedNotes = debounce(searchPinnedNotes, 300);
export function searchNotes(e) {
  const searchTerm = e.toLowerCase();
  const filteredNotes = [];
  arr.forEach((note) => {
    if (note.title.toLowerCase().includes(searchTerm)
    ) {
      filteredNotes.push(note);
    }
  });
  appendNotes(filteredNotes);
}
export function searchPinnedNotes(e) {
  const searchTerm = e.toLowerCase();
  const filteredNotes = [];
  pinnedArr.forEach((note) => {
    if (note.title.toLowerCase().includes(searchTerm)
    ) {
      filteredNotes.push(note);
    }
  });

  appendPinnedNotes(filteredNotes);
}
