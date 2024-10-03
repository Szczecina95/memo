import { ConfirmationModal } from "../components/ConfirmationModal/index";
import { NoteActionForm } from "../components/NoteActionForm/index";
import { NoteManager } from "../service/NoteManager/NoteManager";
import { getNoteInputs, initializeNotesDisplay } from "../service/NoteManager/NoteManager.helpers";
import { addInputEventListeners } from "./eventListeners";

// Cancels the note action and refreshes the note display
export const handleCancelEvent = initializeNotesDisplay;

// Displays the note form for adding a new note
export const handleAddNoteEvent = (noteManager: NoteManager, insertDiv: HTMLDivElement | null) => {
  if (insertDiv) {
    insertDiv.innerHTML = NoteActionForm();
    addInputEventListeners(noteManager);
  }
};

// Filters notes based on search input
export const handleSearchInput = (noteManager: NoteManager, event: Event) => {
  const filterText = (event.target as HTMLInputElement).value.toLowerCase();
  noteManager.filterNotes(filterText);
};

// Deletes a note after confirmation
export const handleDeleteNoteEvent = (noteManager: NoteManager, target: HTMLElement) => {
  const noteId = target.closest("li.note-card")?.getAttribute("data-id");
  if (noteId) {
    handleShowModal(() => {
      noteManager.deleteNote(noteId);
      initializeNotesDisplay();
    });
  }
};

export const handleEditNoteEvent = (
  noteManager: NoteManager,
  target: HTMLElement,
  insertDiv: HTMLDivElement | null
) => {
  const li = target.closest("li.note-card");
  if (li) {
    const noteId = li.getAttribute("data-id");
    const noteTitleElement = li.querySelector<HTMLElement>(".note-card-title");
    const noteDescriptionElement =
      li.querySelector<HTMLElement>(".note-card-description");
    const noteDateElement = li.querySelector<HTMLElement>(".note-card-createdAt");

    const areNoteElementsPresent =
      noteId && noteTitleElement && noteDescriptionElement && noteDateElement;

    if (areNoteElementsPresent) {
      const noteTitle = noteTitleElement.innerText;
      const noteDescription = noteDescriptionElement.innerText;
      const noteDate = noteDateElement.innerText;

      if (insertDiv) {
        insertDiv.innerHTML = NoteActionForm({
          id: noteId,
          title: noteTitle,
          description: noteDescription,
          createdAt: noteDate,
        });
        addInputEventListeners(noteManager);
      }
    }
  }
};

// Delegates click events for note actions
export const handleClickEvent = (event: MouseEvent, noteManager: NoteManager) => {
  const target = event.target as HTMLElement;
  const insertDiv = document.querySelector<HTMLDivElement>("#cardContainer");

  if (target.classList.contains("note-view-cancel")) handleCancelEvent();
  else if (target.classList.contains("addNoteBtn")) handleAddNoteEvent(noteManager, insertDiv);
  else if (target.closest(".deleteNote")) handleDeleteNoteEvent(noteManager, target);
  else if (target.closest(".editNote")) handleEditNoteEvent(noteManager, target, insertDiv);
};

// Submits the form for adding or editing a note
export const handleFormSubmit = (event: Event, noteManager: NoteManager) => {
  event.preventDefault();
  const noteIdInput = document.querySelector<HTMLInputElement>("#noteIdInput");
  const { noteTitleInput, textAreaInput } = getNoteInputs();

  if (noteTitleInput && textAreaInput) {
    const title = noteTitleInput.value.trim();
    const description = textAreaInput.value.trim();
    const noteId = noteIdInput ? noteIdInput.value : null;

    if (title === "" || description === "") {
      alert("Both title and description must be filled out.");
      return;
    }

    if (noteId) {
      noteManager.editNote(noteId, title, description);
    } else {
      noteManager.addNote(title, description);
    }

    noteTitleInput.value = "";
    textAreaInput.value = "";

    initializeNotesDisplay();
  }
};

// Displays a confirmation modal before deleting a note
export const handleShowModal = (confirmCallback: () => void) => {
  document.body.insertAdjacentHTML("beforeend", ConfirmationModal());
  document.getElementById("confirmButton")?.addEventListener("click", () => {
    confirmCallback();
    handleCloseModal();
  });
  document.getElementById("cancelButton")?.addEventListener("click", handleCloseModal);
};

// Closes the modal
export const handleCloseModal = () => {
  document.querySelector(".modal-overlay")?.remove();
};
