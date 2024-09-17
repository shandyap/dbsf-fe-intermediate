class ArchivedNotesItem extends HTMLElement {
  constructor() {
    super();
    this._note = {
      id: "NEED_ID",
      title: "NEED_TITLE",
      body: "NEED_BODY",
      createdAt: "NEED_CREATED_AT",
    };

    this._style = document.createElement("style");
    this.attachShadow({ mode: "open" });
  }

  setArchivedNote(value) {
    this._note = value;
    this.render();
  }
  

  connectedCallback() {
    this.render();
    this._addUnarchiveEventListener();
    this._addDeleteEventListener();
  }

  _addUnarchiveEventListener() {
    const unarchiveButton = this.shadowRoot.querySelector(".unarchive-button");
    unarchiveButton.addEventListener("click", () => {
      this._handleUnarchiveNote();
    });
  }

  _addDeleteEventListener() {
    const deleteButton = this.shadowRoot.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      this._handleArchivedDeleteNote();
    });
  }

  _handleUnarchiveNote() {
    const unarchiveEvent = new CustomEvent("unarchive-note", {
      detail: { id: this._note.id },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(unarchiveEvent);
  }
  

  _handleArchivedDeleteNote() {
    const deleteEvent = new CustomEvent("delete-archived-note", { // ganti dengan delete-archived-note
      detail: { id: this._note.id },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(deleteEvent);
  }

  updateStyle() {
    this._style.textContent = `
        :host {
            padding: 1rem 0.8rem;
            display: block;
            border-radius: 4px;
            box-shadow: 0 0 2px 2px black;
            color: #531A1A;
            background-color: #DBA69C;
        }
        .notes-info-title {
            margin-block-start: 0;
            margin-block-end: 1rem;
            font-size: 1.3em;
            font-weight: bold;
        }
        p {
            margin-block-start: 0;
        }
        .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
            gap: 1rem;
        }
        .delete-button,
        .unarchive-button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            color: white;
        }
        .delete-button {
            background-color: #ff4d4d; /* Warna merah */
        }
        .unarchive-button {
            background-color: #4d79ff; /* Warna biru */
        }
        `;
  }

  render() {
    this.updateStyle();

    this.shadowRoot.innerHTML = `
            <style>${this._style.textContent}</style>
            <div class="notes-info" data-aos="fade-up"> 
                <div class="notes-info-title">
                    <h3>${this._note.title}</h3>
                </div>
                <div class="notes-info-body">
                    <h4>${this._note.body}</h4>
                </div>
                <div class="notes-info-createdAt">
                    <p>${this._note.createdAt}</p>
                </div>
            </div>
            <div class="button-container">
                <button class="delete-button">Hapus Catatan</button>
                <button class="unarchive-button">Kembalikan Catatan</button>
            </div>
        `;
  }
}

customElements.define("archived-notes-item", ArchivedNotesItem);
