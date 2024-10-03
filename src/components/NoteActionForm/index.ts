import { Note } from "../../types";

export const NoteActionForm = (note?: Note) => `
  <div class="note-view-container">
    <form id="addNoteForm" class="note-view-form">
      <div class="note-view-title-container">
        <span class="note-view-text">${note?.title ? "Edit note" : "Add new note"}</span>
        <button type="button" class="note-view-cancel">Cancel</button>
        ${
          note
            ? `<input type="hidden" id="noteIdInput" value="${note.id}" />`
            : ""
        }
      </div>
      <div class="note-view-textarea-container">
      <textarea id="noteTitleInput" class="note-view-title" placeholder="Note title" required>${
    note?.title ? note.title : ""
  }</textarea>
  <textarea id="textAreaInput" class="note-view-textarea" placeholder="Type note" required>${
    note?.description ? note.description : ""
  }</textarea>
</div>
<div class="note-view-button-container">
  <button type="submit" class="saveNote action-button primary">Save</button>
</div>
    </form>
  </div>
`;