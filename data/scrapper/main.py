# pip install bs4
# py .\data\scrapper\main.py
import bs4
import json
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
# my_url = 'https://www.indonesia.travel/gb/en/destinations/java'
# my_url = 'https://www.indonesia.travel/gb/en/destinations/bali-nusa-tenggara'
# my_url = 'https://www.indonesia.travel/gb/en/destinations/maluku-papua'
# my_url = 'https://www.indonesia.travel/gb/en/destinations/kalimantan'
# my_url = 'https://www.indonesia.travel/gb/en/destinations/sulawesi'
my_url = 'https://www.indonesia.travel/gb/en/destinations/sumatra'

# JSON path 
path = "data/scrapper/sumatra_temp"

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
# remove all attributes
# TODO Docs https://gist.github.com/revotu/21d52bd20a073546983985ba3bf55deb
# remove all attributes except some tags
def _remove_all_attrs_except(soup):
    whitelist = ['a','img']
    for tag in soup.find_all(True):
        if tag.name not in whitelist:
            tag.attrs = {}
    return soup

# TODO Docs https://stackoverflow.com/questions/66156518/add-or-update-an-attribute-in-a-tag-using-beautiful-soup-python
# TODO Docs https://stackoverflow.com/questions/19357506/python-find-html-tags-and-replace-their-attributes
# this img src is error, need domain
# <img alt="Land of the Gods" src="/content/dam/indtravelrevamp/en/destinations/bali-nusa-tenggara/bali/bali/Image2.jpg"/>
# this a href is error, need domain
# <a href="/content/indtravelrevamp/gb/en/news/latest-travel-regulations-to-enter-bali.html" target="Target">
#  latest information related to the reopening of Bali.
# </a>
def fix_broken_link(soup):
    whitelist = ['a','img']
    for tag in soup.find_all(True):
        if tag.name in whitelist:
            # print(tag.name, tag.attrs)
            if tag.name == 'img':
                # print("img tag")
                # print(tag.attrs)
                if tag.attrs['src'].startswith("/content"):
                    # print("img src startswith /content")
                    tag.attrs['src'] = "https://www.indonesia.travel" + tag.attrs['src']
                    # print(tag)
                # print("\n")
            if tag.name == 'a':
                # print("a tag")
                # print(tag)
                # print(tag.attrs)
                # if href exist in tag attribute 
                if "href" in tag.attrs:
                    if tag.attrs['href'].startswith("/content") or tag.attrs['href'].startswith("/gb"):
                        # print("img href startswith /content")
                        tag.attrs['href'] = "https://www.indonesia.travel" + tag.attrs['href']
                #         print(tag)
                # print("\n")
    return soup

data = []
# index of item
index = 99
for tr in trs[25:]:
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
    header_image_container = detail_page_soup.find("div", {"class": "slideshow-responsive aem-GridColumn aem-GridColumn--default--12"}) or detail_page_soup.find("div", {"class": "slideshow-responsive-AT aem-GridColumn aem-GridColumn--default--12"}) or detail_page_soup.find("div", {"class": "slideshow aem-GridColumn aem-GridColumn--default--12"}) or detail_page_soup.find("div", {"class": "slideshow-responsive aem-GridColumn aem-GridColumn--default--12"})
    # print(header_image_container.prettify())
    # print(header_image_container.find("source"))
    header_image = ''
    if header_image_container.find("source") == None:
        header_image = header_image_container.find("img").get("src") or header_image_container.find("img").get("srcset")
    else:
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
    # print(div.prettify())
    # print("------------------- \n")
    fix_link = fix_broken_link(div)
    # print(fix_link)
    # print("------------------- \n")
    content = div.contents[1]
    # print(content)
    # print("------------------- \n")
    content_remove_attr = _remove_all_attrs_except(content)
    # print(content_remove_attr)
    # print("------------------- \n")
    content_ready = str(heading) + str(subheading) + str(content)
    # print(content_ready)
    # Uncomment this to create JSON 
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
    # print(image_url)
    # print(url)
    # print(header_image_url)
    # print(content_ready)
    print("------------------- \n")
    index = index + 1

# Uncomment this to create JSON 
with open(f'{path}{".json"}', "w") as outfile:
    json.dump(data, outfile, indent=4)