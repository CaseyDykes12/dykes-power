"""Weekly Power Distributors / BASCO inventory import.

Usage:
    python scripts/import-distributor-inventory.py [path-to-xlsx]

If no path is given, scans the user's Downloads folder for the newest file
matching "Available Inventory - Ferris" (the naming Gregory Nielsen uses
when he emails the weekly sheet).

Writes data/distributor-inventory.json, which the PDP buy-box reads via
lib/distributorInventory.ts.
"""

from __future__ import annotations

import json
import os
import re
import sys
import zipfile
from datetime import date
from pathlib import Path
from xml.etree import ElementTree as ET

REPO_ROOT = Path(__file__).resolve().parent.parent
NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"


def find_newest_sheet() -> Path | None:
    downloads = Path.home() / "Downloads"
    if not downloads.exists():
        return None
    matches = [
        p for p in downloads.iterdir()
        if p.suffix.lower() == ".xlsx"
        and re.search(r"available inventory - ferris", p.name, re.IGNORECASE)
    ]
    if not matches:
        return None
    return max(matches, key=lambda p: p.stat().st_mtime)


def parse_xlsx(path: Path) -> list[list[str]]:
    with zipfile.ZipFile(path) as z:
        shared: list[str] = []
        try:
            ss_root = ET.fromstring(z.read("xl/sharedStrings.xml"))
            for si in ss_root.iter(NS + "si"):
                shared.append("".join(t.text or "" for t in si.iter(NS + "t")))
        except KeyError:
            pass

        sheet_root = ET.fromstring(z.read("xl/worksheets/sheet1.xml"))
        rows: list[list[str]] = []
        for row in sheet_root.iter(NS + "row"):
            cells: list[str] = []
            for c in row.iter(NS + "c"):
                v = c.find(NS + "v")
                if v is None:
                    cells.append("")
                    continue
                if c.get("t") == "s":
                    cells.append(shared[int(v.text)])
                elif c.get("t") == "inlineStr":
                    ist = c.find(NS + "is")
                    cells.append(
                        "".join(t.text or "" for t in ist.iter(NS + "t"))
                        if ist is not None else ""
                    )
                else:
                    cells.append(v.text or "")
            rows.append(cells)
        return rows


def as_of_from_filename(path: Path) -> str | None:
    m = re.search(r"(\d{1,2})-(\d{1,2})-(\d{2})", path.name)
    if not m:
        return None
    return f"20{m.group(3)}-{int(m.group(1)):02d}-{int(m.group(2)):02d}"


def find_col(header: list[str], pattern: str) -> int:
    for i, h in enumerate(header):
        if re.search(pattern, h, re.IGNORECASE):
            return i
    return -1


def main() -> int:
    if len(sys.argv) > 1:
        path = Path(sys.argv[1])
    else:
        found = find_newest_sheet()
        if not found:
            print(
                "No xlsx provided and none found in Downloads matching "
                '"Available Inventory - Ferris".',
                file=sys.stderr,
            )
            return 1
        path = found

    if not path.exists():
        print(f"File not found: {path}", file=sys.stderr)
        return 1

    print(f"Importing: {path}")
    rows = parse_xlsx(path)
    if not rows:
        print("Empty sheet.", file=sys.stderr)
        return 1

    header = rows[0]
    sku_col = find_col(header, r"material number")
    desc_col = find_col(header, r"material description")
    today_col = find_col(header, r"available today")
    prod_col = find_col(header, r"current month production")
    eom_col = find_col(header, r"end of month")

    missing = [
        name for name, idx in [
            ("Material Number", sku_col),
            ("Material Description", desc_col),
            ("Available Today Qty", today_col),
            ("Current Month Production", prod_col),
            ("Available End of Month Qty", eom_col),
        ] if idx < 0
    ]
    if missing:
        print(f"Missing columns: {missing}", file=sys.stderr)
        print(f"Header was: {header}", file=sys.stderr)
        return 1

    items: dict[str, dict] = {}
    for r in rows[1:]:
        if len(r) <= max(sku_col, desc_col, today_col, prod_col, eom_col):
            continue
        sku = (r[sku_col] or "").strip()
        if not re.fullmatch(r"\d{6,}", sku):
            continue
        try:
            today = int(round(float(r[today_col] or 0)))
            prod = float(r[prod_col] or 0)
            eom = float(r[eom_col] or 0)
        except ValueError:
            continue
        items[sku] = {
            "description": (r[desc_col] or "").strip(),
            "today": today,
            "productionThisMonth": round(prod, 1),
            "endOfMonth": round(eom, 1),
        }

    payload = {
        "asOfDate": as_of_from_filename(path) or date.today().isoformat(),
        "source": "Power Distributors / Gregory Nielsen (BASCO)",
        "lastUpdated": date.today().isoformat(),
        "items": items,
    }

    target = REPO_ROOT / "data" / "distributor-inventory.json"
    target.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(items)} SKUs to {target}")
    print(f"asOfDate={payload['asOfDate']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
