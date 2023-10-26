# pip install bs4
# py .\data\scrapper\bali.py
import bs4
import json
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
my_url = 'https://www.indonesia.travel/gb/en/destinations/bali-nusa-tenggara'

# JSON path 
path = "data/scrapper/bali"

# opening an connection to website
uClient = uReq(my_url)
page_html = uClient.read()
uClient.close()

# html parsing
page_soup = soup(page_html, "html.parser")

# index of item
index = 1

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
# remove all attributes
# TODO Docs https://gist.github.com/revotu/21d52bd20a073546983985ba3bf55deb
# remove all attributes except some tags
def _remove_all_attrs_except(soup):
    whitelist = ['a','img']
    for tag in soup.find_all(True):
        if tag.name not in whitelist:
            tag.attrs = {}
    return soup

data = []
for tr in trs[:1]:
    # print(tr.a)
    name = tr.a.h6.text
    url = "https://www.indonesia.travel" + tr.a.get("href")
    image_url = "https://www.indonesia.travel" + tr.a.img.get("src")
    # Open detail page 
    nextClient = uReq(url)
    detail_page_html = nextClient.read() 
    nextClient.close()
    # create soup for next url
    # html parsing
    detail_page_soup = soup(detail_page_html, "html.parser")
    header_image_container = detail_page_soup.find("div", {"class": "slideshow-responsive aem-GridColumn aem-GridColumn--default--12"})
    # print(header_image_container.prettify())
    header_image = header_image_container.find("source").get("srcset")
    # print(header_image)
    header_image_url = "https://www.indonesia.travel" + header_image
    # print(header_image_url)
    content_container = detail_page_soup.find("div", {"class": "col-sm-12 col-md-8 content-text"})
    # print(content_container.prettify())
    heading = content_container.find("h1")
    # print(heading)
    # remove attributes from tag 
    for attr in list(heading.attrs):
        del(heading[attr])
    # print(heading)
    subheading = content_container.find("p", {"class": "fs-5"})
    if subheading == None:
        subheading = ''
    else:
        # remove attributes from tag 
        for attr in list(subheading.attrs):
            del(subheading[attr])
        # print(subheading)
    # print(subheading)
    div = content_container.find("div", {"class": "mb-5"})
    # print(div)
    content = div.contents[1]
    # print(content)
    # print("------------------- \n")
    content_remove_attr = _remove_all_attrs_except(content)
    # print(content_remove_attr)
    # print("------------------- \n")
    content_ready = str(heading) + str(subheading) + str(content)
    # print(content_ready)
    # FIX Uncomment this to create JSON 
    data.append({
        "id": index,
        "name": name,
        "image_url": image_url,
        "url": url,
        "header_image_url": header_image_url,
        "content": content_ready
    })
    print(index)
    print(name)
    print(image_url)
    print(url)
    print(header_image_url)
    print(content)
    print("------------------- \n")
    index = index + 1

# FIX Uncomment this to create JSON 
with open(f'{path}{".json"}', "w") as outfile:
    json.dump(data, outfile, indent=4)