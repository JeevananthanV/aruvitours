#!/usr/bin/env python3
"""
Aruvi Tours image migration script.
Phases: rename folders -> rename files -> replace Unsplash URLs -> update source code.
"""

from __future__ import annotations

import json
import os
import re
import shutil
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"
SRC = ROOT / "src"
REFS_JSON = ROOT / "image_refs_full.json"
LOG_JSON = ROOT / "image_migration_log.json"

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"}

# ---------------------------------------------------------------------------
# Folder rename map (old name as referenced in code or on disk -> SEO slug)
# ---------------------------------------------------------------------------
FOLDER_RENAMES = {
    "About": "about",
    "Andaman": "andaman",
    "Assam": "assam",
    "Bali": "bali",
    "Bhutan": "bhutan",
    "Brunei": "brunei",
    "Cambodia": "cambodia",
    "China": "china",
    "Dubai": "dubai",
    "Egypt": "egypt",
    "Gujarat": "gujarat",
    "Himachal Pradesh": "himachal-pradesh",
    "HongKongmacau": "hong-kong-macau",
    "Japan": "japan",
    "Kashmir": "kashmir",
    "Kenya": "kenya",
    "Ladakh": "ladakh",
    "Lakshadweep": "lakshadweep",
    "Maldives": "maldives",
    "Meghalaya": "meghalaya",
    "Odisha": "odisha",
    "Philippines": "philippines",
    "Rajasthan": "rajasthan",
    "Russia": "russia",
    "Sikkim": "sikkim",
    "Thailand": "thailand",
    "Turkey": "turkey",
    "Vietnam": "vietnam",
    "golden_triangle": "golden-triangle",
    "Arunachal Pradesh": "arunachal-pradesh",
}

# Manual SEO names when alt text is empty
ANDAMAN_FILE_NAMES = {
    "sea.jpg": "andaman-crystal-clear-sea.jpg",
    "sunset.jpg": "andaman-sunset-beach.jpg",
    "ross.jpg": "andaman-ross-island.jpg",
    "bg4.jpg": "andaman-radha-nagar-beach.jpg",
    "bg1.avif": "andaman-hero-backwaters.avif",
    "baratang.jpg": "andaman-baratang-limestone-caves.jpg",
    "villa.jpg": "andaman-beach-villa.jpg",
    "beach.avif": "andaman-tropical-beach.avif",
    "cove.jpg": "andaman-hidden-cove.jpg",
    "eve.jpg": "andaman-evening-sky.jpg",
    "reef.jpg": "andaman-coral-reef.jpg",
    "port.jpg": "andaman-port-blair-harbour.jpg",
}

CHINA_FILE_NAMES = {
    "greatwall.webp": "china-great-wall.webp",
    "view.webp": "china-panoramic-view.webp",
    "shanghai.webp": "china-shanghai-skyline.webp",
    "beijing.jpg": "china-beijing-forbidden-city.jpg",
    "chengdu.webp": "china-chengdu-pandas.webp",
    "guilin.webp": "china-guilin-karst-landscape.webp",
}

HOME_FILE_NAMES = {
    "1.jpg": "home-hero-kerala-backwaters.jpg",
    "2.jpg": "home-hero-maldives-villas.jpg",
    "3.jpg": "home-hero-japan-fuji.jpg",
    "4.jpg": "home-hero-dubai-skyline.jpg",
    "5.jpg": "home-hero-travel-adventure.jpg",
    "6.jpg": "home-hero-beach-sunset.jpg",
    "7.jpg": "home-hero-mountain-landscape.jpg",
    "8.jpg": "home-hero-cultural-heritage.jpg",
}

ABOUT_FILE_NAMES = {
    "1.png": "about-team-collaboration.png",
}

