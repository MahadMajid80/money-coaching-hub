const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const k of ['a', 'b', 'c', 'd']) {
    for (const [kind, w, h] of [['share', 1200, 630], ['wide', 1600, 1000]]) {
      const p = await b.newPage({ viewport: { width: w, height: h } });
      await p.goto('file://' + process.cwd() + `/${k}-${kind}.html`);
      await p.waitForTimeout(300);
      await (await p.$('#C')).screenshot({ path: `${k}-${kind}.png` });
      await p.close();
    }
  }
  await b.close();
})();
