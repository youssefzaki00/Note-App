import callEvents from './scripts/events';
import {
  getData, getMode, getPinnedData, saveData, showNoteList,
} from './scripts/utilties';

getData();
saveData();
getMode();
getPinnedData();
showNoteList();
callEvents();
