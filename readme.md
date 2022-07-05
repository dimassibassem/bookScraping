This project is a tool for scraping books by ISBN from many sources

To run this project you need to download nodejs current version and install it
https://nodejs.org/en/download/current/

Then you need to install the dependencies using npm:

```
npm install
```
    
then run the following command:
```
npm start
```

endpoints:

```
http://localhost:3000/abebooks/:isbn
http://localhost:3000/bookFinder/:isbn
http://localhost:3000/cpu/:isbn
http://localhost:3000/alManhal/:isbn
http://localhost:3000/amazon/:isbn
```
and for testing all sources 
```
http://localhost:3000/all/:isbn
```

