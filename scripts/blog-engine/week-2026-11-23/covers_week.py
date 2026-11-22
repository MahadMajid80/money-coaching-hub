"""Covers for the week of 23 Nov 2026. Run from the render folder (with node_modules fonts):
   python3 covers_week.py  -> writes {a,b,c,d}-{share,wide}.html, then node render.js
A, D: big question.  B, C: flat faceless illustration (stories)."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import covers as cv
from covers import woman, scene_svg, wide_html
cv.FONTS = cv.FONTS.replace('FONTDIR', 'node_modules')
share_html = cv.share_html

INK, GOLD, YEL, CREAM, GREEN = '#111', '#FAAC15', '#FFD112', '#FDF7E8', '#2F7A4B'

def man(x, y, body="#111", skin="#D9A27A", hair="#2A1E17"):
    return f'''<g transform="translate({x},{y})">
 <path d="M118 450 C118 360 150 320 192 320 C234 320 266 360 266 450 Z" fill="{body}"/>
 <circle cx="190" cy="272" r="40" fill="{skin}"/>
 <path d="M150 262 C150 228 170 216 192 216 C216 216 234 228 232 262 C224 246 210 240 192 240 C174 240 160 246 150 262 Z" fill="{hair}"/>
</g>'''

def basket(x, y, s=1.0):
    # shopping basket full of little "companies" (buildings, coins, leaf)
    items = ''
    cols = [GOLD, CREAM, YEL, GOLD, CREAM, YEL, GOLD]
    for i in range(7):
        bx = 22 + i * 30; h = 40 + (i * 37) % 60
        items += f'<rect x="{bx}" y="{70-h}" width="24" height="{h+10}" rx="3" fill="{cols[i]}" stroke="{INK}" stroke-width="4"/>'
        items += f'<rect x="{bx+7}" y="{78-h}" width="10" height="8" fill="{INK}" opacity=".7"/>'
    return f'''<g transform="translate({x},{y}) scale({s})">
 {items}
 <circle cx="60" cy="20" r="0" fill="none"/>
 <path d="M30 60 C40 -40 210 -40 220 60" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round"/>
 <path d="M0 70 L250 70 L226 190 L24 190 Z" fill="{GOLD}" stroke="{INK}" stroke-width="7" stroke-linejoin="round"/>
 {''.join(f'<path d="M{40+i*42} 88 L{48+i*38} 172" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>' for i in range(5))}
</g>'''

def qmark(x, y, s=1.0, fill=INK):
    return f'<text x="{x}" y="{y}" font-family="R" font-weight="800" font-size="{int(300*s)}" fill="{fill}" text-anchor="middle">?</text>'

# ---------- A: what is an ETF (big question) ----------
SCENE_ETF = f'''
 <circle cx="260" cy="320" r="215" fill="{YEL}" opacity=".45"/>
 {basket(135, 330, 1.0)}
 <!-- small coins flying in -->
 <g><ellipse cx="110" cy="190" rx="30" ry="11" fill="{GOLD}" stroke="{INK}" stroke-width="4"/>
 <ellipse cx="410" cy="170" rx="30" ry="11" fill="{GOLD}" stroke="{INK}" stroke-width="4"/>
 <ellipse cx="420" cy="250" rx="24" ry="9" fill="{CREAM}" stroke="{INK}" stroke-width="4"/></g>
 <path d="M140 210 Q190 260 220 300" fill="none" stroke="{INK}" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>
 <path d="M390 190 Q340 250 320 300" fill="none" stroke="{INK}" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>
 <!-- floor -->
 <rect x="60" y="540" width="400" height="14" rx="7" fill="{INK}"/>
'''
A_ART = f'''<svg viewBox="0 0 520 630" width="520" height="630" xmlns="http://www.w3.org/2000/svg">
 <rect width="520" height="630" fill="{YEL}"/>
 <circle cx="260" cy="230" r="170" fill="{CREAM}" opacity=".7"/>
 {qmark(260, 330, 1.0)}
 {basket(135, 370, 1.0)}
 <rect x="60" y="580" width="400" height="14" rx="7" fill="{INK}"/>
</svg>'''

# ---------- B: property or stocks (illustration) ----------
HOUSE = f'''<g transform="translate(36,120)">
 <path d="M0 80 L80 10 L160 80" fill="none" stroke="{INK}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
 <rect x="18" y="74" width="124" height="104" fill="{CREAM}" stroke="{INK}" stroke-width="6"/>
 <rect x="40" y="96" width="30" height="30" fill="{YEL}" stroke="{INK}" stroke-width="4"/>
 <rect x="92" y="96" width="30" height="30" fill="{YEL}" stroke="{INK}" stroke-width="4"/>
 <rect x="66" y="136" width="28" height="42" fill="{GOLD}" stroke="{INK}" stroke-width="4"/>
</g>'''
CHART = f'''<g transform="translate(330,110)">
 <rect x="0" y="0" width="160" height="190" rx="14" fill="{CREAM}" stroke="{INK}" stroke-width="6"/>
 {''.join(f'<rect x="{22+i*30}" y="{160-h}" width="20" height="{h}" rx="3" fill="{GOLD if i%2 else YEL}" stroke="{INK}" stroke-width="3"/>' for i, h in enumerate([40, 64, 52, 96, 120]))}
 <path d="M22 110 L60 86 L88 98 L118 60 L146 34" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</g>'''
SCALE = f'''<g transform="translate(260,70)">
 <rect x="-6" y="0" width="12" height="40" fill="{INK}"/>
 <circle cx="0" cy="0" r="12" fill="{GOLD}" stroke="{INK}" stroke-width="4"/>
</g>'''
SCENE_PROP = f'''
 <circle cx="260" cy="300" r="215" fill="{YEL}" opacity=".45"/>
 {HOUSE}{CHART}
 <path d="M200 210 Q260 160 320 210" fill="none" stroke="{INK}" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>
 {woman(-40, 100, body=GOLD)}
 {man(130, 96)}
 <rect x="30" y="540" width="460" height="38" rx="16" fill="{INK}"/>
'''

# ---------- C: guilty spending (illustration) ----------
PIGGY = f'''<g transform="translate(250,70)">
 <ellipse cx="120" cy="120" rx="120" ry="96" fill="{GOLD}" stroke="{INK}" stroke-width="7"/>
 <circle cx="232" cy="118" r="30" fill="{GOLD}" stroke="{INK}" stroke-width="7"/>
 <circle cx="226" cy="112" r="5" fill="{INK}"/><circle cx="242" cy="112" r="5" fill="{INK}"/>
 <path d="M70 34 L86 0 L112 30" fill="{GOLD}" stroke="{INK}" stroke-width="7" stroke-linejoin="round"/>
 <rect x="86" y="32" width="64" height="10" rx="5" fill="{INK}"/>
 <rect x="40" y="200" width="30" height="34" rx="6" fill="{INK}"/><rect x="170" y="200" width="30" height="34" rx="6" fill="{INK}"/>
 <circle cx="160" cy="92" r="7" fill="{INK}"/>
 <!-- padlock on the piggy -->
 <g transform="translate(92,104)">
  <path d="M10 22 V12 C10 -2 46 -2 46 12 V22" fill="none" stroke="{INK}" stroke-width="7"/>
  <rect x="0" y="20" width="56" height="44" rx="8" fill="{CREAM}" stroke="{INK}" stroke-width="6"/>
  <circle cx="28" cy="40" r="6" fill="{INK}"/>
 </g>
</g>'''
BAG = f'''<g transform="translate(64,330)">
 <path d="M20 26 C20 4 56 4 56 26" fill="none" stroke="{INK}" stroke-width="6"/>
 <path d="M0 26 L76 26 L70 104 L6 104 Z" fill="{CREAM}" stroke="{INK}" stroke-width="5"/>
 <path d="M38 52 C30 40 16 48 22 60 L38 76 L54 60 C60 48 46 40 38 52 Z" fill="{GOLD}"/>
</g>'''
SCENE_GUILT = f'''
 <circle cx="260" cy="300" r="215" fill="{YEL}" opacity=".45"/>
 {PIGGY}
 {woman(-20, 110, body="#FDF7E8", outline=True)}
 {BAG}
 <!-- price tag -->
 <g transform="translate(70,120) rotate(-14)">
  <path d="M0 0 H76 L100 26 L76 52 H0 Z" fill="{CREAM}" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="80" cy="26" r="6" fill="{INK}"/>
  <rect x="14" y="20" width="44" height="10" rx="5" fill="{GOLD}"/>
 </g>
 <rect x="30" y="560" width="460" height="18" rx="8" fill="{INK}"/>
'''

# ---------- D: MGS or ETFs (big question) ----------
GOV = f'''<g transform="translate(30,150)">
 <path d="M0 60 L100 0 L200 60 Z" fill="{CREAM}" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
 <rect x="0" y="60" width="200" height="16" fill="{INK}"/>
 {''.join(f'<rect x="{16+i*46}" y="82" width="22" height="104" fill="{CREAM}" stroke="{INK}" stroke-width="5"/>' for i in range(4))}
 <rect x="-8" y="186" width="216" height="18" fill="{INK}"/>
 <!-- certificate -->
 <g transform="translate(40,230) rotate(-6)">
  <rect x="0" y="0" width="130" height="86" rx="8" fill="{CREAM}" stroke="{INK}" stroke-width="5"/>
  <rect x="16" y="16" width="70" height="9" rx="4" fill="{INK}"/>
  <rect x="16" y="36" width="98" height="7" rx="3" fill="#BDB6A3"/>
  <rect x="16" y="52" width="80" height="7" rx="3" fill="#BDB6A3"/>
  <circle cx="104" cy="64" r="14" fill="{GOLD}" stroke="{INK}" stroke-width="4"/>
 </g>
</g>'''
SCENE_MGS = f'''
 <circle cx="260" cy="300" r="215" fill="{YEL}" opacity=".45"/>
 {GOV}
 {basket(272, 300, 0.86)}
 <path d="M230 120 Q262 80 300 120" fill="none" stroke="{INK}" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round"/>
 <circle cx="262" cy="150" r="16" fill="{GOLD}" stroke="{INK}" stroke-width="5"/>
 <rect x="30" y="540" width="460" height="14" rx="7" fill="{INK}"/>
'''
D_ART = f'''<svg viewBox="0 0 520 630" width="520" height="630" xmlns="http://www.w3.org/2000/svg">
 <rect width="520" height="630" fill="{YEL}"/>
 <circle cx="380" cy="190" r="125" fill="{CREAM}" opacity=".7"/>
 {qmark(385, 285, 0.85)}
 <g transform="translate(0,40)">{GOV}</g>
 {basket(272, 370, 0.86)}
 <rect x="30" y="590" width="460" height="14" rx="7" fill="{INK}"/>
</svg>'''

pages = {
 'a': (share_html('The Money Coach · Investing', 'What is an ETF?<br><span>A simple explanation</span>', A_ART, YEL), wide_html(SCENE_ETF)),
 'b': (share_html('The Money Coach · Property', 'Property or stocks: <span>where should my money go?</span>', scene_svg(SCENE_PROP)), wide_html(SCENE_PROP)),
 'c': (share_html('The Money Coach · Money mindset', 'I earn well, but I feel <span>guilty spending anything</span>', scene_svg(SCENE_GUILT)), wide_html(SCENE_GUILT)),
 'd': (share_html('The Money Coach · Investing', 'Malta Government Stocks or ETFs: <span>which suits me?</span>', D_ART, YEL), wide_html(SCENE_MGS)),
}
for k, (s, w) in pages.items():
    open(f'{k}-share.html', 'w').write(s)
    open(f'{k}-wide.html', 'w').write(w)
print('ok')