# Unsplash photo-id -> local path (filled after file renames)
UNSPLASH_OVERRIDES: dict[str, str] = {
    # Home hero slides (by alt semantics)
    "photo-1602216056096-3b40cc0c9944": "/kerala/kerala-hero-banner-backwaters.avif",
    "photo-1506905925346-21bda4d32df4": "/maldives/maldives-overwater-villas.jpg",
    "photo-1480796927426-f609979314bd": "/japan/japan-cherry-blossoms.jpg",
    "photo-1512453979798-5ea266f8880c": "/dubai/dubai-burj-khalifa-skyline.jpg",
    "photo-1488646953014-85cb44e25828": "/home/home-hero-travel-adventure.jpg",
    "photo-1528181304800-2f1702ad9fbe": "/thailand/thailand-bangkok-grand-palace.jpg",
    "photo-1500375592092-40eb2168fd21": "/goa/goa-beach-shack-sunset.jpg",
    # About / contact / founder
    "photo-1522202176988-66273c2fd55f": "/about/about-team-collaboration.png",
    "photo-1507003211147-0a1033cbd5a0": "/founder.jpg",
    "photo-1540541338287-41700207dee6": "/kerala/kerala-backwater-cruise-tour.jpg",
    "photo-1436491865332-7a61a109cc05": "/dubai/dubai-burj-khalifa-skyline.jpg",
    "photo-1476514525535-07fb3b4ae5f1": "/kerala/kerala-tropical-beach-sunset.avif",
    # Fixed departures
    "photo-1537996194471-e657df975ab4": "/bali/bali-ubud-temple.jpg",
    "photo-1506461883276-594a12b11cc3": "/arunachal-pradesh/arunachal-pradesh-hero-banner.jpg",
    "photo-1524492412937-b28074a5d7da": "/golden-triangle/golden-triangle-taj-mahal-agra.jpg",
    "photo-1593693397690-362cb9666fc2": "/kerala/kerala-alleppey-backwaters-houseboat.jpg",
    "photo-1525625293386-3f8f99389edd": "/singapore/singapore-marina-bay-sands.jpg",
    "photo-1544735716-392fe2489ffa": "/sikkim/sikkim-gangtok-city-view.jpg",
    "photo-1528127269322-539801943592": "/vietnam/vietnam-ha-long-bay.jpg",
    "photo-1561361513-2d000a50f0db": "/kashmir/kashmir-dal-lake-srinagar.jpg",
    "photo-1502784444187-359ac186c5bb": "/ladakh/ladakh-pangong-lake.jpg",
    # HNI luxury
    "photo-1540962351504-03099e0a754b": "/dubai/dubai-burj-khalifa-skyline.jpg",
    "photo-1439066615861-d1af74d74000": "/maldives/maldives-overwater-villas.jpg",
    "photo-1567899378494-47b22a2ae96a": "/goa/goa-cruise-party-boat.jpg",
    "photo-1508444072991-791154c120c5": "/ladakh/ladakh-khardung-la-pass.jpg",
    "photo-1516426122078-c23e76319801": "/kenya/kenya-maasai-mara-safari.jpg",
    "photo-1613977257363-707ba9348227": "/bali/bali-seminyak-beach.jpg",
    "photo-1514282401047-d79a71a590e8": "/maldives/maldives-tropical-paradise.jpg",
    "photo-1506973035872-a4ec16b8e8d9": "/kashmir/kashmir-gulmarg-ski-resort.jpg",
    "photo-1493976040374-85c8e12f0c0e": "/japan/japan-cherry-blossoms.jpg",
    "photo-1504893524553-ac55fce698be": "/ladakh/ladakh-nubra-valley.jpg",
    "photo-1533105079780-92b9be482077": "/turkey/turkey-cappadocia-balloons.jpg",
    "photo-1507003211169-0a1dd7228f2d": "/founder.jpg",
    "photo-1544005313-94ddf0286df2": "/about/about-team-collaboration.png",
    "photo-1506794778202-cad84cf45f1d": "/founder.jpg",
    # Destination page heroes / galleries (page-specific fallbacks)
    "photo-1528360983277-13d401cdc186": "/vietnam/vietnam-ha-long-bay.jpg",
    "photo-1559592413-7cec4d0cae2b": "/vietnam/vietnam-hoi-an-lanterns.jpg",
    "photo-1580549411702-8c11bd1f2a48": "/vietnam/vietnam-rice-terraces.jpg",
    "photo-1583417319070-4a69db38a482": "/vietnam/vietnam-hanoi-old-quarter.jpg",
    "photo-1554931670-4ebfabf6e7a9": "/vietnam/vietnam-cuisine-street-food.jpg",
    "photo-1570366583862-f91883984fde": "/vietnam/vietnam-da-nang-beach.jpg",
    "photo-1512343879784-a960bf40e7f2": "/egypt/egypt-pyramids-giza.jpg",
    "photo-1604156788851-3d89f2c1b1a4": "/turkey/turkey-blue-mosque.jpg",
    "photo-1500530855697-b586d89ba3ee": "/sikkim/sikkim-yumthang-valley.jpg",
    "photo-1578662996442-48f60103fc96": "/russia/russia-saint-basil-cathedral.jpg",
    "photo-1505765051251-2f8f6d6ef1d8": "/rajasthan/rajasthan-hawa-mahal-jaipur.jpg",
    "photo-1507525428034-b723cf961d3e": "/philippines/philippines-boracay-beach.jpg",
    "photo-1526779259212-939e64788e3c": "/philippines/philippines-palawan-island.jpg",
    "photo-1504674900247-0877df9cc836": "/philippines/philippines-el-nido-lagoon.jpg",
    "photo-1519046904884-53103b34b206": "/philippines/philippines-cebu-island.jpg",
    "photo-1501785888041-af3ef285b470": "/philippines/philippines-sunset-beach.jpg",
    "photo-1506744038136-46273834b3fb": "/ladakh/ladakh-pangong-lake.jpg",
    "photo-1547471080-7cc2caa01a7e": "/kenya/kenya-maasai-mara-safari.jpg",
    "photo-1546182990-dffeafbe841d": "/kenya/kenya-wildlife-safari.jpg",
    "photo-1516026672322-bc52d61a55d5": "/kenya/kenya-safari-sunset.jpg",
    "photo-1526481280691-7813b68b0fcd": "/japan/japan-tokyo-night-city.jpg",
    "photo-1549893074-4bc6f5f8b7d1": "/hong-kong-macau/hong-kong-victoria-harbor.jpg",
    "photo-1571896349842-33c89424de2d": "/goa/goa-resort-pool.jpg",
    "photo-1563492065599-3520f775eeed": "/cambodia/cambodia-angkor-wat-sunrise.jpg",
    "photo-1609947017136-9daf32a5eb16": "/brunei/brunei-sultan-mosque.jpg",
    "photo-1586500036706-41963de24d8d": "/brunei/brunei-ulu-temburong-rainforest.jpg",
    "photo-1502082553048-f009c37129b9": "/brunei/brunei-water-village.jpg",
    "photo-1551218808-94e220e084d2": "/brunei/brunei-royal-regalia.jpg",
    "photo-1600679472829-3044539ce8d7": "/brunei/brunei-sunset-river.jpg",
    "photo-1548013146-72479768bada": "/bhutan/bhutan-tigers-nest-monastery.jpg",
    "photo-1519681393784-d120267933ba": "/bhutan/bhutan-dochula-pass.jpg",
}

