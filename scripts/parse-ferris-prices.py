#!/usr/bin/env python3
"""
Parses 2026 FERRIS ALL PRICES.pdf -> { sku, msrp, map, raw, model_family,
deck, engine, hp }.
Disregards BASE/SELECT/PREFERRED/PREMIER dealer-cost columns.
"""
import pdfplumber, json, re, sys, io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

PDF = Path(r"C:\Users\Cdyke\OneDrive\Documents\Dykes Power Equipment\2026 FERRIS ALL PRICES.pdf")
OUT = Path(__file__).parent / "ferris-prices-2026-clean.json"

ROW_RE = re.compile(r"^(?P<sku>\d{7})\b[^$]*\$(?P<msrp>[\d,]+)\s+\$(?P<mapp>[\d,]+)")

DECK_RE = re.compile(r"\b(32|36|42|48|52|60|61|72)\b")
ENGINE_RE = re.compile(
    r"\b(B23|B25|B27|K19|K21\.5|K23|K24|V18|V23|V25|Y23|C48|GX200)\b"
)
HP_RE = re.compile(r"\b(\d{2}(?:\.\d)?)\s*HP\b", re.I)


def to_int(s):
    return int(s.replace(",", ""))


def family_from_line(line):
    L = line.upper()
    families = [
        ("ISX 3300", r"ISX[^0-9A-Z]*3300|\bISX3300\b"),
        ("ISX 2200", r"ISX[^0-9A-Z]*2200|\bISX2200\b"),
        ("ISX 800", r"ISX[^0-9A-Z]*800|\bISX800\b"),
        ("IS 6200", r"IS[^0-9A-Z]*6200|\bIS6200\b"),
        ("IS 2600", r"IS[^0-9A-Z]*2600|\bIS2600\b"),
        ("IS 700", r"IS[^0-9A-Z]*700|\bIS700\b"),
        ("IS 600", r"IS[^0-9A-Z]*600|\bIS600\b"),
        ("SRS Z3X", r"SRS[^Z]*Z3X|\bZ3X\b"),
        ("SRS Z2", r"SRS[^Z]*Z2\b|\bZ2,"),
        ("SRS Z1", r"SRS[^Z]*Z1|\bZ1,"),
        ("300R", r"\b300R\b"),
        ("300S", r"\b300S\b"),
        ("500S", r"\b500S\b"),
        ("F60", r"\bF60\b"),
        ("FW15", r"\bFW15\b"),
        ("FW25", r"\bFW25\b"),
        ("FW45", r"\bFW45\b"),
        ("FB1000", r"\bFB1000\b"),
        ("FB2000", r"\bFB2000\b"),
        ("FB3000", r"\bFB3000\b"),
        ("ProCut S", r"\bPROCUT\b"),
        ("Venture", r"\bVENTURE\b"),
        ("Pathfinder XC", r"\bPATHFINDER\s*XC\b|\bPATHFINDER\W+XC\b"),
        ("Pathfinder", r"\bPATHFINDER\b"),
        ("Rover XC", r"\bROVER\s*XC\b|\bROVER\W+XC\b"),
        ("Rover", r"\bROVER\b"),
    ]
    for fam, pat in families:
        if re.search(pat, L):
            return fam
    return None


def parse():
    out = []
    with pdfplumber.open(PDF) as pdf:
        # Track "last family seen" header for rows lacking explicit family
        current_family = None
        for page in pdf.pages:
            text = page.extract_text() or ""
            for line in text.splitlines():
                # Update current_family if line looks like a section heading
                fam_in_line = family_from_line(line)
                if fam_in_line and not ROW_RE.match(line):
                    current_family = fam_in_line
                m = ROW_RE.match(line)
                if not m:
                    continue
                row_family = family_from_line(line) or current_family
                deck = (DECK_RE.search(line) or [None])
                deck_val = deck.group(1) if hasattr(deck, "group") else None
                engine = (ENGINE_RE.search(line) or [None])
                engine_val = engine.group(1) if hasattr(engine, "group") else None
                hp = (HP_RE.search(line) or [None])
                hp_val = hp.group(1) if hasattr(hp, "group") else None
                out.append({
                    "sku": m.group("sku"),
                    "msrp": to_int(m.group("msrp")),
                    "map": to_int(m.group("mapp")),
                    "model_family": row_family,
                    "deck": deck_val,
                    "engine": engine_val,
                    "hp": hp_val,
                    "raw": line.strip(),
                })
    return out


def main():
    rows = parse()
    print(f"Parsed {len(rows)} rows.")
    seen = {}
    for r in rows:
        seen.setdefault(r["sku"], r)
    unique = list(seen.values())
    print(f"{len(unique)} unique SKUs.")
    OUT.write_text(json.dumps(unique, indent=2), encoding="utf-8")
    print(f"Wrote {OUT}")
    # Family breakdown
    fam_counts = {}
    for r in unique:
        fam_counts[r["model_family"]] = fam_counts.get(r["model_family"], 0) + 1
    print("\nBy family:")
    for f in sorted(fam_counts, key=lambda x: (x is None, x or "")):
        print(f"  {f}: {fam_counts[f]}")


if __name__ == "__main__":
    main()
