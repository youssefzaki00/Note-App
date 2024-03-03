import {
  addNoteElement,
  addNotesLink, addPinnedNoteElement,
  links, listArrow, menuButton,
  navSection, noteList, notePreview, notes,
  notesLink, pinned, searchInput, showSearchButton,
} from './elements';
import {
  addNote, addPinnedNote, deleteNote,
  deletePinnedNote, getMode, showAddNote,
  showNoteList, showNotePreview, showPinnedNotePreview,
  updatePinnedNote, updateNote, debouncedSearch, debouncedSearchPinnedNotes,
} from './utilties';

export default function callEvents() {
  addNotesLink.addEventListener('click', showAddNote);
  notesLink.addEventListener('click', showNoteList);
  listArrow.addEventListener('click', () => {
    // eslint-disable-next-line eqeqeq
    if (listArrow.textContent.trim() == '<') {
      listArrow.innerHTML = '&gt;';
      // eslint-disable-next-line eqeqeq
    } else if (listArrow.textContent.trim() == '>') {
      listArrow.innerHTML = '&lt;';
    }

    noteList.classList.toggle('close');
    notePreview.classList.toggle('close_list');
  });
  showSearchButton.addEventListener('click', () => {
    navSection.classList.toggle('show_search');
  });
  menuButton.addEventListener('click', () => {
    links.classList.toggle('show_menu');
    menuButton.classList.toggle('close_menu');
  });
  // add note
  addNoteElement.addEventListener('click', (e) => {
    e.preventDefault();
    const mode = getMode();
    if (mode === 'add') {
      addNote();
    }
    if (mode === 'update') {
      updateNote();
    }
  });
  // add pinned note
  addPinnedNoteElement.addEventListener('click', (e) => {
    e.preventDefault();
    const mode = getMode();
    if (mode === 'add') {
      addPinnedNote();
    }
    if (mode === 'update') {
      updatePinnedNote();
    }
  });
  // delete event && active note preview
  notes.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      deleteNote(e.target.parentElement.parentElement.getAttribute('data-id'));
    } else {
      if (e.target.getAttribute('data-id')) {
        showNotePreview(e.target.getAttribute('data-id'));
      }
      if (e.target.parentElement.getAttribute('data-id')) {
        showNotePreview(e.target.parentElement.getAttribute('data-id'));
      }
      if (e.target.parentElement.parentElement.getAttribute('data-id')) {
        showNotePreview(e.target.parentElement.parentElement.getAttribute('data-id'));
      }
    }
  });
  // delete event && active pinned note preview
  pinned.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      deletePinnedNote(e.target.parentElement.parentElement.getAttribute('data-id'));
    } else {
      if (e.target.getAttribute('data-id')) {
        showPinnedNotePreview(e.target.getAttribute('data-id'));
      }
      if (e.target.parentElement.getAttribute('data-id')) {
        showPinnedNotePreview(e.target.parentElement.getAttribute('data-id'));
      }
      if (e.target.parentElement.parentElement.getAttribute('data-id')) {
        showPinnedNotePreview(e.target.parentElement.parentElement.getAttribute('data-id'));
      }
    }
  });
  // search notes title
  searchInput.addEventListener('input', (e) => {
    e.preventDefault();
    debouncedSearch(e.target.value);
    debouncedSearchPinnedNotes(e.target.value);
  });
}
