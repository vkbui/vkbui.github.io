from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from datetime import datetime
import re, json

json_file_path = '/Users/vuongbui/portfolio/src/data.json'

driver = webdriver.Chrome()
driver.get('https://letterboxd.com/vbui/films/diary/')

diary_entries = driver.find_elements(By.CSS_SELECTOR, "tr.diary-entry-row")[:4]

cur_month = None   # e.g., "Aug"
cur_year  = None   # e.g., "2025"
entries_data = []

for entry in diary_entries:
    # --- month / year (if present in this row) ---
    month_els = entry.find_elements(By.CSS_SELECTOR, "td.col-monthdate a.month")
    year_els  = entry.find_elements(By.CSS_SELECTOR, "td.col-monthdate a.year")

    if month_els and month_els[0].text.strip():
        cur_month = month_els[0].text.strip()  # e.g., "Aug"
    if year_els and year_els[0].text.strip():
        cur_year = year_els[0].text.strip()    # e.g., "2025"

    # --- day (always present) ---
    day_a = entry.find_element(By.CSS_SELECTOR, "td.col-daydate a")
    day_text = day_a.text.strip()              # e.g., "21"

    # --- fallback: if month or year missing, parse from day href (/diary/YYYY/MM/DD/) ---
    if not cur_month or not cur_year:
        href = day_a.get_attribute("href") or ""
        m = re.search(r'/diary/(\d{4})/(\d{1,2})/(\d{1,2})/', href)
        if m:
            y, mnum, dnum = map(int, m.groups())
            cur_year = str(y)
            # convert numeric month to abbreviated name like "Aug"
            cur_month = datetime(2000, mnum, 1).strftime("%b")
            # also trust day from href if text ever blank
            if not day_text:
                day_text = str(dnum)

    # At this point we must have all 3 components
    if not (cur_month and cur_year and day_text):
        # skip row if date is still incomplete
        continue

    # Build datetime (e.g., "Aug 21 2025")
    date_obj = datetime.strptime(f"{cur_month} {day_text} {cur_year}", "%b %d %Y")
    formatted_date = date_obj.strftime('%m-%d-%Y')

    # --- film details cell (classes vary; try both) ---
    details_td = None
    for sel in ["td.td-film-details", "td.col-production"]:
        els = entry.find_elements(By.CSS_SELECTOR, sel)
        if els:
            details_td = els[0]
            break

    # Poster
    poster_img = entry.find_element(
        By.CSS_SELECTOR,
        "div.poster.film-poster img"
    )
    poster = (poster_img.get_attribute("src") or "").replace('-35-', '-1000-').replace('-52-', '-1500-')

    # Title
    title = details_td.find_element(By.CSS_SELECTOR, "div.body h2.name a").text.strip()

    # Release year (handle both table variants)
    ry = entry.find_elements(By.CSS_SELECTOR, "td.td-released.center span, td.col-releaseyear span")
    release_year = ry[0].text.strip() if ry else ""

    # Liked
    liked = bool(entry.find_elements(By.CSS_SELECTOR, "td.td-like span.icon-liked, td.col-like span.icon-liked"))

    # Rewatch (icon-status-off means NOT rewatched)
    rewatch_td = entry.find_element(By.CSS_SELECTOR, "td.td-rewatch, td.col-rewatch")
    rewatched = "icon-status-off" not in (rewatch_td.get_attribute("class") or "")

    # --- Rating (match the method from your second script) ---
    # Works for both legacy "td.td-rating" and newer "td.col-rating"
    try:
        rating_span = entry.find_element(By.CSS_SELECTOR, "td.td-rating span, td.col-rating span")
        classes = rating_span.get_attribute("class") or ""
        m = re.search(r'rated-([0-9]+)', classes)
        rating = m.group(1) if m else None  # e.g., "35" (i.e., 3.5 stars if you later map /10)
    except NoSuchElementException:
        rating = None

    entries_data.append({
        "date": formatted_date,
        "title": title,
        "release_year": release_year,
        "liked": liked,
        "rewatched": rewatched,
        "poster": poster,
        "rating": rating  # matches the second script's output style
    })

driver.quit()

# Write JSON
with open(json_file_path, 'r') as f:
    data = json.load(f)
data["movies"] = entries_data
with open(json_file_path, 'w') as f:
    json.dump(data, f, indent=4)

print(f"Diary entries appended to {json_file_path}")