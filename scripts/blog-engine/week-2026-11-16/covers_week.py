import base64
FONTS = """
@font-face{font-family:R;font-weight:800;src:url(node_modules/@fontsource/raleway/files/raleway-latin-800-normal.woff2)}
@font-face{font-family:R;font-weight:700;src:url(node_modules/@fontsource/raleway/files/raleway-latin-700-normal.woff2)}
@font-face{font-family:L;font-weight:400;src:url(node_modules/@fontsource/lato/files/lato-latin-400-normal.woff2)}
@font-face{font-family:L;font-weight:700;src:url(node_modules/@fontsource/lato/files/lato-latin-700-normal.woff2)}
"""

def woman(x, y, body="#FAAC15", skin="#E9B98F", hair="#3B2A20", outline=False, long_hair=True):
    st = ' stroke="#111" stroke-width="4"' if outline else ''
    lh = f'<path d="M150 270 C142 312 150 334 160 340 L168 284 Z" fill="{hair}"/><path d="M232 270 C240 312 232 334 222 340 L214 284 Z" fill="{hair}"/>' if long_hair else ''
    return f'''<g transform="translate({x},{y})">
 <path d="M122 450 C122 362 152 322 192 322 C232 322 260 362 260 450 Z" fill="{body}"{st}/>
 <circle cx="190" cy="272" r="40" fill="{skin}"/>
 <path d="M148 272 C146 227 172 212 192 212 C222 212 240 232 236 272 C230 254 214 244 192 246 C170 248 156 260 148 284 Z" fill="{hair}"/>
 {lh}</g>'''

def mum(x, y):
    # older woman, grey hair in a bun, arms crossed
    return f'''<g transform="translate({x},{y})">
 <path d="M122 450 C122 362 152 322 192 322 C232 322 260 362 260 450 Z" fill="#FDF7E8" stroke="#111" stroke-width="4"/>
 <circle cx="190" cy="272" r="40" fill="#E2A97E"/>
 <circle cx="192" cy="214" r="18" fill="#9A9A9A"/>
 <path d="M150 268 C148 238 170 228 192 228 C216 228 234 240 232 268 C222 254 208 250 192 250 C176 250 160 256 150 268 Z" fill="#9A9A9A"/>
</g>'''

# ---------- scenes (520 x 630 panel coordinates) ----------
SCENE_AI = f'''
 <circle cx="260" cy="300" r="215" fill="#FFD112" opacity=".45"/>
 <!-- AI chip (top left) -->
 <g transform="translate(62,66)">
  <rect x="14" y="14" width="92" height="92" rx="14" fill="#111"/>
  <rect x="38" y="38" width="44" height="44" rx="6" fill="#FAAC15"/>
  {''.join(f'<rect x="{30+i*22}" y="0" width="8" height="16" rx="3" fill="#111"/><rect x="{30+i*22}" y="104" width="8" height="16" rx="3" fill="#111"/><rect x="0" y="{30+i*22}" width="16" height="8" rx="3" fill="#111"/><rect x="104" y="{30+i*22}" width="16" height="8" rx="3" fill="#111"/>' for i in range(3))}
  <path d="M140 10 l6 14 l14 6 l-14 6 l-6 14 l-6 -14 l-14 -6 l14 -6 Z" fill="#FAAC15"/>
 </g>
 <!-- shield with coin (top right) -->
 <g transform="translate(330,60)">
  <path d="M65 0 L130 22 L130 70 C130 112 100 138 65 152 C30 138 0 112 0 70 L0 22 Z" fill="#FDF7E8" stroke="#111" stroke-width="6"/>
  <circle cx="65" cy="74" r="30" fill="#FAAC15" stroke="#111" stroke-width="5"/>
  <circle cx="65" cy="74" r="17" fill="none" stroke="#111" stroke-width="4"/>
 </g>
 <path d="M190 130 Q260 100 320 130" fill="none" stroke="#111" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>
 {woman(70, 20)}
 <!-- desk + laptop -->
 <rect x="40" y="452" width="440" height="22" rx="8" fill="#111"/>
 <rect x="80" y="474" width="16" height="96" fill="#111"/><rect x="424" y="474" width="16" height="96" fill="#111"/>
 <path d="M196 452 L214 372 L340 372 L358 452 Z" fill="#111"/>
 <circle cx="277" cy="410" r="12" fill="#FAAC15"/>
 <!-- plant -->
 <g transform="translate(392,392)">
  <rect x="0" y="30" width="40" height="30" rx="6" fill="#FAAC15" stroke="#111" stroke-width="4"/>
  <path d="M20 30 C20 10 8 4 0 0 M20 30 C20 8 34 0 44 -4" fill="none" stroke="#2F7A4B" stroke-width="6" stroke-linecap="round"/>
 </g>
'''

