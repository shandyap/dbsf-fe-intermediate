class ArchivedNotesList extends HTMLElement {
  constructor() {
    super();
    this._archivedNotesList = [];
    this._style = document.createElement("style");
    this.attachShadow({ mode: "open" });
  }

  setArchivedNotesList(value) {
    this._archivedNotesList = value;
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
            .archived-notes-section {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
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
    sectionTitle.textContent = "Archived Notes";

    const archivedNotesSection = document.createElement("div");
    archivedNotesSection.classList.add("archived-notes-section");

    this._archivedNotesList.forEach((item) => {
      const noteElement = document.createElement("archived-notes-item");
      noteElement.setArchivedNote(item);
      archivedNotesSection.appendChild(noteElement);
    });

    this.shadowRoot.append(sectionTitle, archivedNotesSection);
  }
}

customElements.define("archived-notes-list", ArchivedNotesList);
