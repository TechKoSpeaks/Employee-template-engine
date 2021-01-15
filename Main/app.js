// Creating all the constant variables for requirement to generate the employee template //
// Manager, Engineer and Intern require // 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Requiring inquire and various fs and paths to correctly retrieve path data and resolve responses //
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const teamList = [];

// Creating a function for adding the manager details card input //
    function addManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is this Manager's name please?",
                name: "managerName"
            },
            {
                type: "input",
                message: "What is this Manager's ID number (numeric please)?",
                name: "managerID"
            },
            {
                type: "input",
                message: "What is this Manager's email address?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "What is your Manager's office number my friend?",
                name: "officeNumber"
            }
// Creating response with new Manager details to push to chooseMember function //          
        ]).then(response => {
            const newManager = new Manager(response.managerName, response.managerID, response.managerEmail, response.officeNumber);
            teamList.push(newManager);
            chooseMember();
        });
    }
// Engineer function for adding input from engineer card //
    function addEngineer() {
         inquirer.prompt([
            {
                type: "input",
                message: "What is your Engineer's name?",
                name: "engName"
            },
            {
                type: "input",
                message: "What is this talented Engineer's ID number (numeric please)?",
                name: "engID"
            },
            {
                type: "input",
                message: "What is your Engineer's email address?",
                name: "engEmail"
            },
            {
                type: "input",
                message: "What is your Engineer's GitHub username?",
                name: "github"
            }

        ]).then(response => {
            const newEngineer = new Engineer(response.engName, response.engID, response.engEmail, response.github);
            teamList.push(newEngineer);
            chooseMember();
        });
    }

// Adding intern function for prompts that will be added input for intern //   
    function addIntern() {
         inquirer.prompt([
            {
                type: "input",
                message: "What is this up-and-coming Intern's name?",
                name: "internName"
            },
            {
                type: "input",
                message: "What is your Intern's ID number?",
                name: "internID"
            },
            {
                type: "input",
                message: "What is your Intern's email address?",
                name: "internEmail"
            },
            {
                type: "input",
                message: "What is the Intern's school name?",
                name: "internSchool"
            }

        ]).then(response => {
            const newIntern = new Intern(response.internName, response.internID, response.internEmail, response.internSchool);
            teamList.push(newIntern);
            chooseMember();
        });
    }

// Overhead function for choosing member and creating a specific employee response of manager, engineer, intern, or finished based on input //
    function chooseMember() {
        inquirer.prompt([
            {
                type: "list",
                message: "Please select an employee to add to your team:",
                name: "role",
                choices: ["Manager", "Engineer", "Intern", "There is no one else to add, create my website!"]
            }
        ]).then(response => {
            const position = response.role;
            if (position == "Manager") {
                addManager();
            } else if (position == "Engineer") {
                addEngineer();
            } else if (position == "Intern") {
                addIntern();
            } else if (position == "There is no one else to add, create my website!") {
                console.log("You're all finished. Check out your awesome work team page!!")
                write();
            }
        });
    }

// Calling chooseMember function to write data for employees, and asynchronously write data from inputs //
    chooseMember();
function write() {
    fs.writeFileSync(outputPath, render(teamList));
}

