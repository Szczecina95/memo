import { Note } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { LocalStorageManager } from "../Storage/LocalStorageManager";
import { initializeNotesDisplay, renderNotes } from "./NoteManager.helpers";

export class NoteManager {
  private allNotes: Note[] = [];

  constructor() {
    this.loadAndRenderNotes();
  }

  // Loads notes from localStorage and renders them
  private loadAndRenderNotes() {
    this.allNotes = LocalStorageManager.loadItemsFromLocalStorage<Note>("notes");
    renderNotes(this.allNotes);
  }

  // Adds a new note, saves it to localStorage, and refreshes the display
  public addNote(title: string, description: string) {
    const newNote: Note = {
      id: uuidv4(),
      title,
      description,
      createdAt: new Date().toISOString(),
    };
    LocalStorageManager.saveItemToLocalStorage<Note>("notes", newNote);
    this.loadAndRenderNotes();
  }

  // Edits an existing note, saves the changes to localStorage, and refreshes the display
  public editNote(noteId: string, title: string, description: string) {
    const updatedNote: Note = {
      id: noteId,
      title,
      description,
      createdAt: new Date().toISOString(),
    };
    LocalStorageManager.updateItemInLocalStorage<Note>("notes", updatedNote);
    this.loadAndRenderNotes();
  }

  // Deletes a note from localStorage and refreshes the display
  public deleteNote(noteId: string) {
    LocalStorageManager.deleteFromLocalStorage<Note>("notes", noteId);
    this.loadAndRenderNotes();
  }

  // Filters notes based on a search term and renders the matching notes
  public filterNotes(filterText: string) {
    const filteredNotes = this.allNotes.filter(note =>
      note.title.toLowerCase().includes(filterText) ||
      note.description.toLowerCase().includes(filterText)
    );
    renderNotes(filteredNotes);
    initializeNotesDisplay("No matching notes found");
  }
}
