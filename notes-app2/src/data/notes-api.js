import Swal from "sweetalert2";
const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static getNotes() {
    return fetch(`${BASE_URL}/notes`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else {
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
      .then((responseJson) => {
        const { data: notes } = responseJson;
        return Promise.resolve(notes);
      });
  }

  static getArchivedNotes() {
    return fetch(`${BASE_URL}/notes/archived`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else {
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
      .then((responseJson) => {
        const { data: archivedNotes } = responseJson;
        return Promise.resolve(archivedNotes);
      });
  }

  // static async getArchivedNotes() {
  //     try {
  //         const response = await fetch(`${BASE_URL}/notes/archived`);
  //         if (!response.ok) {
  //             throw new Error(`Something went wrong: ${response.status} ${response.statusText}`);
  //         }
  //         const responseJson = await response.json();
  //         const { data: notes } = responseJson;
  //         return notes;
  //     } catch (error) {
  //         console.error(error);
  //         return Promise.reject(error);
  //     }
  // }

  static createNote(note) {
    return fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: note.title, body: note.body }),
    })
      .then((response) => {
        response.json();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Berhasil menambahkan note baru",
        }); // Mengembalikan respons JSON
      })
      .catch((error) => {
        console.error("Gagal membuat note:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal menambahkan note baru",
        });
      });
  }

  static deleteNote(noteId) {
    return fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menghapus note");
        }
        return response.json();
      })
      .then((note) => {
        console.log("Note berhasil dihapus:", note);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Berhasil menghapus note",
        });
      })
      .catch((error) => {
        console.error("Gagal menghapus note:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal menghapus note",
        });
      });
  }
  static deleteArchivedNote(noteId) {
    return fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menghapus note");
        }
        return response.json();
      })
      .then((note) => {
        console.log("Note berhasil dihapus:", note);
        Swal.fire({
          icon: "success",
          title: "Catatan Dihapus",
          text: "Catatan berhasil dihapus dari arsip.",
        });
      })
      .catch((error) => {
        console.error("Gagal menghapus note:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal Menghapus Catatan",
          text: "Terjadi kesalahan saat menghapus catatan dari arsip.",
        });
      });
  }
  

  static async archiveNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
        method: "POST",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Gagal mengarsipkan note: ${error.message}`);
      }
      
      // Setelah proses pengarsipan, ambil data catatan yang diarsipkan
      const archivedNoteResponse = await fetch(`${BASE_URL}/notes/${noteId}`);
      if (!archivedNoteResponse.ok) {
        throw new Error('Gagal mengambil catatan yang diarsipkan');
      }
      const archivedNote = await archivedNoteResponse.json();
  
      console.log("Note berhasil diarsipkan:", archivedNote);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil mengarsipkan note.",
      });
  
      return archivedNote.data; // Mengembalikan catatan yang diarsipkan ke pemanggil
  
    } catch (error) {
      console.error("Gagal mengarsipkan note:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal mengarsipkan note",
      });
      throw error; // Melempar error agar bisa ditangani pada pemanggilnya
    }
  }

  static async unarchiveNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
        method: "POST",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Gagal mengembalikan catatan: ${error.message}`);
      }
  
      const unarchiveNoteResponse = await fetch(`${BASE_URL}/notes/${noteId}`);
      if (!unarchiveNoteResponse.ok) {
        throw new Error('Gagal mengambil catatan yang dikembalikan');
      }
      const unarchiveNote = await unarchiveNoteResponse.json();
  
      console.log("Note berhasil dikembalikan:", unarchiveNote);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil mengembalikan note dari arsip.",
      });
  
      return unarchiveNote.data; // Mengembalikan catatan yang dikembalikan ke pemanggil
    } catch (error) {
      console.error("Gagal mengembalikan catatan:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal mengembalikan catatan dari arsip.",
      });
      throw error; // Melempar error agar bisa ditangani pada pemanggilnya
    }
  }
  
  
  
  
}

export default NotesApi;
