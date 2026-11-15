"""In-article visuals for week of 16 Nov. 1200px wide, cream background, brand fonts.
Chart colours validated (dataviz validator): put in #1F7A52, growth #E8930C on #FDF7E8; values directly labelled."""
FONTS = open('gen.py').read().split('FONTS = """')[1].split('"""')[0]
GREEN, GOLD, INK, CREAM, MUTE = '#1F7A52', '#E8930C', '#111111', '#FDF7E8', '#6b6558'

def page(inner, h, foot='Illustration only. Not financial advice.'):
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>{FONTS}
body{{margin:0}}#C{{width:1200px;height:{h}px;background:{CREAM};font-family:L;color:{INK};box-sizing:border-box;padding:56px 64px;position:relative}}
.k{{font-family:R;font-weight:700;font-size:18px;letter-spacing:.14em;text-transform:uppercase;color:#9a6a00}}
h2{{font-family:R;font-weight:800;font-size:40px;line-height:1.12;margin:10px 0 6px}}
.sub{{font-size:22px;color:{MUTE}}}
.foot{{position:absolute;left:64px;right:64px;bottom:34px;font-size:17px;color:{MUTE};display:flex;justify-content:space-between}}
.foot b{{color:{INK}}}
</style></head><body><div id="C">{inner}
<div class="foot"><span>{foot}</span><span><b>Money Coaching Hub</b> · Luca Caruana</span></div></div></body></html>'''

def eur(n): return '€' + f'{round(n):,}'

# A1: stacked bars
def growth_chart():
    data = [('10 years', 12000, 17409), ('20 years', 24000, 52397), ('30 years', 36000, 122709)]
    W, H, x0, y0, top = 1072, 470, 0, 440, 30  # svg coords
    mx = 130000; bw = 190; gap = (W - 3 * bw) / 3
    s = f'<svg width="{W}" height="{H+40}" viewBox="0 0 {W} {H+40}" style="margin-top:24px;overflow:visible">'
    for v in (0, 40000, 80000, 120000):
        y = y0 - v / mx * (y0 - top)
        s += f'<line x1="0" x2="{W}" y1="{y}" y2="{y}" stroke="#e6dcc3" stroke-width="1"/><text x="0" y="{y-8}" font-size="15" fill="{MUTE}">{eur(v)}</text>'
    for i, (lab, put, tot) in enumerate(data):
        x = gap / 2 + i * (bw + gap) + 40
        hp = put / mx * (y0 - top); ht = tot / mx * (y0 - top); hg = ht - hp
        s += f'<rect x="{x}" y="{y0-hp}" width="{bw}" height="{hp}" fill="{GREEN}"/>'
        s += f'<path d="M{x} {y0-hp-2} V{y0-ht+4} q0 -4 4 -4 H{x+bw-4} q4 0 4 4 V{y0-hp-2} Z" fill="{GOLD}"/>'
        s += f'<text x="{x+bw/2}" y="{y0-ht-14}" text-anchor="middle" font-family="R" font-weight="800" font-size="30" fill="{INK}">{eur(tot)}</text>'
        if hp > 34: s += f'<text x="{x+bw/2}" y="{y0-hp/2+7}" text-anchor="middle" font-size="19" font-weight="700" fill="#fff">{eur(put)}</text>'
        if hg > 34: s += f'<text x="{x+bw/2}" y="{y0-hp-hg/2+7}" text-anchor="middle" font-size="19" font-weight="700" fill="{INK}">+{eur(tot-put)}</text>'
        s += f'<text x="{x+bw/2}" y="{y0+32}" text-anchor="middle" font-family="R" font-weight="700" font-size="21" fill="{INK}">{lab}</text>'
    s += f'<line x1="0" x2="{W}" y1="{y0}" y2="{y0}" stroke="{INK}" stroke-width="2"/></svg>'
    legend = f'<div style="display:flex;gap:28px;font-size:20px;margin-top:14px"><span><i style="display:inline-block;width:18px;height:18px;background:{GREEN};border-radius:4px;vertical-align:-3px;margin-right:8px"></i>What you put in</span><span><i style="display:inline-block;width:18px;height:18px;background:{GOLD};border-radius:4px;vertical-align:-3px;margin-right:8px"></i>Growth</span></div>'
    inner = f'<div class="k">€100 a month · 7% a year average</div><h2>Over 30 years, growth overtakes what you put in</h2><div class="sub">More than two thirds of the final amount is growth.</div>{legend}{s}'
    return page(inner, 800)

# A2: fee bars
def fee_chart():
    rows = [('Fund charging 0.2% a year', 117955, GOLD), ('Fund charging 1.5% a year', 91780, '#B7AE98')]
    mx = 125000; W = 1072
    s = ''
    for lab, v, c in rows:
        w = v / mx * (W - 200)
        s += f'''<div style="margin-top:30px"><div style="font-family:R;font-weight:700;font-size:22px;margin-bottom:10px">{lab}</div>
<div style="display:flex;align-items:center;gap:18px"><div style="height:56px;width:{w}px;background:{c};border-radius:0 6px 6px 0"></div>
<span style="font-family:R;font-weight:800;font-size:32px">{eur(v)}</span></div></div>'''
    inner = f'''<div class="k">€100 a month for 30 years · same money in: €36,000</div><h2>A small fee can cost you about €26,000</h2>
<div class="sub">Same investments, same returns before fees. The only difference is the yearly charge.</div>{s}'''
    return page(inner, 530)

# B: worksheet
def worksheet():
    items = ['Home loan or rent', 'Groceries', 'Utilities and bills', 'Insurance', 'Childcare and school costs', 'Loan repayments', 'Transport to work']
    rows = ''.join(f'<tr><td>{x}</td><td class="amt">€</td></tr>' for x in items)
    inner = f'''<div class="k">Worksheet · essentials only</div><h2>How big should your emergency fund be?</h2>
<div class="sub">Fill in what you can't avoid paying each month. Leave out everything else.</div>
<style>table{{width:100%;border-collapse:collapse;margin-top:26px;font-size:24px}}td{{padding:14px 18px;border-bottom:2px solid #e6dcc3}}
td.amt{{width:300px;border-left:2px solid #e6dcc3;color:{MUTE}}}tr.t td{{font-family:R;font-weight:800;background:#fff;border-bottom:0}}
tr.g td{{background:#FFE9A8;font-family:R;font-weight:800;border-bottom:0}}</style>
<table>{rows}<tr class="t"><td>Essential costs a month</td><td class="amt">€</td></tr>
<tr class="g"><td>× 6 months: your first target</td><td class="amt">€</td></tr>
<tr class="g"><td>× 12 months: main earner with dependants</td><td class="amt">€</td></tr></table>'''
    return page(inner, 900, 'Education only. Not financial advice.')

# C: comparison table
def bnpl_table():
    inner = f'''<div class="k">The €2,000 phone</div><h2>Paying in full vs buy now, pay later</h2>
<div class="sub">The same phone, two ways of paying for it.</div>
<style>table{{width:100%;border-collapse:separate;border-spacing:0;margin-top:30px;font-size:25px}}
th{{font-family:R;font-weight:800;font-size:24px;text-align:left;padding:16px 22px}}th.b{{background:{INK};color:{CREAM};border-radius:12px 12px 0 0}}th.a{{background:#fff;border-radius:12px 12px 0 0}}
td{{padding:16px 22px;border-bottom:2px solid #e6dcc3}}td.a{{background:#fff}}td.b{{background:#FFF3CF}}
tr.tot td{{font-family:R;font-weight:800;font-size:28px;border-bottom:0}}</style>
<table><tr><th></th><th class="a">Pay in full</th><th class="b">Buy now, pay later</th></tr>
<tr><td>Price of the phone</td><td class="a">€2,000</td><td class="b">€2,000</td></tr>
<tr><td>Extra cost</td><td class="a">€0</td><td class="b">€565 (about 28%)</td></tr>
<tr><td>Cash left in the bank today</td><td class="a">€0 of the €2,000</td><td class="b">€2,000 kept as a buffer</td></tr>
<tr class="tot"><td>Total you pay</td><td class="a">€2,000</td><td class="b">€2,565</td></tr></table>'''
    return page(inner, 650, 'Example from a reader’s question. Education only.')

# D: checklist
def checklist():
    items = ['Keep only a working balance in the joint account', 'Lower the daily limits on shared accounts and cards',
             "Move the children's savings into an account in your name", 'Keep your own salary in your own account',
             'Turn on notifications for every shared transaction', 'Pause any new loan or big financial commitment']
    lis = ''.join(f'<div style="display:flex;gap:20px;align-items:center;padding:15px 0;border-bottom:2px solid #e6dcc3;font-size:25px"><span style="flex:none;width:34px;height:34px;border:3px solid {INK};border-radius:8px;background:#fff"></span>{x}</div>' for x in items)
    inner = f'''<div class="k">This week</div><h2>Protect what you can control</h2>
<div class="sub">None of this cuts him off. It keeps your family's foundations out of reach.</div><div style="margin-top:20px">{lis}</div>
<div style="margin-top:22px;font-size:21px">Support in Malta: <b>Supportline 179</b> (ask for Sedqa's gambling service, which also helps families).</div>'''
    return page(inner, 780, 'Education only. Not financial or legal advice.')

V = {'a-growth': growth_chart(), 'a-fees': fee_chart(), 'b-worksheet': worksheet(), 'c-table': bnpl_table(), 'd-checklist': checklist()}
for k, v in V.items(): open(f'v-{k}.html', 'w').write(v)
open('v-list.txt', 'w').write('\n'.join(V))
