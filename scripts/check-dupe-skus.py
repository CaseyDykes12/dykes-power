import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
src = open("lib/products.ts", encoding="utf-8").read()
si = src.index("export const products: Product[]")
ast = src.index("=", si)
ast = src.index("[", ast)
depth, ae, in_str = 0, -1, False
for i in range(ast, len(src)):
    c = src[i]
    prev = src[i - 1] if i > 0 else ""
    if c == '"' and prev != "\\":
        in_str = not in_str
    if in_str:
        continue
    if c == "[":
        depth += 1
    elif c == "]":
        depth -= 1
        if depth == 0:
            ae = i
            break
prods = json.loads(src[ast:ae + 1])
seen = {}
for p in prods:
    seen.setdefault(p["sku"], []).append(p["name"])
dupes = {k: v for k, v in seen.items() if len(v) > 1}
print(f"Duplicate parent SKUs: {len(dupes)}")
for k, v in dupes.items():
    print(f"  {k}: {v}")
print(f"Total products: {len(prods)}")
