import json, re, sys

def t(s, fmt=0): return {"type": "text", "text": s, "format": fmt, "detail": 0, "mode": "normal", "style": "", "version": 1}

TOK = re.compile(r'(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)')

def runs(s, basefmt=0):
    out = []
    for part in TOK.split(s):
        if not part: continue
        if part.startswith('['):
            label, url = re.match(r'\[([^\]]+)\]\(([^)]+)\)', part).groups()
            ext = url.startswith('http')
            out.append({"type": "link", "fields": {"linkType": "custom", "url": url, "newTab": ext},
                        "format": "", "indent": 0, "version": 3, "direction": "ltr",
                        "children": runs(label, basefmt | (0 if ext else 1))})
        elif part.startswith('**'): out.append(t(part[2:-2], basefmt | 1))
        elif part.startswith('*'): out.append(t(part[1:-1], basefmt | 2))
        else: out.append(t(part, basefmt))
    return out

def base(typ, children, **kw):
    d = {"type": typ, "format": "", "indent": 0, "version": 1, "direction": "ltr", "children": children}; d.update(kw); return d

def para(s):
    fmt = 0
    if s.startswith('*') and s.endswith('*') and not s.startswith('**'):
        s, fmt = s[1:-1], 2
    return base("paragraph", runs(s, fmt), textFormat=fmt, textStyle="")

def convert(md):
    nodes, lst, kind = [], [], None
    def flush():
        nonlocal lst, kind
        if lst:
            tag = 'ol' if kind == 'number' else 'ul'
            nodes.append(base("list", [base("listitem", runs(x), value=i + 1) for i, x in enumerate(lst)], listType=kind, start=1, tag=tag))
        lst, kind = [], None
    for line in md.split('\n'):
        s = line.strip()
        m = re.match(r'^(\d+)\.\s+(.*)', s)
        if s.startswith('- '):
            if kind not in (None, 'bullet'): flush()
            kind = 'bullet'; lst.append(s[2:]); continue
        if m:
            if kind not in (None, 'number'): flush()
            kind = 'number'; lst.append(m.group(2)); continue
        flush()
        if not s: continue
        mi = re.match(r'^\{\{img:([\w-]+)\|(.*)\}\}$', s)
        if mi:
            nodes.append({"type": "upload", "version": 3, "format": "", "id": "img" + re.sub(r'[^a-z0-9]', '', mi.group(1)),
                          "fields": None, "relationTo": "media", "value": "__IMG_" + mi.group(1) + "__"}); continue
        if s.startswith('> '): nodes.append(base("quote", runs(s[2:])))
        elif s.startswith('### '): nodes.append(base("heading", runs(s[4:]), tag='h3'))
        elif s.startswith('## '): nodes.append(base("heading", runs(s[3:]), tag='h2'))
        else: nodes.append(para(s))
    flush()
    return {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "direction": "ltr", "children": nodes}}

def words(md): return len(re.sub(r'[#>*\[\]()\-]', ' ', md).split())

if __name__ == '__main__':
    md = open(sys.argv[1]).read()
    print(json.dumps(convert(md), ensure_ascii=False))
