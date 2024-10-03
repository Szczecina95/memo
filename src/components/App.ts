export const App = () => `
    <div class="app-main-container">
      <div class="app-header-container">
        <img src="../assets/icons/noteIcon.svg" class="app-header-icon" alt="empty state">
        <h1>Notes</h1>
      </div>
      <input id="searchInput" type="text" class="app-search-input full-width" placeholder="Search notes..."/>
      <div id="cardContainer"></div>
      <div id="listContainer" class="notes-list-container"></div>
    </div>
  `;