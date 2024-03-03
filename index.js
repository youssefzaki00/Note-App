import callEvents from './scripts/events';
import {
  getData, getMode, getPinnedData, saveData, saveMode, showNoteList,
} from './scripts/utilties';

getData();
saveData();
getMode();
saveMode();
getPinnedData();
showNoteList();
callEvents();
