import { App } from "./components/App";
import { setupEventDelegation } from "./events/eventListeners";
import { NoteManager } from "./service/NoteManager/NoteManager";
import { initializeNotesDisplay } from "./service/NoteManager/NoteManager.helpers";
import "./style.css";

// Renders the main app structure into the #app div
document.querySelector<HTMLDivElement>("#app")!.innerHTML = App();

// Initializes NoteManager instance
const noteManager = new NoteManager();

// Function to set up the app's event listeners and display initial notes
const initializeApp = () => {
  setupEventDelegation(noteManager); // Sets up click and input event delegation
  initializeNotesDisplay(); // Initializes the notes display area
};

// Initializes the app when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", initializeApp);