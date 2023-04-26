# Import packages
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

import os
import tempfile
import time
from google.cloud import storage
import functions_framework


@functions_framework.http
def download_csv(request):
    client = storage.Client()
    bucket = client.bucket('musa509-nlrb-election-mapper-raw-data')
    # create the web driver instance
    download_dir = '/tmp'
    print(download_dir)

    chrome_options = Options()
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
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
    
    try:
        url = "https://www.nlrb.gov/reports/graphs-data/recent-election-results?r%5B0%5D=06&r%5B1%5D=04&s%5B0%5D=Closed"
        driver.get(url)
        
        time.sleep(10)

        # Download file
        download_button = driver.find_element(By.CLASS_NAME, 'download-button')
        download_button.click()

        print(os.listdir(download_dir))

        # Wait for the download to complete
        time.sleep(5)

        # Get file name
        file_name = os.listdir(download_dir)[-1]

    finally:
        # Quit driver
        driver.quit()

    blob = bucket.blob('nlrb_data/latest_nlrb.csv')

    with open(f'{download_dir}/' + file_name, 'rb') as my_file:
        blob.upload_from_file(my_file, content_type='text/csv')

    return 'OK'
