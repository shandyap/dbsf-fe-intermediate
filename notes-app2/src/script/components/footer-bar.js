class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
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
            padding: 24px 20px;
            text-align: center;
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

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div>
            Shandy's Notes App &copy; 2024
        </div>
        `;
  }
}

customElements.define("footer-bar", FooterBar);
