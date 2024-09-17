class NotesItem extends HTMLElement {
    constructor() {
        super();
        this._note = {
            id: "NEED_ID",
            title: "NEED_TITLE",
            body: "NEED_BODY",
            createdAt: "NEED_CREATED_AT",
        };

        this._style = document.createElement('style');
        this.attachShadow({ mode: 'open' });
    }

    setNote(value) {
        this._note = value;
        this.render();
    }

    connectedCallback() {
        this.render();
        this._addDeleteEventListener();
        this._addArchiveEventListener();
    }

    _addDeleteEventListener() {
        const deleteButton = this.shadowRoot.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            this._handleDeleteNote();
        });
    }

    _addArchiveEventListener() {
        const archiveButton = this.shadowRoot.querySelector('.archive-button');
        archiveButton.addEventListener('click', () => {
            this._handleArchiveNote();
        });
    }

    _handleDeleteNote() {
        const deleteEvent = new CustomEvent('delete-note', {
            detail: { id: this._note.id },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(deleteEvent);
    }

    _handleArchiveNote() {
        const archiveEvent = new CustomEvent('archive-note', {
            detail: { id: this._note.id },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(archiveEvent);
    }

    updateStyle() {
        this._style.textContent = `
        :host {
            padding: 1rem 0.8rem;
            display: block;
            border-radius: 4px;
            box-shadow: 0 0 2px 2px black;
            color: #1A5319;
            background-color: #9CDBA6;
        }
        .notes-info-title {
            margin-block-start: 0;
            margin-block-end: 1rem;
            font-size: 1.3em;
            font-weight: bold;
            word-wrap: break-word; /* Membungkus kata yang panjang */
            overflow-wrap: break-word; /* Membungkus kata yang panjang */
            white-space: normal; /* Mengizinkan teks turun ke bawah */
        }

        .notes-info-body {
            word-wrap: break-word; /* Membungkus kata yang panjang */
            overflow-wrap: break-word; /* Membungkus kata yang panjang */
            white-space: normal; /* Mengizinkan teks turun ke bawah */
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
        .archive-button {
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
        .archive-button {
            background-color: #4d79ff; /* Warna biru */
        }
        ;
    `;
    }

    render() {
        this.updateStyle();

        this.shadowRoot.innerHTML = `
            <style>${this._style.textContent}</style>
            <div class="notes-info"> 
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
                <button class="archive-button">Arsip Catatan</button>
            </div>
        `;
    }
}

customElements.define('notes-item', NotesItem);
