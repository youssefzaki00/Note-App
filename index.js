import callEvents from './scripts/events';
import {
  getData, getPinnedData, saveData, showNoteList,
} from './scripts/utilties';

getData();
saveData();
getPinnedData();
showNoteList();
callEvents();
