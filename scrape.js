import { getGithubContributions } from 'github-contributions-counter'
import 'dotenv/config'

getGithubContributions({
  username: 'NilsJacobsen',
  token: process.env.GITHUB_TOKEN
}).then((r) => {
  console.log(r.data);
})