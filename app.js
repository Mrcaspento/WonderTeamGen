const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require('./lib/htmlRenderer');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let teamArray = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function startTeam() {
    inquirer.prompt([
        {
            type:"input",
            message: "Come up with a Name you're employees will hate",
            name: "teamName"
        }
    ])
        .then(function(data){
            const teamName = data.teamName
            teamArray.push(teamName)
            addManager();
        })

    
}
function addManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your team manager's name?",
            name: "name"
        }, {
            type: "input",
            message: "What is your id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your team manager's email address?",
            name: "email"
        },

        {
            type: "number",
            message: "What is your team manager's office number?",
            name: "officeNumber"
        }
    ]).then(function (data) {
       const manager = new Manager(data.name, data.id, data.email, data.officeNumber)
        teamArray.push(manager);
        addTeamMembers();
    });
}

function addTeamMembers(data) {
    inquirer.prompt([
        {
            type: "list",
            message: "Who would you like to work to death?",
            choices: ["A hopless Intern", "A suspicous Engineer", "None because you're broke"],
            name: "addTeamData"
        }
    ]).then(function (data) {
        switch (data.addTeamData) {
            case "A hopless Intern":
                addIntern();
                break;
            case "A suspicous Engineer":
                addEngineer();
                break;
            case "None because you're broke":
                teamDone();
                break;
        }

    })
}
function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is this noobs name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is this intern's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is this intern's school?",
            name: "school"
        }
    ])

        .then(function (data) {
           
            const intern = new Intern(data.name, data.id, data.email, data.school)
            teamArray.push(intern)
            addTeamMembers()
        });
};
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is this engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is this engineer's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is this engineer's Github profile?",
            name: "github"
        }
    ])

        .then(function (data) {
            const engineer = new Engineer(data.name, data.id, data.email, data.github)
            teamArray.push(engineer)
            addTeamMembers()
        });
};

function teamDone(){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }fs.writeFileSync(outputPath, render(teamArray), "utf-8");
}

startTeam();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!





// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ``
