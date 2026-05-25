import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from textblob import TextBlob
import time
import re

def get_real_time_data(query):
    options = uc.ChromeOptions()
    
    # Headless Mode and Performance Optimizations
    options.add_argument('--headless') 
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--window-size=1920,1080')
    
    # Setting a real user-agent helps avoid detection in headless mode
    options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36')

    try:
        driver = uc.Chrome(version_main=133, options=options)
        
        # Myntra search URL structure
        url = f"https://www.myntra.com/{query.replace(' ', '-')}"
        driver.get(url)
        
        # Wait for the product grid to load
        wait = WebDriverWait(driver, 10)
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "product-base")))
        
        # Scroll to trigger lazy-loading
        driver.execute_script("window.scrollBy(0, 600);")
        time.sleep(2)
        
        products = []
        items = driver.find_elements(By.CLASS_NAME, "product-base")[:12]
        
        for item in items:
            try:
                brand = item.find_element(By.CLASS_NAME, "product-brand").text
                title = item.find_element(By.CLASS_NAME, "product-product").text
                
                # Targeted price extraction to prevent merging MRP and Discounted prices
                try:
                    price_element = item.find_element(By.CLASS_NAME, "product-discountedPrice")
                except:
                    price_element = item.find_element(By.CLASS_NAME, "product-price")
                
                price_text = price_element.text
                
                # Regex to extract only the first numeric value found
                clean_price = re.search(r'(\d+)', price_text.replace(',', ''))
                
                if clean_price:
                    final_price = float(clean_price.group(1))
                    
                    # Basic sanity check for fashion items
                    if final_price > 100000: 
                        continue

                    products.append({
                        "title": f"{brand} {title}",
                        "brand": brand,
                        "price": final_price,
                        "rating": 4.0,
                        "sentiment_score": (TextBlob(title).sentiment.polarity + 1) * 50,
                        "site": "Myntra"
                    })
            except:
                continue
                
        driver.quit()
        return products
        
    except Exception as e:
        print(f"Myntra Scraper Error: {e}")
        if 'driver' in locals():
            driver.quit()
        return []