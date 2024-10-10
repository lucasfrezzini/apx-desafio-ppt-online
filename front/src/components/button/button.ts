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
        background-color: var(--color-blue-light);
        border: 5px solid var(--color-blue);
        border-radius: 5px;
        color: white;
        font-size: 28px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2px;
        cursor: pointer;
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
      if (this.hasAttribute("reset")) {
        state.resetGame();
        console.log("Reseteo hecho");
      }
      goTo(this.route);
    });
  }
}

customElements.define("button-el", ButtonEl);
