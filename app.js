const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require('./lib/htmlRenderer');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


const teamArray = [];
   

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const createTeam = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFile(outputPath, render(teamArray), err => {
        if (err) {
            return console.log(err);
        } else {
            console.log("Hacking the system")
        }
    })
}
function init() {
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
    ]).then(({name, id, email, officeNumber})=> {
        const manager = new Manager(name, id, email, officeNumber)
        teamArray.push(manager);
        addTeamMembers();
    });
}

function addTeamMembers() {
    inquirer.prompt([
        {
            type: "list",
            message: "Who would you like to work to death?",
            choices: ["A hopless Intern", "A suspicous Engineer", "None because you're broke"],
            name: "choices"
        }
    ]).then(({choices}) => {
        switch (choices) {
            case "A hopless Intern":
                addIntern();
                break;
            case "A suspicous Engineer":
                addEngineer();
                break;
            case "None because you're broke":
                createTeam();
                break;
        }
        ;

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

        .then(({name, id, email, school}) => {
            const intern = new Intern(name, id, email, school)
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

        .then(({name, id, email, github}) => {
            const engineer = new Engineer(name, id, email, github)
            teamArray.push(engineer)
            addTeamMembers()
        });
};



// function teamDone() {
//     const teamArray = render(team);
//     fs.writeFile(outputPath, teamArray, (err) =>
//     err ? console.log(err) : console.log("Success!")
//     );
// }

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


