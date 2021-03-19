# Eire Schools

A simple script to get the distance to from your address to all the schools in Ireland.
The list of schools used can be found in https://www.education.ie/en/Publications/Statistics/Data-on-Individual-Schools/


## Instructions for running

1. Install npm and node if you don't have them already https://nodejs.org
2. Clone or download this repo https://github.com/brleinad/eire-schools/archive/main.zip
3. Install dependencies `npm install`
4. Create your .env file with your google api key and your Eircode:
```
GOOGLE_API_KEY=...secret...
ORIGIN_EIRCODE=...private...
```
5. Run it! `node eire-schools.js`

Running it will generate an excel file called distances.xlsx with the distance in km to each of the schools in schools.xlsx from the provided Eircode.