GENERIC_FILENAME_PATTERNS = [
    re.compile(r"^\d+$"),
    re.compile(r"^[a-z]{2,4}-\d+$"),
    re.compile(r"^bg\d+$"),
    re.compile(r"^hero$"),
    re.compile(r"^(sea|sunset|ross|villa|beach|cove|eve|reef|port|view)$"),
    re.compile(r"^[a-z]+-\d+$"),
    re.compile(r"^(greatwall|beijing|shanghai|chengdu|guilin)$"),
]

SOURCE_GLOBS = ["**/*.jsx", "**/*.js", "**/*.css", "**/*.html"]


def slugify(text: str) -> str:
    text = unquote(text).lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-")
    return text


def normalize_folder(folder: str) -> str:
    if folder in FOLDER_RENAMES:
        return FOLDER_RENAMES[folder]
    return folder.lower().replace(" ", "-").replace("_", "-")


def is_image_file(name: str) -> bool:
    return Path(name).suffix.lower() in IMAGE_EXTS


def needs_file_rename(filename: str, folder_slug: str) -> bool:
    stem = Path(filename).stem.lower()
    if "_" in filename:
        return True
    if stem.startswith(folder_slug + "-") and not re.search(r"-\d+$", stem):
        if len(stem) > 12:
            return False
    for pat in GENERIC_FILENAME_PATTERNS:
        if pat.match(stem):
            return True
    return False


