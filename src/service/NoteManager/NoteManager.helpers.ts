import { NoContent } from "../../components/NoContent/index";
import { NotesList } from "../../components/NotesList/index";
import { Note } from "../../types";

// Retrieves note input fields from the DOM
export const getNoteInputs = () => {
  const noteTitleInput = document.querySelector<HTMLInputElement>("#noteTitleInput");
  const textAreaInput = document.querySelector<HTMLTextAreaElement>("#textAreaInput");
  return { noteTitleInput, textAreaInput }; // Returns both inputs as an object
};

// Enables or disables the save button based on input validation
export const checkInputs = (
  noteTitleInput: HTMLInputElement,
  textAreaInput: HTMLTextAreaElement,
  saveNoteButton: HTMLButtonElement
) => {
  saveNoteButton.disabled = !noteTitleInput.value.trim() || !textAreaInput.value.trim();
};

// Renders the list of notes inside the container
export const renderNotes = (notes: Note[]) => {
  const notesListContainer = document.querySelector<HTMLDivElement>("#listContainer");
  if (notesListContainer) {
    notesListContainer.innerHTML = NotesList(notes); // Populates the notes list
  }
};

// Initializes the display depending on whether there are notes or not
export const initializeNotesDisplay = (title?: string) => {
  const insertDiv = document.querySelector<HTMLDivElement>("#cardContainer");
  const notes = document.querySelector<HTMLDivElement>("#notesList")?.children;

  if (insertDiv) {
    // If no notes are found, show the "NoContent" component, otherwise show the "Add new" button
    insertDiv.innerHTML = notes?.length
      ? '<button type="button" class="addNoteBtn primary full-width">Add new</button>'
      : NoContent(title ?? "No notes yet");
  }
};
