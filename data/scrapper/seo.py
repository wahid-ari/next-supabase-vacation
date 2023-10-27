# pip install bs4
# py .\data\scrapper\main.py
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
# my_url = 'https://www.indonesia.travel/gb/en/destinations/java'
# my_url = 'https://www.indonesia.travel/gb/en/destinations/bali-nusa-tenggara'
# my_url = 'https://www.indonesia.travel/gb/en/destinations/maluku-papua'
# my_url = 'https://www.indonesia.travel/gb/en/destinations/kalimantan'
# my_url = 'https://www.indonesia.travel/gb/en/destinations/sulawesi'
my_url = 'https://www.indonesia.travel/gb/en/destinations/sumatra'

# JSON path 
# path = "data/scrapper/jawa_temp"

# opening an connection to website
uClient = uReq(my_url)
page_html = uClient.read()
uClient.close()

# html parsing
page_soup = soup(page_html, "html.parser")

section = page_soup.find(
        "section", {"class": "destination-highlight-revamp my-5 py-4"})
# print(section)
container = section.find("div", {"class": "container"})
# print(container)
# print(container.find("h2").text)
div = container.find("div")
# print(div)
items = div.find_all("div", {"class": "col highlight-item onpagination-load"})
# print(items)
items_hide = div.find_all("div", {"class": "col highlight-item onpagination-load onhide"})
# print(items_hide)
trs = items + items_hide
# print(trs)

data = []
# index of item
index = 1
for tr in trs[25:]:
    # print(tr.a)
    name = tr.a.h6.text
    url = "https://www.indonesia.travel" + tr.a.get("href")
    # Open detail page 
    nextClient = uReq(url)
    detail_page_html = nextClient.read() 
    nextClient.close()
    # create soup for next url
    # html parsing
    detail_page_soup = soup(detail_page_html, "html.parser")
    meta = detail_page_soup.find("meta", {"property": "description"})
    # print(meta)
    description = meta.get("content")
    # print(description)
    # # FIX Uncomment this to create JSON 
    # data.append({
    #     "id": index,
    #     "name": name,
    #     "description": description
    # })
    print(index)
    print(name)
    print(description)
    print("------------------- \n")
    index = index + 1

# # FIX Uncomment this to create JSON 
# with open(f'{path}{".json"}', "w") as outfile:
#     json.dump(data, outfile, indent=4)