// Creating all the constant variables for requirement to generate the employee template //
// Manager, Engineer and Intern require // 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");
const teamList = [];

// Creating a function for adding the manager details card //
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
        ]).then(response => {
            const newManager = new Manager(response.managerName, response.managerID, response.managerEmail, response.officeNumber);
            teamList.push(newManager);
            chooseMember();
        });
    }
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
    function addIntern() {
         inquirer.prompt([
            {
                type: "input",
                message: "What is the Intern's name?",
                name: "internName"
            },
            {
                type: "input",
                message: "What is the Intern's ID number?",
                name: "internID"
            },
            {
                type: "input",
                message: "What is the Intern's email address?",
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
    function chooseMember() {
        inquirer.prompt([
            {
                type: "checkbox",
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
                console.log("You're all finished. Check out your awesome work team!!")
                write();
            }
        });
    }
    chooseMember();
function write() {
    fs.writeFileSync(outputPath, render(teamList));
}


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
