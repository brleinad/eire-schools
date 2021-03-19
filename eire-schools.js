const XLSX = require('xlsx')
const {Client} = require("@googlemaps/google-maps-services-js");
require('dotenv').config()

var workbook = XLSX.readFile("./schools.xlsx");

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

let schools = XLSX.utils.sheet_to_json(sheet);


const gClient = new Client;

const origin = `${process.env.ORIGIN_EIRCODE}+Ireland`;

const getDistance = async (destination) => {
  const res = await gClient.distancematrix({params: {
    key: process.env.GOOGLE_API_KEY,
    origins: [origin],
    destinations: [destination]
  }})

  let distance = ''
  res.data.rows.forEach(row => {
    if (row.elements.length > 0 && row.elements[0].distance) {
      distance = row.elements[0].distance.text;
    // console.log({distance: row.elements[0].distance, duration: row.elements[0].duration})
    }
  })
  return distance;
}

// schools = schools.slice(1,3); // TODO: remove

const distances = []

// console.log(schools[0]);

const main = async () => {
  for (school of schools) {
    const destination = `${school.Eircode}+Ireland`; // school['County Description'];
    const distance = await getDistance(destination);
    distances.push({school: school['Official Name'], distance})
  }

  // console.log(distances)
  // const worksheet = XLSX.utils.json_to_sheet(distances, {header: ['School', 'Distance']})
  const worksheet = XLSX.utils.json_to_sheet(distances)
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet)
  XLSX.writeFile(workbook, 'distances.xlsx')
  console.log(XLSX.utils.sheet_to_csv(worksheet));
}

main();