def find_folder_on_disk(folder_ref: str) -> Path | None:
    target = normalize_folder(folder_ref)
    if not PUBLIC.exists():
        return None
    for entry in PUBLIC.iterdir():
        if not entry.is_dir():
            continue
        if entry.name == folder_ref or normalize_folder(entry.name) == target:
            return entry
    return None


def build_new_filename(old_filename: str, folder_slug: str, alt: str) -> str:
    ext = Path(old_filename).suffix.lower()
    if folder_slug == "andaman" and old_filename in ANDAMAN_FILE_NAMES:
        return ANDAMAN_FILE_NAMES[old_filename]
    if folder_slug == "china" and old_filename in CHINA_FILE_NAMES:
        return CHINA_FILE_NAMES[old_filename]
    if folder_slug == "home" and old_filename in HOME_FILE_NAMES:
        return HOME_FILE_NAMES[old_filename]
    if folder_slug == "about" and old_filename in ABOUT_FILE_NAMES:
        return ABOUT_FILE_NAMES[old_filename]

    if not needs_file_rename(old_filename, folder_slug):
        return old_filename.replace("_", "-")

    if alt:
        base = slugify(alt)
        if not base.startswith(folder_slug):
            base = f"{folder_slug}-{base}"
        return f"{base}{ext}"

    stem = Path(old_filename).stem
    return f"{folder_slug}-{slugify(stem)}{ext}"


def collect_path_replacements() -> dict[str, str]:
    """Build old /path -> new /path mapping from image_refs_full.json."""
    replacements: dict[str, str] = {}
    used_names: dict[str, set[str]] = {}

    if REFS_JSON.exists():
        refs = json.loads(REFS_JSON.read_text(encoding="utf-8"))
    else:
        refs = []

    for ref in refs:
        old_path = ref["src"]
        if not old_path.startswith("/"):
            continue
        parts = old_path.strip("/").split("/", 1)
        if len(parts) != 2:
            continue
        old_folder, old_file = parts
        folder_slug = normalize_folder(old_folder)
        alt = ref.get("alt", "")
        new_file = build_new_filename(old_file, folder_slug, alt)

        used_names.setdefault(folder_slug, set())
        candidate = new_file
        base_stem = Path(new_file).stem
        ext = Path(new_file).suffix
        counter = 2
        while candidate in used_names[folder_slug]:
            candidate = f"{base_stem}-{counter}{ext}"
            counter += 1
        used_names[folder_slug].add(candidate)

        new_path = f"/{folder_slug}/{candidate}"
        replacements[old_path] = new_path
        # Case / space variants
        replacements[old_path.replace(old_folder, old_folder.lower())] = new_path

    # Extra manual paths found in code but not always in refs json
    extras = [
        ("/Andaman/baratang.jpg", "/andaman/andaman-baratang-limestone-caves.jpg"),
        ("/Meghalaya/6.jpg", "/meghalaya/meghalaya-cherrapunji-waterfall.jpg"),
        ("/Himachal Pradesh/rohotang.jpg", "/himachal-pradesh/himachal-rohtang-pass.jpg"),
        ("/Himachal Pradesh/manali.jpg", "/himachal-pradesh/himachal-manali-town.jpg"),
        ("/Himachal Pradesh/solong.jpg", "/himachal-pradesh/himachal-solang-valley.jpg"),
        ("/Himachal Pradesh/hidimba.jpg", "/himachal-pradesh/himachal-hidimba-temple.jpg"),
    ]
    for old, new in extras:
        replacements.setdefault(old, new)

    # Home images not in refs json
    for old, new in HOME_FILE_NAMES.items():
        replacements[f"/home/{old}"] = f"/home/{new}"

    return replacements


