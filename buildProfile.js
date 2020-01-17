const generateHTML = require("./generateHTML.js");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const HTMLToPDF = require('convert-html-to-pdf');
const open = require("open");
const puppeteer = require('puppeteer');
const writeFileAsync = util.promisify(fs.writeFile);
//////////////////////////////////////////////////////
class BuildProfile {
    constructor(answers){
        this.color = answers.color.toLowerCase();
        this.user = answers.user;
    }
    buildHTML(){
        const queryUrl = `https://api.github.com/users/${this.user}`
        axios
        .get(queryUrl)
        .then((res)=> {
            const data = {
                color: this.color,
                proPicUrl: res.data.avatar_url,
                name: res.data.name,
                employer: res.data.company,
                loc: res.data.location,
                gitUrl: res.data.html_url,
                blog: res.data.blog,
                bio: res.data.bio,
                numRepos: res.data.public_repos,
                gitStars: 100, 
                followers: res.data.followers,
                following: res.data.following
            };
           const page = generateHTML(data);
           this.toPDF(page);
        }).catch((err) => {
            console.log(err)
        });
    }
    toPDF(page){
        const devPDF = new HTMLToPDF(page);
        const newProf = devPDF.convert()
        .then((buffer) => {
            this.publishProf(buffer);
            console.log("Success");
        })
        .catch((err) => {
            console.log("I sense a disturbance in the force");
        })
    };
    publishProf(newProf){
        fs.writeFile("Dev-Profile.pdf",newProf, (err) => {
            if(err) {
                throw err;
            };
        console.log("Profile has been saved!");
        });
        open("Dev-Profile.pdf");
    };
    
}

module.exports = BuildProfile;