SCENE_BNPL = f'''
 <circle cx="260" cy="300" r="215" fill="#FFD112" opacity=".45"/>
 <!-- big phone with pay-in-4 bar -->
 <g transform="translate(176,52)">
  <rect x="0" y="0" width="168" height="282" rx="26" fill="#111"/>
  <rect x="12" y="22" width="144" height="238" rx="12" fill="#FDF7E8"/>
  <rect x="58" y="8" width="52" height="6" rx="3" fill="#444"/>
  <!-- product -->
  <rect x="40" y="44" width="88" height="70" rx="10" fill="#FFD112"/>
  <path d="M62 90 l18 -22 l14 14 l10 -10 l12 18 Z" fill="#111" opacity=".7"/>
  <!-- price lines -->
  <rect x="34" y="130" width="100" height="10" rx="5" fill="#111"/>
  <rect x="34" y="150" width="64" height="8" rx="4" fill="#BDB6A3"/>
  <!-- 4 instalments -->
  <rect x="30" y="178" width="24" height="24" rx="6" fill="#FAAC15" stroke="#111" stroke-width="3"/>
  <rect x="60" y="178" width="24" height="24" rx="6" fill="#FAAC15" stroke="#111" stroke-width="3"/>
  <rect x="90" y="178" width="24" height="24" rx="6" fill="none" stroke="#111" stroke-width="3"/>
  <rect x="120" y="178" width="24" height="24" rx="6" fill="none" stroke="#111" stroke-width="3"/>
  <rect x="30" y="216" width="114" height="28" rx="14" fill="#111"/>
 </g>
 <!-- calendar -->
 <g transform="translate(40,96)">
  <rect x="0" y="12" width="96" height="88" rx="12" fill="#FDF7E8" stroke="#111" stroke-width="5"/>
  <rect x="0" y="12" width="96" height="24" rx="10" fill="#111"/>
  <rect x="18" y="0" width="8" height="22" rx="4" fill="#111"/><rect x="70" y="0" width="8" height="22" rx="4" fill="#111"/>
  {''.join(f'<circle cx="{20+(i%4)*19}" cy="{54+(i//4)*20}" r="5" fill="{"#FAAC15" if i in (1,6) else "#111"}"/>' for i in range(8))}
 </g>
 <!-- shopping bag -->
 <g transform="translate(392,110)">
  <path d="M24 28 C24 4 64 4 64 28" fill="none" stroke="#111" stroke-width="6"/>
  <path d="M0 28 L88 28 L80 112 L8 112 Z" fill="#FAAC15" stroke="#111" stroke-width="5"/>
 </g>
 <!-- daughter (left) and mum (right) -->
 {woman(-50, 120, body="#FAAC15")}
 {mum(185, 120)}
 <!-- sofa -->
 <rect x="40" y="540" width="440" height="40" rx="18" fill="#111"/>
'''

SCENE_GAMBLE = f'''
 <circle cx="260" cy="300" r="215" fill="#FFD112" opacity=".45"/>
 <!-- statement with highlighted lines -->
 <g transform="translate(300,56) rotate(6)">
  <rect x="0" y="0" width="150" height="196" rx="10" fill="#FDF7E8" stroke="#111" stroke-width="5"/>
  <rect x="18" y="20" width="70" height="10" rx="5" fill="#111"/>
  {''.join(f'<rect x="18" y="{48+i*22}" width="{114 if i%2 else 96}" height="8" rx="4" fill="#BDB6A3"/>' for i in range(6))}
  <rect x="12" y="88" width="126" height="18" rx="6" fill="#FAAC15" opacity=".85"/>
  <rect x="12" y="132" width="126" height="18" rx="6" fill="#FAAC15" opacity=".85"/>
 </g>
 <!-- magnifier -->
 <g transform="translate(262,198)">
  <circle cx="40" cy="40" r="34" fill="none" stroke="#111" stroke-width="9"/>
  <path d="M64 64 L96 96" stroke="#111" stroke-width="13" stroke-linecap="round"/>
 </g>
 <!-- card with padlock -->
 <g transform="translate(58,92) rotate(-8)">
  <rect x="0" y="0" width="150" height="96" rx="12" fill="#111"/>
  <rect x="0" y="22" width="150" height="16" fill="#FAAC15"/>
  <rect x="16" y="60" width="44" height="10" rx="5" fill="#FDF7E8"/>
  <g transform="translate(96,46)">
   <path d="M10 22 V12 C10 0 38 0 38 12 V22" fill="none" stroke="#FDF7E8" stroke-width="6"/>
   <rect x="2" y="20" width="44" height="34" rx="6" fill="#FFD112" stroke="#FDF7E8" stroke-width="3"/>
  </g>
 </g>
 {woman(70, 60)}
 <!-- table -->
 <rect x="30" y="492" width="460" height="22" rx="8" fill="#111"/>
 <rect x="70" y="514" width="16" height="70" fill="#111"/><rect x="434" y="514" width="16" height="70" fill="#111"/>
 <!-- papers on table -->
 <rect x="150" y="474" width="110" height="18" rx="3" fill="#FDF7E8" stroke="#111" stroke-width="4" transform="rotate(-3 205 483)"/>
 <!-- mug -->
 <g transform="translate(330,446)">
  <rect x="0" y="0" width="40" height="46" rx="6" fill="#FAAC15" stroke="#111" stroke-width="4"/>
  <path d="M40 12 C56 12 56 34 40 34" fill="none" stroke="#111" stroke-width="4"/>
 </g>
'''

