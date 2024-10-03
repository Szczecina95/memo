import { Note } from "../../types";

export const SingleNote = (note: Note) => `
  <li class="note-card" data-id="${note.id}">
    <div class="note-card-container">
      <div class="note-card-header">
        <h3 class="note-card-title">${note.title}</h3>
        <div class="note-card-actions">
          <button class="editNote note-card-btn">
            <img src="../assets/icons/editNoteIcon.svg" alt="Edit">
          </button>
          <button class="deleteNote note-card-btn">
            <img src="../assets/icons/deleteNoteIcon.svg" alt="Delete">
          </button>
        </div>
      </div>
      <p class="note-card-description">${note.description}</p>
      <p class="note-card-createdAt">
      ${new Date(note.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit"
      })}
    </p>
    </div>
  </li>
`;