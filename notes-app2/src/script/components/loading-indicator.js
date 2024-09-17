class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement("style");
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._render();
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        :host([active]) {
            visibility: visible;
            opacity: 1;
        }

        .loader {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        `;
  }

  _render() {
    this._updateStyle();

    this.shadowRoot.innerHTML = `
            <style>${this._style.textContent}</style>
            <div class="loader"></div>
        `;
  }

  show() {
    this.setAttribute("active", "");
  }

  hide() {
    this.removeAttribute("active");
  }
}

customElements.define("loading-indicator", LoadingIndicator);
