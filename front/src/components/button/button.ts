import { goTo } from "@/router/router";
import { state } from "@/state/state";

class ButtonEl extends HTMLElement {
  route: string;

  constructor() {
    super();
    this.route = this.getAttribute("to")!;
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Styles
    this.shadowRoot!.innerHTML = `
    <style>
      button {
        font-family: "Dosis", sans-serif;
        width: 100%;
        padding: 10px;
        background-image: linear-gradient(rgb(255, 39, 204) 0%, rgb(255, 0, 174) 100%);
        border: 5px solid var(--color-primary);
        border-radius: 5px;
        color: white;
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        cursor: pointer;
        margin-bottom: 20px;
      }

      button:hover {
        background-image: linear-gradient(rgb(255, 0, 174) 0%, rgb(223, 0, 140) 100%);
      }
    </style>
    `;
    // Logic HTML and JS
    this.shadowRoot!.innerHTML += `
    <button>
      <slot></slot>
    </button>
    `;

    this.shadowRoot!.addEventListener("click", () => {
      goTo(this.route);
    });
  }
}

customElements.define("button-el", ButtonEl);
