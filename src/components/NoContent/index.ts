export const NoContent = (title: string) => `
  <div class="empty-list-container">
    <img src="../assets/images/circle.png" alt="empty state">
    <h2>${title}</h2>
    <h3 class="empty-list-description">Add a note to keep track of your learnings</h3>
    <button type="button" class="addNoteBtn secondary">
      <img src="../assets/icons/addNoteIcon.svg" alt="Add note icon">
      Add note
    </button>
  </div>
`;