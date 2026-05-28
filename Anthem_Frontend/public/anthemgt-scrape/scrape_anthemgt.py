import os
import re
import json
import time
import mimetypes
import urllib3
import requests
import pandas as pd
from bs4 import BeautifulSoup
from tqdm import tqdm
from urllib.parse import urljoin, urlparse, urldefrag

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

BASE_DOMAINS = {"anthemgt.com", "www.anthemgt.com"}

SEED_URLS = [
    "https://www.anthemgt.com/",
    "http://www.anthemgt.com/",
    "https://anthemgt.com/about.aspx",
    "https://anthemgt.com/aboutus.aspx",
    "https://anthemgt.com/career.aspx",
    "https://anthemgt.com/contactus.aspx",
    "https://anthemgt.com/clients.aspx",
    "https://anthemgt.com/managementprofile.aspx",
    "https://anthemgt.com/presentationnew.aspx",
    "https://anthemgt.com/design-development.aspx",
    "https://anthemgt.com/Vehicle-Tracking-System.aspx",
    "https://anthemgt.com/ewaste-management.aspx",
    "https://www.anthemgt.com/project-training.aspx",
    "https://anthemgt.com/ceo.aspx",
]

OUTPUT_DIR = "anthemgt_extracted"
ASSET_DIR = os.path.join(OUTPUT_DIR, "assets")
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ASSET_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) WebsiteMigrationBot/1.0"
}

session = requests.Session()
session.headers.update(HEADERS)

visited = set()
to_visit = list(SEED_URLS)
pages = []
assets = set()
errors = []

EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
PHONE_RE = re.compile(r"(\+?\d[\d\s().-]{7,}\d)")

def clean_url(url):
    url, _ = urldefrag(url)
    return url.strip()

def is_internal(url):
    parsed = urlparse(url)
    return parsed.netloc.lower() in BASE_DOMAINS or parsed.netloc == ""

def safe_get(url):
    try:
        return session.get(url, timeout=25, verify=False, allow_redirects=True)
    except Exception as e:
        errors.append({"url": url, "error": str(e)})
        return None

def text_list(soup, selector):
    return [x.get_text(" ", strip=True) for x in soup.select(selector) if x.get_text(strip=True)]

def extract_table(table):
    rows = []
    for tr in table.find_all("tr"):
        cells = [c.get_text(" ", strip=True) for c in tr.find_all(["th", "td"])]
        if cells:
            rows.append(cells)
    return rows

def safe_filename(url):
    parsed = urlparse(url)
    path = parsed.path.strip("/")
    if not path:
        path = "index"
    name = re.sub(r"[^a-zA-Z0-9._-]", "_", path)
    return name[:180]

def download_asset(asset_url):
    try:
        r = session.get(asset_url, timeout=25, verify=False)
        if r.status_code != 200:
            return ""

        name = safe_filename(asset_url)

        if "." not in os.path.basename(name):
            content_type = r.headers.get("Content-Type", "").split(";")[0]
            ext = mimetypes.guess_extension(content_type) or ".bin"
            name += ext

        save_path = os.path.join(ASSET_DIR, name)
        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        with open(save_path, "wb") as f:
            f.write(r.content)

        return save_path

    except Exception as e:
        errors.append({"url": asset_url, "error": str(e)})
        return ""

