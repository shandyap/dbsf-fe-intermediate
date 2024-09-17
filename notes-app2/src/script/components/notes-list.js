class NoteList extends HTMLElement {
  constructor() {
    super();
    this._notesList = [];
    this._style = document.createElement("style");
    this.attachShadow({ mode: "open" });
  }

  setNotesList(value) {
    this._notesList = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display: block;
            }
            .notes-section {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }
            .section-title {
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 1rem;
            }
            hr {
                border: none;
                height: 2px;
                background-color: #ccc;
                margin: 2rem 0;
            }
        `;
  }

  render() {
    this._updateStyle();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(this._style);

    const sectionTitle = document.createElement("div");
    sectionTitle.classList.add("section-title");
    sectionTitle.textContent = "Notes";

    const notesSection = document.createElement("div");
    notesSection.classList.add("notes-section");

    this._notesList.forEach((item) => {
      const noteElement = document.createElement("notes-item");
      noteElement.setNote(item);
      notesSection.appendChild(noteElement);
    });

    this.shadowRoot.append(sectionTitle, notesSection);
  }
}

customElements.define("note-list", NoteList);
