### CRAWL PHONE PRODUCTS DATA ON HOANGHAMOBILE

#### MAIN USED MODULES
1. Nightmare js to crawl 
2. Image-downloader to download images

#### CRAWL DATA AND IMAGES AND THEN EXPORT DIRECTLY TO DATABASE
HOANGHAMOBILE has pagination and the first product row of the next page is the same as the last row of the previous page. Thus, we have 2 crawl files:
1. Crawl_all.js is to crawl the first page
2. Crawl.next.js is to crawl the next pages. Here we cut the links of the duplicated products and only crawl new products. Each script run is to crawl one page so we have to change the link to HOANGHAMOBILE page after each crawl

* Reconfig database connection in file config.json

#### IMAGES ARE DOWNLOAD TO FOLDER IMG AND EACH PRODUCT HAS THEIR OWN FOLDER 