while to_visit:
    url = clean_url(to_visit.pop(0))

    if url in visited:
        continue

    if not is_internal(url):
        continue

    visited.add(url)
    print("Crawling:", url)

    response = safe_get(url)
    if not response:
        continue

    content_type = response.headers.get("Content-Type", "")

    if "text/html" not in content_type:
        assets.add(url)
        continue

    soup = BeautifulSoup(response.text, "lxml")

    title = soup.title.get_text(" ", strip=True) if soup.title else ""

    desc_tag = soup.find("meta", attrs={"name": re.compile("^description$", re.I)})
    meta_description = desc_tag.get("content", "").strip() if desc_tag else ""

    keyword_tag = soup.find("meta", attrs={"name": re.compile("^keywords$", re.I)})
    meta_keywords = keyword_tag.get("content", "").strip() if keyword_tag else ""

    canonical_tag = soup.find("link", rel=lambda x: x and "canonical" in x)
    canonical = urljoin(url, canonical_tag.get("href", "")) if canonical_tag else ""

    h1 = text_list(soup, "h1")
    h2 = text_list(soup, "h2")
    h3 = text_list(soup, "h3")
    paragraphs = text_list(soup, "p")
    list_items = text_list(soup, "li")

    all_text = soup.get_text(" ", strip=True)
    emails = sorted(set(EMAIL_RE.findall(all_text)))
    phones = sorted(set(PHONE_RE.findall(all_text)))

    images = []
    for img in soup.find_all("img"):
        src = img.get("src") or img.get("data-src")
        if src:
            img_url = urljoin(url, src)
            images.append({
                "src": img_url,
                "alt": img.get("alt", "").strip(),
                "title": img.get("title", "").strip()
            })
            assets.add(img_url)

    links = []
    for a in soup.find_all("a", href=True):
        href = clean_url(urljoin(url, a["href"]))
        link_text = a.get_text(" ", strip=True)

        links.append({
            "text": link_text,
            "href": href
        })

        if is_internal(href):
            lower = href.lower()
            asset_exts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".css", ".js"]

            if any(lower.endswith(ext) for ext in asset_exts):
                assets.add(href)
            else:
                if href not in visited and href not in to_visit:
                    to_visit.append(href)

    css_js_assets = []
    for tag in soup.find_all(["script", "link"]):
        src = tag.get("src") or tag.get("href")
        if src:
            asset_url = urljoin(url, src)
            if is_internal(asset_url):
                css_js_assets.append(asset_url)
                assets.add(asset_url)

    forms = []
    for form in soup.find_all("form"):
        fields = []
        for field in form.find_all(["input", "textarea", "select", "button"]):
            fields.append({
                "tag": field.name,
                "type": field.get("type", ""),
                "name": field.get("name", ""),
                "id": field.get("id", ""),
                "placeholder": field.get("placeholder", ""),
                "value": field.get("value", "")
            })

        forms.append({
            "method": form.get("method", ""),
            "action": urljoin(url, form.get("action", "")),
            "fields": fields
        })

    tables = [extract_table(table) for table in soup.find_all("table")]

    pages.append({
        "url": url,
        "final_url": response.url,
        "status_code": response.status_code,
        "title": title,
        "meta_description": meta_description,
        "meta_keywords": meta_keywords,
        "canonical": canonical,
        "h1": " | ".join(h1),
        "h2": " | ".join(h2),
        "h3": " | ".join(h3),
        "paragraphs": "\n".join(paragraphs),
        "list_items": "\n".join(list_items),
        "emails": " | ".join(emails),
        "phones": " | ".join(phones),
        "images_json": json.dumps(images, ensure_ascii=False),
        "links_json": json.dumps(links, ensure_ascii=False),
        "forms_json": json.dumps(forms, ensure_ascii=False),
        "tables_json": json.dumps(tables, ensure_ascii=False),
        "css_js_assets_json": json.dumps(css_js_assets, ensure_ascii=False),
        "full_text": all_text
    })

    time.sleep(1)

print("\nDownloading assets...")

downloaded_assets = []

for asset_url in tqdm(sorted(assets)):
    if is_internal(asset_url):
        saved = download_asset(asset_url)
        downloaded_assets.append({
            "asset_url": asset_url,
            "saved_path": saved
        })
        time.sleep(0.3)

pages_df = pd.DataFrame(pages)
assets_df = pd.DataFrame(downloaded_assets)
errors_df = pd.DataFrame(errors)

pages_df.to_csv(os.path.join(OUTPUT_DIR, "anthemgt_pages_inventory.csv"), index=False, encoding="utf-8-sig")
pages_df.to_json(os.path.join(OUTPUT_DIR, "anthemgt_pages_inventory.json"), orient="records", indent=2, force_ascii=False)

assets_df.to_csv(os.path.join(OUTPUT_DIR, "anthemgt_assets.csv"), index=False, encoding="utf-8-sig")
errors_df.to_csv(os.path.join(OUTPUT_DIR, "anthemgt_errors.csv"), index=False, encoding="utf-8-sig")

with open(os.path.join(OUTPUT_DIR, "all_discovered_urls.txt"), "w", encoding="utf-8") as f:
    for u in sorted(visited):
        f.write(u + "\n")

print("\nDONE")
print("Pages crawled:", len(pages))
print("Assets found:", len(assets))
print("Errors:", len(errors))
print("Output folder:", OUTPUT_DIR)