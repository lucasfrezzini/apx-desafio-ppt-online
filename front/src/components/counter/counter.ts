function changeTime(text: SVGTextElement, count: number) {
  text!.innerHTML = String(--count);
}

class Counter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Styles
    this.shadowRoot!.innerHTML = `
    <style>
      .time__circle {
        width: 300px;
        height: 300px;
      }

      .time__circle text {
        font-size: 50px;
        line-height: 0;
        font-weight: 800;
      }
    </style>
    `;

    // Logic
    this.shadowRoot!.innerHTML += `
    <div class="time__circle">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" xml:space="preserve">
          <circle fill="none" stroke="#000" stroke-width="7" cx="50" cy="50" r="35" stroke-dasharray="360" stroke-linecap="round" transform="rotate(-90 ) translate(-100 0)" >
              <animate attributeName="stroke-dashoffset" values="360;0" dur="5s"></animate>
          </circle>
          <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle">3</text>
      </svg>
    </div>
    `;

    let count: number = 3;
    const time: SVGTextElement = this.shadowRoot!.querySelector("text")!;
    const intervalId = setInterval(() => {
      changeTime(time, count);
      count--;
      if (count == 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
}

customElements.define("counter-time", Counter);
