# Import packages
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

import os
import tempfile
import time
from glob import glob
from google.cloud import storage
from flask import Flask

app = Flask(__name__)
download_dir = '/app'

client = storage.Client()
bucket = client.bucket('musa509-nlrb-election-mapper-raw-data')

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument('--enable-javascript')
   
chrome_options.add_experimental_option("prefs", {
    "download.default_directory": download_dir,
    "download.prompt_for_download": False,
    "download.directory_upgrade": True,
    "safebrowsing.enabled": True
    }
)

# Set up driver
driver_path = f"{download_dir}/chromedriver"
service = Service(executable_path=driver_path)
driver = webdriver.Chrome(service=service,
                          options=chrome_options)

@app.route("/")
def download_csv():
    try:
        url = "https://www.nlrb.gov/reports/graphs-data/recent-election-results?r%5B0%5D=06&r%5B1%5D=04&s%5B0%5D=Closed"
        driver.get(url)
        
        time.sleep(5)

        # Download file
        download_button = driver.find_element(By.CLASS_NAME, 'download-button')
        download_button.click()

        # Wait for the download to complete
        time.sleep(5)

    finally:
        # Quit driver
        driver.quit()

    # find the only CSV in the default docker download folder
    file_name = glob(f'{download_dir}/*.csv')[0]
    # file_name = os.listdir(download_dir)[-1]

    blob = bucket.blob('latest_nlrb.csv')

    with open(file_name, 'rb') as my_file:
        blob.upload_from_file(my_file, content_type='text/csv')

    return 'Done'
