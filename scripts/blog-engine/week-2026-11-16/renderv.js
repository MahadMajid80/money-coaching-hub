const { chromium } = require('playwright'); const fs=require('fs');
(async () => { const b = await chromium.launch();
 for (const k of fs.readFileSync('v-list.txt','utf8').split('\n')) {
  const p = await b.newPage({ viewport: { width: 1200, height: 1200 } });
  await p.goto('file://' + process.cwd() + `/v-${k}.html`); await p.waitForTimeout(300);
  await (await p.$('#C')).screenshot({ path: `v-${k}.png` }); await p.close(); }
 await b.close(); })();
