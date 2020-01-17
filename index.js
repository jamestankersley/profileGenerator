const BuildProfile = require("./buildProfile");
const inquirer = require("inquirer");

///////////////////////////////////////////////////////////
/*
Initial Install:
1. Run npm install
2. Go to node_modules/convert-html-to-pdf/lib/index.js
3. Change Line 4 from exports.default to module.exports


*/
//////////////////////////////////////////////////////////

function promptUser(){
    return inquirer.prompt([
        {
          type: "list",
          name: "color",
          message: "What is your favorite color?",
          choices: ["Green","Blue","Pink","Red"]
        },
        {
          type: "input",
          name: "user",
          message: "What is your GitHub Username?"
        }
    ]);
    }

promptUser()
    .then((answers) => {
        const profile = new BuildProfile(answers);
        profile.buildHTML();
    })
 


















