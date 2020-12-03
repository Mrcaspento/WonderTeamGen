const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee")
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { OutgoingMessage } = require("http");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let teamArray = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
addManager();
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
        const name = data.name;
        const id = 420;
        const email = data.email;
        const officeNumber = data.officeNumber;
        const teamMember = new Manager(name, id, email, officeNumber);
        teamArray.push(teamMember);
        addTeamMembers();
    });
}

function addTeamMembers(data) {
    inquirer.prompt([
        {
            type: "list",
            message: "Who would you like to work to death?",
            choices: ["A hopless Intern", "A suspicous Engineer", "None because you're broke"],
            name: "addCoworker"//addmemberdata
        }
    ]).then(function (data) {
        switch (data.addCoWorker) {
            case "A hopless Intern":
                addIntern();
                break;
            case "A suspicous Engineer":
                addEngineer();
                break;
            case "None because you're broke":
                completeTeam();
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
            const name = data.name
            const id = finalTeamArray.length + 1
            const email = data.email
            const school = data.school
            const teamMember = new Intern(name, id, email, school)
            teamArray.push(teamMember)
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
            const name = data.name
            const id = finalTeamArray.length + 1
            const email = data.email
            const github = data.github
            const teamMember = new Engineer(name, id, email, github)
            teamArray.push(teamMember)
            addTeamMembers()
        });
};

function teamDone(){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }fs.writeFileSync(outputPath, render(teamArray), "utf-8");
}


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
