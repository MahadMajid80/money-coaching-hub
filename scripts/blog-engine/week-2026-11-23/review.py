import base64, html, re, sys
import os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from teasers import TEASERS

C = sys.argv[1].rstrip('/') + '/'  # render folder with the .webp files
W = HERE + '/'
A = [
 ('a', 'Mon 23 Nov', 'What is an ETF? A simple explanation', 'a-what-is-etf.md', '/investment-coaching/what-is-an-etf-simple-explanation/', 'Investing course'),
 ('b', 'Tue 24 Nov', 'Property or stocks: where should my money go?', 'b-property-stocks.md', '/investment-coaching/property-or-stocks-where-should-my-money-go/', 'Investing course'),
 ('c', 'Thu 26 Nov', 'I earn well, but I feel guilty spending anything', 'c-guilty-spending.md', '/money-mindset/earn-well-feel-guilty-spending-money/', 'Coaching'),
 ('d', 'Sat 28 Nov', 'Malta Government Stocks or ETFs: which suits me?', 'd-mgs-etfs.md', '/investment-coaching/malta-government-stocks-or-etfs/', 'Investing course'),
]
def img(p): return 'data:image/webp;base64,' + base64.b64encode(open(p, 'rb').read()).decode()
def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'\*([^*]+)\*', r'<i>\1</i>', s)
    return s
def md(text):
    out, lst = [], None
    for line in text.split('\n'):
        s = line.strip()
        m = re.match(r'^\d+\.\s+(.*)', s)
        if s.startswith('- ') or m:
            tag = 'ul' if s.startswith('- ') else 'ol'
            if lst != tag:
                if lst: out.append(f'</{lst}>')
                out.append(f'<{tag}>'); lst = tag
            out.append(f'<li>{inline(s[2:] if tag == "ul" else m.group(1))}</li>'); continue
        if lst: out.append(f'</{lst}>'); lst = None
        if not s: continue
        mi = re.match(r'^\{\{img:([\w-]+)\|(.*)\}\}$', s)
        if mi: out.append(f'<figure class="inl"><img src="{img(C + "v-" + mi.group(1) + ".webp")}" alt="{html.escape(mi.group(2))}"></figure>'); continue
        if s.startswith('> '): out.append(f'<blockquote>{inline(s[2:])}</blockquote>')
        elif s.startswith('### '): out.append(f'<h4>{inline(s[4:])}</h4>')
        elif s.startswith('## '): out.append(f'<h3>{inline(s[3:])}</h3>')
        else: out.append(f'<p>{inline(s)}</p>')
    if lst: out.append(f'</{lst}>')
    return '\n'.join(out)

cards = ''
for k, day, title, f, url, cta in A:
    body = open(W + f).read()
    words = len(body.split())
    cards += f'''
<section class="art" id="{k}">
 <div class="day">{day} · 07:00</div>
 <h2>{html.escape(title)}</h2>
 <div class="meta">moneycoachinghub.com{url} · about {max(1, round(words/220))} min read · links to: {cta}</div>
 <div class="imgs">
  <figure><img src="{img(C + k + '-wide.webp')}" alt=""><figcaption>Blog image (cards &amp; top of article)</figcaption></figure>
  <figure><img src="{img(C + k + '-share.webp')}" alt=""><figcaption>Share image (LinkedIn, Facebook, WhatsApp previews)</figcaption></figure>
 </div>
 <details class="li" open><summary>LinkedIn post</summary><pre>{html.escape(TEASERS[k])}</pre>
 <p class="hint">First comment: <code>Full article: https://www.moneycoachinghub.com{url}</code></p></details>
 <details class="body"><summary>Read the full article</summary><div class="prose">{md(body)}</div></details>
</section>'''

page = f'''<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Blog week of 23 November</title>
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700;800&family=Lato:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{{--ink:#111;--gold:#FAAC15;--yellow:#FFD112;--cream:#FDF7E8;--mute:#6b6558}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--cream);color:var(--ink);font:16px/1.6 Lato,system-ui,sans-serif}}
header{{background:var(--ink);color:var(--cream);padding:28px 20px 24px}}
header .wrap,main{{max-width:860px;margin:0 auto}}
.kick{{font:700 12px Raleway,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--yellow)}}
h1{{font:800 30px/1.15 Raleway,sans-serif;margin:8px 0 10px}}
header p{{margin:0;color:#d8d2c2}}
.how{{background:#fff;border-left:5px solid var(--gold);padding:14px 18px;margin:22px 20px;border-radius:6px}}
.how b{{font-family:Raleway,system-ui,sans-serif}}
main{{padding:0 20px 60px}}
.art{{background:#fff;border-radius:14px;padding:22px;margin:22px 0;box-shadow:0 1px 0 #e9e1cc}}
.day{{display:inline-block;background:var(--yellow);font:700 12px Raleway,sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:99px}}
h2{{font:800 23px/1.2 Raleway,sans-serif;margin:10px 0 4px}}
.meta{{color:var(--mute);font-size:13px;word-break:break-all}}
.imgs{{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0}}
@media(max-width:620px){{.imgs{{grid-template-columns:1fr}}}}
figure{{margin:0}}figure img{{width:100%;border-radius:8px;display:block;border:1px solid #eee}}
figcaption{{font-size:12px;color:var(--mute);margin-top:4px}}
details{{border-top:1px solid #eee;padding:10px 0}}summary{{cursor:pointer;font:700 15px Raleway,sans-serif}}
pre{{white-space:pre-wrap;font:15px/1.55 Lato,sans-serif;background:var(--cream);padding:14px;border-radius:8px}}
.hint{{font-size:13px;color:var(--mute)}}code{{font-size:12px;word-break:break-all}}
.prose h3{{font:800 19px Raleway,sans-serif;margin:22px 0 6px}}.prose h4{{font:700 16px Raleway,sans-serif;margin:16px 0 4px}}
blockquote{{margin:12px 0;padding:12px 16px;background:var(--cream);border-left:4px solid var(--gold);border-radius:4px}}
a{{color:#9a6a00}}.inl{{margin:16px 0}}.inl img{{width:100%;border-radius:10px;display:block}}
</style></head><body>
<header><div class="wrap"><div class="kick">Money Coaching Hub · Blog</div>
<h1>This week's four articles, ready for your OK</h1>
<p>Monday 23 to Saturday 28 November. Each goes live at 07:00 Malta time on its day. Charts and tables are inside each article: tap Read the full article.</p></div></header>
<div class="how"><b>To approve:</b> merge <a href="https://github.com/luca19900/moneycoachinghub/pull/28">pull request #28 on GitHub</a>. Each article publishes itself at 07:00 on its morning (if you merge after Monday 07:00, Monday's goes live straight away). <b>Want changes?</b> Tell me what to change and I'll update it before you merge.</div>
<main>{cards}</main></body></html>'''
open(sys.argv[2], 'w').write(page)
print(len(page))
