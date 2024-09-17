import "./src/script/components/header-bar.js";
import "./src/script/components/footer-bar.js";
import "./src/script/components/notes-item.js";
import "./src/script/components/notes-list.js";
import "./src/script/components/archived-notes-item.js";
import "./src/script/components/archived-notes-list.js";
import NotesApi from "./src/data/notes-api.js";
import "./src/script/components/loading-indicator.js";
import "./src/styles/style.css";

// Inisialisasi AOS setelah elemen-elemen dimuat
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 1200 });
});

const loadingIndicator = document.createElement("loading-indicator");
document.body.appendChild(loadingIndicator);

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const notes = await NotesApi.getNotes();
    const archivedNotes = await NotesApi.getArchivedNotes();

    const notesListElement = document.querySelector("note-list");
    const archivedNotesListElement = document.querySelector(
      "archived-notes-list",
    );

    if (notesListElement) {
      notesListElement.setNotesList(notes);
    }

    if (archivedNotesListElement) {
      archivedNotesListElement.setArchivedNotesList(archivedNotes);
    }

    AOS.refresh(); // Refresh AOS untuk memastikan animasi pada elemen dinamis
  } catch (error) {
    console.error("Error fetching notes:", error);
  } finally {
    loadingIndicator.hide(); // Menyembunyikan indikator loading
  }

  const buttonSave = document.querySelector("#button");
  const inputNoteTitle = document.querySelector("#inputNoteTitle");
  const inputNoteBody = document.querySelector("#inputNoteBody");

  buttonSave.addEventListener("click", async function () {
    const note = {
      title: inputNoteTitle.value,
      body: inputNoteBody.value,
    };

    try {
      loadingIndicator.show(); // Menampilkan indikator loading

      const newNote = await NotesApi.createNote(note);
      console.log("Note created:", newNote);

      const notes = await NotesApi.getNotes();
      const notesListElement = document.querySelector("note-list");
      if (notesListElement) {
        notesListElement.setNotesList(notes);
      }
      AOS.refresh(); // Refresh AOS setelah menambahkan catatan baru
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      loadingIndicator.hide(); // Menyembunyikan indikator loading
    }
  });

  document.addEventListener("archive-note", async function (event) {
    const noteId = event.detail.id;
  
    try {
      loadingIndicator.show(); // Menampilkan indikator loading
  
      const archivedNote = await NotesApi.archiveNote(noteId);
      
      if (archivedNote) {
        const archivedNotesListElement = document.querySelector("archived-notes-list");
        const notesListElement = document.querySelector("note-list");
  
        archivedNotesListElement.setArchivedNotesList([
          ...archivedNotesListElement._archivedNotesList,
          archivedNote,
        ]);
  
        const updatedNotes = await NotesApi.getNotes();
        notesListElement.setNotesList(
          updatedNotes.filter((note) => note.id !== noteId),
        );
  
        AOS.refresh(); // Refresh AOS setelah mengarsipkan catatan
      }
    } catch (error) {
      console.error("Error archiving note:", error);
    } finally {
      loadingIndicator.hide(); // Menyembunyikan indikator loading
    }
  });
  

  document.addEventListener("delete-note", async function (event) {
    const noteId = event.detail.id;

    try {
      loadingIndicator.show(); // Menampilkan indikator loading

      await NotesApi.deleteNote(noteId);
      const notesListElement = document.querySelector("note-list");
      const notes = await NotesApi.getNotes();
      if (notesListElement) {
        notesListElement.setNotesList(notes);
      }
      AOS.refresh(); // Refresh AOS setelah menghapus catatan
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      loadingIndicator.hide(); // Menyembunyikan indikator loading
    }
  });

  document.addEventListener("delete-archived-note", async function (event) {
    const archivedNoteId = event.detail.id;
    try {
      loadingIndicator.show();
      await NotesApi.deleteArchivedNote(archivedNoteId);

      const archivedNotesListElement = document.querySelector(
        "archived-notes-list",
      );
      const updatedNotesList =
        archivedNotesListElement._archivedNotesList.filter(
          (note) => note.id !== archivedNoteId,
        );

      if (archivedNotesListElement) {
        archivedNotesListElement.setArchivedNotesList(updatedNotesList);
      }

      AOS.refresh(); // Refresh AOS setelah menghapus catatan yang diarsipkan
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      loadingIndicator.hide();
    }
  });

  document.addEventListener("unarchive-note", async function (event) {
    const noteId = event.detail.id;
  
    try {
      loadingIndicator.show(); // Menampilkan indikator loading
  
      const unarchivedNote = await NotesApi.unarchiveNote(noteId);
  
      if (unarchivedNote) {
        const archivedNotesListElement = document.querySelector("archived-notes-list");
        const notesListElement = document.querySelector("note-list");
  
        // Hapus catatan dari daftar arsip
        const updatedArchivedNotesList = archivedNotesListElement._archivedNotesList.filter(
          (note) => note.id !== noteId,
        );
        archivedNotesListElement.setArchivedNotesList(updatedArchivedNotesList);
  
        // Tambahkan catatan ke daftar catatan aktif
        notesListElement.setNotesList([
          ...notesListElement._notesList,
          unarchivedNote,
        ]);
  
        AOS.refresh(); // Refresh AOS setelah mengembalikan catatan
      }
    } catch (error) {
      console.error("Error unarchiving note:", error);
    } finally {
      loadingIndicator.hide(); // Menyembunyikan indikator loading
    }
  });
  
});
