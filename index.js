import callEvents from './scripts/events';
import { getData, getPinnedData, showNoteList } from './scripts/utilties';

getPinnedData();
getData();
showNoteList();
callEvents();
