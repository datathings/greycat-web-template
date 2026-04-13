import '@greycat/web';
import '@greycat/web/greycat.css';

await gc.sdk.init({ debug: import.meta.env.DEV });

const healthcheck = await gc.healthcheck.get_avg(gc.core.duration.from_mins(5));

document.body.appendChild(
  <main>
    <gui-object value={healthcheck} />
  </main>,
);
