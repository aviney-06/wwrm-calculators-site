#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src/components/Maths"
TAG = "motion"

def fix(s: str) -> str:
    return s.replace(TAG, "motion").replace("motion", "div")

def w(rel: str, content: str) -> None:
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(fix(content), encoding="utf-8")

# Fix function is wrong - let me simplify
def w2(rel: str, content: str) -> None:
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content.replace("motion", "motion").replace("motion", "div"), encoding="utf-8")
