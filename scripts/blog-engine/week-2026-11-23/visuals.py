"""In-article visuals for week of 23 Nov 2026. 1200px wide, cream background, brand fonts.
Same chart colours as week-2026-11-16 (validated): #1F7A52 green, #E8930C gold on #FDF7E8; values labelled directly.
Run from the render folder: python3 visuals.py && node renderv.js"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import covers as cv
FONTS = cv.FONTS.replace('FONTDIR', 'node_modules')
GREEN, GOLD, INK, CREAM, MUTE = '#1F7A52', '#E8930C', '#111111', '#FDF7E8', '#6b6558'

def page(inner, h, foot='Education only. Not financial advice.'):
    return f'''<!doctype html><html><head><meta charset="utf-8"><style>{FONTS}
body{{margin:0}}#C{{width:1200px;height:{h}px;background:{CREAM};font-family:L;color:{INK};box-sizing:border-box;padding:56px 64px;position:relative}}
.k{{font-family:R;font-weight:700;font-size:18px;letter-spacing:.14em;text-transform:uppercase;color:#9a6a00}}
h2{{font-family:R;font-weight:800;font-size:40px;line-height:1.12;margin:10px 0 6px}}
.sub{{font-size:22px;color:{MUTE}}}
.foot{{position:absolute;left:64px;right:64px;bottom:34px;font-size:17px;color:{MUTE};display:flex;justify-content:space-between}}
.foot b{{color:{INK}}}
table{{width:100%;border-collapse:separate;border-spacing:0;margin-top:28px;font-size:22px;line-height:1.35}}
th{{font-family:R;font-weight:800;font-size:23px;text-align:left;padding:16px 20px}}th.b{{background:{INK};color:{CREAM};border-radius:12px 12px 0 0}}th.a{{background:#fff;border-radius:12px 12px 0 0}}
td{{padding:14px 20px;border-bottom:2px solid #e6dcc3;vertical-align:top}}td.l{{font-family:R;font-weight:700;width:230px}}td.a{{background:#fff}}td.b{{background:#FFF3CF}}
</style></head><body><div id="C">{inner}
<div class="foot"><span>{foot}</span><span><b>Money Coaching Hub</b> · Luca Caruana</span></div></div></body></html>'''

# A: top 10 share of the S&P 500 (March 2026, 37.34%)
def top10():
    top, rest = 37.34, 100 - 37.34
    W = 1072
    wt = W * top / 100
    bar = f'''<div style="display:flex;height:120px;margin-top:44px;border-radius:10px;overflow:hidden">
<div style="width:{wt}px;background:{GOLD};display:flex;align-items:center;justify-content:center;font-family:R;font-weight:800;font-size:40px">{top:.0f}%</div>
<div style="flex:1;background:{GREEN};display:flex;align-items:center;justify-content:center;font-family:R;font-weight:800;font-size:40px;color:#fff">{rest:.0f}%</div></div>
<div style="display:flex;margin-top:14px;font-size:23px"><div style="width:{wt}px"><b>The 10 largest companies</b></div><div style="flex:1;padding-left:16px"><b>The other 490 companies</b></div></div>'''
    eg = f'''<div style="margin-top:46px;background:#fff;border-radius:12px;padding:22px 26px;font-size:24px">Put <b>€100</b> into an S&amp;P 500 ETF and roughly <b>€37</b> goes into just 10 companies.</div>'''
    inner = f'<div class="k">S&amp;P 500 · March 2026</div><h2>500 companies, but 10 carry over a third of the weight</h2><div class="sub">Share of the index held by its 10 largest companies.</div>{bar}{eg}'
    return page(inner, 590, 'Source: index weights compiled from tracking data, March 2026. Weights change over time.')

# B: property vs share fund
def prop_compare():
    rows = [('Money to start', 'About €200,000 plus 5% stamp duty and fees', 'Can start from small monthly amounts'),
            ('Income', 'Rent every month (taxed)', 'Dividends, or reinvested for growth'),
            ('Spread', 'One building, in one country', 'Many companies and countries'),
            ('Selling', 'Slow and costly: months, fees, tax', 'Usually within days'),
            ('Your time', 'Tenants, repairs, empty months', 'Very little'),
            ('Ups and downs', 'Prices move slowly, out of sight', 'Value moves every day, sometimes a lot')]
    body = ''.join(f'<tr><td class="l">{l}</td><td class="a">{a}</td><td class="b">{b}</td></tr>' for l, a, b in rows)
    inner = f'''<div class="k">Property or stocks</div><h2>They do different jobs</h2><div class="sub">A Malta rental apartment compared with a low-cost share fund (ETF).</div>
<table><tr><th></th><th class="a">Rental apartment</th><th class="b">Share fund (ETF)</th></tr>{body}</table>'''
    return page(inner, 790, 'General comparison. Education only, not financial advice.')

# C: worksheet
def worksheet():
    box = lambda t, s, c: f'<div style="flex:1;background:#fff;border-radius:12px;padding:20px 22px;border-top:8px solid {c}"><div style="font-family:R;font-weight:800;font-size:27px">{t}</div><div style="font-size:19px;color:{MUTE};margin:6px 0 22px;min-height:52px">{s}</div><div style="font-size:24px;border-bottom:2px solid #e6dcc3;padding-bottom:6px">€ ______ a month</div></div>'
    boxes = f'''<div style="display:flex;gap:18px;margin-top:30px">{box('1. Safety', 'Emergency fund: a few months of essential costs', GREEN)}
{box('2. Future', 'Pension and investments, set aside automatically', '#2B5F8A')}{box('3. Life now', 'Yours to spend, guilt-free. No explaining.', GOLD)}</div>'''
    eg = f'''<div style="margin-top:28px;background:#FFE9A8;border-radius:12px;padding:20px 26px;font-size:23px"><b style="font-family:R">Example:</b> take-home pay €4,000 a month × 5% for "life now" = <b>€200 a month</b>, or <b>€2,400 a year</b>, to enjoy.</div>
<div style="margin-top:22px;font-size:22px">My "enough" number: € ____________ &nbsp;&nbsp; What it pays for: ______________________</div>'''
    inner = f'<div class="k">Worksheet</div><h2>Give every euro a job</h2><div class="sub">Fill in safety and future first. Whatever you put in "life now" is part of the plan.</div>{boxes}{eg}'
    return page(inner, 690, 'Example only. Choose the percentage that suits you.')

# D: MGS vs ETF
def mgs_compare():
    rows = [('What it is', 'A loan to the Government of Malta', 'A basket of thousands of shares'),
            ('Income', 'Fixed interest twice a year (recent issues 3.80% to 4.50%)', 'No fixed income; value can grow'),
            ('At the end', 'Your €100 per unit back at maturity', 'No end date'),
            ('Ups and downs', 'Small if held to maturity; price moves if you sell early', 'Value moves every day; falls of 20%+ have happened'),
            ('Spread', 'One issuer', 'Many companies and countries'),
            ('Best for', 'Steady income, money needed sooner', 'Money you can leave 10+ years')]
    body = ''.join(f'<tr><td class="l">{l}</td><td class="a">{a}</td><td class="b">{b}</td></tr>' for l, a, b in rows)
    inner = f'''<div class="k">Malta Government Stocks or ETFs</div><h2>Stability and income, or long-term growth</h2><div class="sub">Many people hold both: MGS as the foundations, ETFs as the extension.</div>
<table><tr><th></th><th class="a">Malta Government Stock</th><th class="b">World share ETF</th></tr>{body}</table>'''
    return page(inner, 820, 'Rates: MGS issues of Aug and Oct 2026. Rates change with every issue. Education only.')

V = {'a-top10': top10(), 'b-compare': prop_compare(), 'c-worksheet': worksheet(), 'd-compare': mgs_compare()}
for k, v in V.items(): open(f'v-{k}.html', 'w').write(v)
open('v-list.txt', 'w').write('\n'.join(V))
print('ok')
