import time
from selenium import webdriver

from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

options = Options()
options.add_experimental_option("detach", True)

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

driver.get("https://programming-club-daiict.up.railway.app/")
driver.maximize_window()

links = driver.find_elements("xpath","//a[@href]")
for link in links:
    if "User Login" in link.get_attribute('innerHTML'):
        link.click()
        break



email_field = driver.find_element("xpath","//input[@name='email']")
email_field.send_keys("202001445@daiict.ac.in")

password_field = driver.find_element("xpath","//input[@name='password']")
password_field.send_keys("123789456")

login_button = driver.find_element("xpath","//button[contains(text(), 'Login')]")
login_button.click()

nav_link = driver.find_element("link text", "Event")
nav_link.click()

nav_link = driver.find_element("link text", "Resource")
nav_link.click()

nav_link = driver.find_element("link text", "Home")
nav_link.click()

driver.execute_script("window.scrollBy(0, 1632);")

driver.execute_script("window.scrollBy(0, -1632);")

nav_link = driver.find_element("link text", "Profile")
nav_link.click()

edit_button = driver.find_element("link text", "Edit")
edit_button.click()

name_field = driver.find_element("xpath","//input[@name='name']")
name_field.send_keys("patel krunal")

dropdown_element1 = driver.find_element_by_id("exampleSelect1")

dropdown_element1.select_by_value("B.Tech - ICT")

dropdown_element2 = driver.find_element_by_id("exampleSelect1")

dropdown_element2.select_by_value("option_value")

password_field = driver.find_element("xpath","//input[@name='address']")
password_field.send_keys("ganthinagar, gujrat")

login_button = driver.find_element("xpath","//button[contains(text(), 'Save Changes')]")
login_button.click()

nav_link = driver.find_element("link text", "Feedback")
nav_link.click()

email_field = driver.find_element("xpath","//input[@name='title']")
email_field.send_keys("checking")

password_field = driver.find_element("xpath","//textarea[@name='feedback']")
password_field.send_keys("gui testing")

# feedback_button = driver.find_element("xpath","//button[contains(text(), 'Submit Feedback')]")
# feedback_button.click()

nav_link = driver.find_element("link text", "Logout")
nav_link.click()

