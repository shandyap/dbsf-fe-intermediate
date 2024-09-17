class HeaderBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" }); // Perbaiki mode
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
            display: block;
            width: 100%;
            color: #1A5319;
            background-color: #9CDBA6;
        }
        div {
            padding: 12px;
        }
        .header-name {
            margin: 0;
            font-size: 1.7em;
        }
        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style); // Menggunakan _style
    this._shadowRoot.innerHTML += `
        <div>
            <h1 class="header-title">Shandy's Notes App</h1> <!-- Perbaiki penutupan tag -->
        </div>`;
  }
}

customElements.define("header-bar", HeaderBar);