def apply_folder_renames(log: dict) -> None:
    if not PUBLIC.exists():
        return
    planned: list[tuple[Path, Path]] = []
    for entry in sorted(PUBLIC.iterdir(), key=lambda p: p.name.lower()):
        if not entry.is_dir():
            continue
        new_name = normalize_folder(entry.name)
        if entry.name == new_name:
            continue
        dest = PUBLIC / new_name
        if dest.exists() and dest.resolve() != entry.resolve():
            # Merge contents when target already exists (partial prior migration)
            for child in entry.iterdir():
                target = dest / child.name
                if not target.exists():
                    shutil.move(str(child), str(target))
                    log["merged_files"].append(f"{child} -> {target}")
            entry.rmdir()
            log["folder_renames"].append(f"{entry.name} -> merged into {new_name}")
        else:
            planned.append((entry, dest))

    for src, dest in planned:
        if src.exists():
            src.rename(dest)
            log["folder_renames"].append(f"{src.name} -> {dest.name}")


def apply_file_renames(path_replacements: dict[str, str], log: dict) -> None:
    # Deduplicate by actual disk files
    disk_ops: dict[tuple[str, str], str] = {}
    for old_path, new_path in path_replacements.items():
        old_parts = old_path.strip("/").split("/", 1)
        new_parts = new_path.strip("/").split("/", 1)
        if len(old_parts) != 2 or len(new_parts) != 2:
            continue
        old_folder, old_file = old_parts
        new_folder, new_file = new_parts
        folder = find_folder_on_disk(old_folder)
        if folder is None:
            folder = PUBLIC / normalize_folder(old_folder)
        src = folder / old_file
        if src.exists():
            disk_ops[(folder.name, old_file)] = f"{normalize_folder(new_folder)}/{new_file}"

    for (folder_name, old_file), new_rel in sorted(disk_ops.items()):
        src_folder = PUBLIC / folder_name
        if not src_folder.exists():
            continue
        src = src_folder / old_file
        if not src.exists():
            continue
        dest_folder = PUBLIC / Path(new_rel).parent
        dest_folder.mkdir(parents=True, exist_ok=True)
        dest = dest_folder / Path(new_rel).name
        if dest.resolve() == src.resolve():
            continue
        if dest.exists():
            log["skipped_existing"].append(str(dest))
            continue
        shutil.move(str(src), str(dest))
        log["file_renames"].append(f"{src.relative_to(PUBLIC)} -> {dest.relative_to(PUBLIC)}")


def update_unsplash_overrides(path_replacements: dict[str, str]) -> None:
    """Rewrite override targets that still use pre-rename paths."""
    for key, val in list(UNSPLASH_OVERRIDES.items()):
        if val in path_replacements:
            UNSPLASH_OVERRIDES[key] = path_replacements[val]


def extract_photo_id(url: str) -> str | None:
    m = re.search(r"photo-[a-zA-Z0-9_-]+", url)
    return m.group(0) if m else None


def replace_unsplash_urls(content: str, path_replacements: dict[str, str]) -> tuple[str, int]:
    count = 0

    def replacer(match: re.Match) -> str:
        nonlocal count
        full = match.group(0)
        photo_id = extract_photo_id(full)
        if not photo_id:
            return full
        local = UNSPLASH_OVERRIDES.get(photo_id)
        if not local:
            return full
        local = path_replacements.get(local, local)
        count += 1
        return local

    # Match unsplash URLs (with optional &amp; entities)
    pattern = r"https://images\.unsplash\.com/photo-[^\"'\s\)]+"
    new_content = re.sub(pattern, replacer, content)

    # Fix broken Kerala CTA background URL
    new_content = new_content.replace(
        "url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&amp",
        "url('/kerala/kerala-hero-banner-backwaters.avif'",
    )
    return new_content, count


