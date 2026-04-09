import "@greycat/web";
import "@greycat/web/greycat.css";
import "./index.css";

const greycat = await gc.sdk.init({ debug: import.meta.env.DEV });

const root = await greycat.root();
const value = (await root["counter::count"].resolve()) ?? 0;

const count = document.createTextNode(`${value}`);

async function inc() {
  const value = await gc.counter.inc();
  count.textContent = `${value}`;
}

async function dec() {
  const value = await gc.counter.dec();
  count.textContent = `${value}`;
}

document.body.appendChild(
  <main>
    <div className="count-value">{count}</div>
    <div className="count-label">Count</div>
    <div className="count-actions">
      <sl-button onclick={dec}>-</sl-button>
      <sl-button onclick={inc}>+</sl-button>
    </div>
  </main>,
);
