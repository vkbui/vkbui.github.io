from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from datetime import datetime
import time
import os
import json

# Set up Chrome options to download files to the current directory
json_file_path = '/Users/vuongbui/portfolio/src/data.json'

# Set up the WebDriver
driver = webdriver.Chrome()  # Path to your WebDriver, e.g., 'path/to/chromedriver'

# Open the webpage
driver.get('https://letterboxd.com/vbui/films/diary/')

# Find the top 4 diary entries
diary_entries = driver.find_elements(By.CSS_SELECTOR, "tr.diary-entry-row")[:4]

cur_month = ""
entries_data = []

# Extract information from each entry
for entry in diary_entries:
    # Check if the calendar cell contains a new month
    month_element = entry.find_element(By.CSS_SELECTOR, "td.td-calendar")
    if month_element.text.strip():  # Check if there's something in the element
        cur_month = month_element.text.strip().replace('\n', ' ')
    
    # Extract the day of the month
    day = entry.find_element(By.CSS_SELECTOR, "td.td-day a").text.strip()
    date_str = f"{cur_month} {day}"

    # Convert the date string into a datetime object
    date_obj = datetime.strptime(date_str, "%b %Y %d")
    formatted_date = date_obj.strftime('%m-%d-%Y')

    # Extract the movie title
    title = entry.find_element(By.CSS_SELECTOR, "td.td-film-details h3.headline-3 a").text.strip()

    # Extract the release year
    release_year = entry.find_element(By.CSS_SELECTOR, "td.td-released.center span").text.strip()

    # Get poster image
    poster = entry.find_element(By.CSS_SELECTOR, "td.td-film-details div.react-component img").get_attribute('src')
    poster_resized = poster.replace('-35-', '-1000-').replace('-52-', '-1500-')

    # Extract if movie liked
    liked = bool(entry.find_elements(By.CSS_SELECTOR, "td.td-like span.icon-liked"))

    # Extract if movie rewatched
    rewatch_element = entry.find_element(By.CSS_SELECTOR, "td.td-rewatch")
    notrewatched = 'icon-status-off' in rewatch_element.get_attribute("class")

    # Store the extracted data in a dictionary
    entry_data = {
        "date": formatted_date,
        "title": title,
        "release_year": release_year,
        "poster" : poster_resized,
        "liked" : liked,
        "rewatched" : True if not notrewatched else False
    }

    # Add the dictionary to the list
    entries_data.append(entry_data)

# Close the browser
driver.quit()

# Load the existing JSON data
with open(json_file_path, 'r') as json_file:
    data = json.load(json_file)

# Append the new entries to the "movies" list
data["movies"] = entries_data

# Write the updated data back to the JSON file
with open(json_file_path, 'w') as json_file:
    json.dump(data, json_file, indent=4)

print(f"Diary entries appended to {json_file_path}")