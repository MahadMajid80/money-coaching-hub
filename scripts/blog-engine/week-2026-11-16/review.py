import base64, html, re, sys
sys.path.insert(0, '/home/claude/work/blog/w1')
from teasers import TEASERS

C = '/home/claude/work/covers/'
W = '/home/claude/work/blog/w1/'
A = [
 ('a', 'Mon 16 Nov', 'How do I start investing in Malta with €100 a month?', 'a-invest-100.md', '/investment-coaching/start-investing-100-a-month/', 'Investing course'),
 ('b', 'Tue 17 Nov', 'Will AI take my job? How to protect your finances either way', 'b-ai-job.md', '/employee-financial-wellness/will-ai-take-my-job-protect-your-finances/', 'Coaching'),
 ('c', 'Thu 19 Nov', 'Buy now, pay later: convenience or trap?', 'c-bnpl.md', '/smart-financial-choices/buy-now-pay-later-convenience-or-trap/', 'Coaching'),
 ('d', 'Sat 21 Nov', "I found my husband's gambling bets. What now?", 'd-gambling.md', '/family-budgeting/husband-gambling-what-now/', 'Coaching'),
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
<title>Blog week of 16 November: for approval</title>
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
a{{color:#9a6a00}}
</style></head><body>
<header><div class="wrap"><div class="kick">Money Coaching Hub · Blog</div>
<h1>This week's four articles, ready for your OK</h1>
<p>Monday 16 to Saturday 21 November. Each goes live at 07:00 Malta time on its day.</p></div></header>
<div class="how"><b>To approve:</b> merge <a href="https://github.com/luca19900/moneycoachinghub/pull/14">pull request #14 on GitHub</a>. Monday's article goes live as soon as you merge; the other three publish themselves on their mornings. <b>Want changes?</b> Tell me what to change and I'll update it before you merge.</div>
<main>{cards}</main></body></html>'''
open('/home/claude/work/blog/w1/review.html', 'w').write(page)
print(len(page))
