import { getGithubContributions } from 'github-contributions-counter'
import 'dotenv/config'
import { readFile, writeFile} from 'fs/promises';
import fs from 'fs';
import { Parser } from 'json2csv';

let contributionHistroy = {};

getGithubContributions({
  username: 'NilsJacobsen',
  token: process.env.GITHUB_TOKEN
}).then((r) => {
  contributionHistroy = r.data;
  const data = structureData(contributionHistroy.data.user.contributionsCollection.contributionCalendar.weeks);
  storeData(data);
})

function structureData(weeks){
  let listOfContribution = [];
  weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      listOfContribution.push(day);
    })
  });
  return(listOfContribution);
}

function storeData(data){
  const json2csvParser = new Parser({
    quote: ''
  });
  const csv = json2csvParser.parse(data);
  writeFile('./data/contribution' + Number(new Date()) + '.csv', csv, 'utf8', (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });
}