def apply_source_updates(path_replacements: dict[str, str], log: dict) -> None:
    # Sort longest paths first to avoid partial replacements
    sorted_paths = sorted(path_replacements.items(), key=lambda x: len(x[0]), reverse=True)

    for pattern in SOURCE_GLOBS:
        for filepath in SRC.glob(pattern):
            text = filepath.read_text(encoding="utf-8")
            original = text
            changes = 0

            for old, new in sorted_paths:
                if old in text:
                    text = text.replace(old, new)
                    changes += 1

            text, unsplash_count = replace_unsplash_urls(text, path_replacements)
            changes += unsplash_count

            # Fix OurStory broken asset import
            if filepath.name == "OurStory.jsx" and "assets/images/home/1.jpg" in text:
                text = text.replace(
                    'import storyImg from "../../assets/images/home/1.jpg";',
                    'const storyImg = "/home/home-hero-kerala-backwaters.jpg";',
                )
                changes += 1

            if text != original:
                filepath.write_text(text, encoding="utf-8")
                log["source_updates"].append(
                    {"file": str(filepath.relative_to(ROOT)), "changes": changes}
                )

    # index.html if present
    index = ROOT / "index.html"
    if index.exists():
        text = index.read_text(encoding="utf-8")
        new_text = text
        for old, new in sorted_paths:
            new_text = new_text.replace(old, new)
        new_text, _ = replace_unsplash_urls(new_text, path_replacements)
        if new_text != text:
            index.write_text(new_text, encoding="utf-8")
            log["source_updates"].append({"file": "index.html", "changes": 1})


def verify(log: dict) -> dict:
    report = {"broken_local_refs": [], "remaining_unsplash": [], "non_seo_paths": []}
    seo_pattern = re.compile(r"^/[a-z0-9]+(?:-[a-z0-9]+)*/[a-z0-9][a-z0-9.-]*$")

    for pattern in SOURCE_GLOBS:
        for filepath in SRC.glob(pattern):
            text = filepath.read_text(encoding="utf-8")
            for m in re.finditer(r'["\'](/[^"\']+\.(?:jpg|jpeg|png|webp|avif|gif))["\']', text, re.I):
                ref = m.group(1)
                disk = PUBLIC / ref.strip("/").replace("/", os.sep)
                if not disk.exists():
                    report["broken_local_refs"].append(
                        {"file": str(filepath.relative_to(ROOT)), "ref": ref}
                    )
                if not seo_pattern.match(ref):
                    report["non_seo_paths"].append(
                        {"file": str(filepath.relative_to(ROOT)), "ref": ref}
                    )
            for m in re.finditer(r"https://images\.unsplash\.com/[^\"'\s]+", text):
                report["remaining_unsplash"].append(
                    {"file": str(filepath.relative_to(ROOT)), "url": m.group(0)[:80]}
                )

    log["verification"] = report
    return report


def main() -> None:
    log: dict = {
        "folder_renames": [],
        "file_renames": [],
        "merged_files": [],
        "skipped_existing": [],
        "source_updates": [],
    }

    print("=" * 60)
    print("ARUVI TOURS IMAGE MIGRATION")
    print("=" * 60)

    path_replacements = collect_path_replacements()
    print(f"Planned path replacements: {len(path_replacements)}")

    print("\n[Phase 1] Renaming folders...")
    apply_folder_renames(log)
    print(f"  Folders renamed/merged: {len(log['folder_renames'])}")

    print("\n[Phase 2] Renaming files...")
    apply_file_renames(path_replacements, log)
    print(f"  Files renamed: {len(log['file_renames'])}")

    update_unsplash_overrides(path_replacements)

    print("\n[Phase 3 & 4] Updating source code...")
    apply_source_updates(path_replacements, log)
    print(f"  Source files updated: {len(log['source_updates'])}")

    print("\n[Verify] Running post-migration checks...")
    report = verify(log)
    print(f"  Broken local refs: {len(report['broken_local_refs'])}")
    print(f"  Remaining Unsplash:  {len(report['remaining_unsplash'])}")
    print(f"  Non-SEO paths:       {len(report['non_seo_paths'])}")

    LOG_JSON.write_text(json.dumps(log, indent=2), encoding="utf-8")
    print(f"\nLog written to {LOG_JSON.name}")

    if report["broken_local_refs"]:
        print("\nBroken references:")
        for item in report["broken_local_refs"][:10]:
            print(f"  {item['file']}: {item['ref']}")
    if report["remaining_unsplash"]:
        print("\nRemaining Unsplash URLs:")
        for item in report["remaining_unsplash"][:10]:
            print(f"  {item['file']}: {item['url']}")

    print("\nDone.")


if __name__ == "__main__":
    main()
