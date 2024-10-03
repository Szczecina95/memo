import { Note } from "../../types";
import { SingleNote } from "../SignleNote";

export const NotesList = (filteredNotes: Note[]) => {
  return `
      <ul id="notesList" class="notes-list-display">
        ${filteredNotes.map(note => SingleNote(note)).join('')}
      </ul>
    `;
};