def scene_svg(scene, w=520, h=630):
    return f'<svg viewBox="0 0 520 630" width="{w}" height="{h}" xmlns="http://www.w3.org/2000/svg">{scene}</svg>'

def share_html(tag, title_html, art_html, art_bg="#FDF7E8"):
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>{FONTS}
body{{margin:0}}
.c{{width:1200px;height:630px;display:grid;grid-template-columns:1fr 520px;background:#111;overflow:hidden;font-family:L}}
.txt{{padding:60px 40px 56px 72px;display:flex;flex-direction:column;justify-content:space-between;color:#FDF7E8}}
.tag{{font-family:R;font-weight:700;font-size:19px;letter-spacing:.16em;text-transform:uppercase;color:#FFD112}}
h1{{font-family:R;font-weight:800;font-size:56px;line-height:1.07;letter-spacing:-.015em;margin:0}}
h1 span{{color:#FAAC15}}
.by{{font-size:22px;color:#C9C3B1}}.by b{{color:#FDF7E8}}
.art{{background:{art_bg};overflow:hidden;position:relative}}
</style></head><body><div class="c" id="C">
<div class="txt"><span class="tag">{tag}</span><h1>{title_html}</h1>
<span class="by"><b>Luca Caruana</b> · Certified Money Coach</span></div>
<div class="art">{art_html}</div></div></body></html>'''

def wide_html(scene):
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>body{{margin:0}}#C{{width:1600px;height:1000px;display:block}}</style></head><body>
<svg id="C" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
 <rect width="1600" height="1000" fill="#FDF7E8"/>
 <circle cx="1380" cy="140" r="260" fill="#FFD112" opacity=".25"/>
 <circle cx="180" cy="900" r="220" fill="#FAAC15" opacity=".14"/>
 <g transform="translate(397,40) scale(1.55)">{scene}</g>
</svg></body></html>'''

# ---------- A: photo cover (guide) ----------
luca = 'data:image/png;base64,' + base64.b64encode(open('luca.png','rb').read()).decode()
def coins(x, y, n, w=70):
    out = ''
    for i in range(n):
        yy = y - i*16
        out += f'<ellipse cx="{x}" cy="{yy}" rx="{w/2}" ry="11" fill="#FAAC15" stroke="#111" stroke-width="4"/>'
    return out
def growth_graphic(ox, oy, s=1.0):
    stacks = ''.join(coins(60+i*95, 360, n) for i, n in enumerate([2, 4, 7, 11, 16]))
    return f'''<g transform="translate({ox},{oy}) scale({s})">
 <path d="M30 380 H500" stroke="#111" stroke-width="6" stroke-linecap="round"/>
 {stacks}
 <path d="M40 300 C160 290 300 230 440 70" fill="none" stroke="#111" stroke-width="7" stroke-linecap="round" stroke-dasharray="4 14"/>
 <path d="M412 72 L444 64 L446 98" fill="none" stroke="#111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
 <g transform="translate(440,80)">
  <path d="M0 22 C0 0 -18 -8 -30 -10 M0 22 C0 -2 18 -12 32 -14" fill="none" stroke="#2F7A4B" stroke-width="7" stroke-linecap="round"/>
 </g>
</g>'''

A_WIDE = f'''<!doctype html><html><head><meta charset="utf-8"><style>body{{margin:0}}#C{{width:1600px;height:1000px;display:block}}</style></head><body>
<svg id="C" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
 <rect width="1600" height="1000" fill="#FFD112"/>
 <circle cx="330" cy="520" r="290" fill="#FDF7E8" opacity=".6"/>
 {growth_graphic(70, 300, 1.0)}
 <image href="{luca}" x="640" y="40" width="960" height="960"/>
</svg></body></html>'''
A_ART = f'<svg viewBox="0 0 520 630" width="520" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="520" height="630" fill="#FFD112"/><image href="{luca}" x="-60" y="10" width="620" height="620"/></svg>'

# ---------- C: big question share (text-free wide uses scene) ----------
pages = {
 'a': (share_html('The Money Coach · Investing', 'How do I start investing <span>with €100 a month?</span>', A_ART, '#FFD112'), A_WIDE),
 'b': (share_html('The Money Coach · Career &amp; income', 'Will AI take my job? <span>Protect your finances either way</span>', scene_svg(SCENE_AI)), wide_html(SCENE_AI)),
 'c': (share_html('The Money Coach · Spending &amp; debt', 'Buy now, pay later: <span>convenience or trap?</span>', scene_svg(SCENE_BNPL)), wide_html(SCENE_BNPL)),
 'd': (share_html('The Money Coach · Couples &amp; money', 'I found my husband’s gambling bets. <span>What now?</span>', scene_svg(SCENE_GAMBLE)), wide_html(SCENE_GAMBLE)),
}
for k, (s, w) in pages.items():
    open(f'{k}-share.html', 'w').write(s)
    open(f'{k}-wide.html', 'w').write(w)
print('ok')
