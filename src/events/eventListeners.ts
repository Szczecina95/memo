import { debounce } from "../helpers/debounce";
import { NoteManager } from "../service/NoteManager/NoteManager";
import { checkInputs, getNoteInputs } from "../service/NoteManager/NoteManager.helpers";
import { handleClickEvent, handleFormSubmit } from "./eventHandlers";

// Sets up event delegation for click events and initializes search input
export const setupEventDelegation = (noteManager: NoteManager) => {
  document.body.addEventListener("click", (event) => {
    handleClickEvent(event, noteManager);
    setupSearchInput(noteManager);
  });
};

// Sets up search input with debounced filtering
export const setupSearchInput = (noteManager: NoteManager) => {
  const searchInput = document.querySelector<HTMLInputElement>("#searchInput");
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce((event) => {
        noteManager.filterNotes(
          (event.target as HTMLInputElement).value.toLowerCase()
        );
      }, 500)
    );
  }
};

export const addInputEventListeners = (noteManager: NoteManager) => {
  const { noteTitleInput, textAreaInput } = getNoteInputs();
  const saveNoteButton = document.querySelector<HTMLButtonElement>(".saveNote");
  const addNoteForm = document.querySelector<HTMLFormElement>("#addNoteForm");

  const areAllElementsSelected =
    noteTitleInput && textAreaInput && saveNoteButton;

  if (areAllElementsSelected) {
    const checkInputsWrapper = () =>
      checkInputs(noteTitleInput, textAreaInput, saveNoteButton);

    noteTitleInput.addEventListener("input", checkInputsWrapper);
    textAreaInput.addEventListener("input", checkInputsWrapper);

    checkInputsWrapper();
  }

  if (addNoteForm) {
    addNoteForm.addEventListener("submit", (event) =>
      handleFormSubmit(event, noteManager)
    );
  }
};