const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function buildPage() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
}

class App {
    constructor() {
        this.employees = [];
        this.employeePrompt = [
            {
                type: "input",
                message: "What is your name?",
                name: "name"
            }, {
                type: "input",
                message: "What is your email?",
                name: "email"
            }, {
                type: "input",
                message: "Do you have an ID and what is it?",
                name: "id"
            }
        ];

        this.engineerPrompt = this.employeePrompt.concat([
            {
                type: "input",
                message: "Whar is your github?",
                name: "github"
            }
        ]);

        this.internPrompt = this.employeePrompt.concat([
            {
                type: "input",
                message: "What school do you go to?",
                name: "school"
            }
        ]);

        this.managerPrompt = this.employeePrompt.concat([
            {
                type: "input",
                message: "what is your office number?",
                name: "officeNumber"
            }
        ]);
    }
    //start
    createTeam() {
        this.newEmployee(); //next.Employee
    }
    //end 
    finishTeam() {
        console.log("You're overbudget! Fire somone!")
    }

//next Employee
    newEmployee() {

        this.teamCreation().then((teamChoice) => {
            if (teamChoice === "finishTeam") {
                this.render();
                this.finishTeam();
            } else {
                this.teamCreation();
                this.promptData(teamChoice).then((data) => {
                    switch (teamChoice) {
                        case "Engineer":
                            this.employees.push(new Engineer(data.name, data.id, data.email, data.github));
                            break;
                        case "Intern":
                            this.employees.push(new Intern(data.name, data.id, data.email, data.school));
                            break;
                        case "Manager":
                            this.employees.push(new Manager(data.name, data.id, data.email, data.officeNumber));
                            break;
                        default:
                            buildPage();
                    }

                })
            }
        });

    }

    teamCreation = () => {

        return inquirer.prompt([
            {
                type: "list",
                message: "Who would you like to add to the team?",
                name: "teamChoice",
                choices: [
                    "Engineer",
                    "Intern",
                    "Manager",
                    "finishTeam"
                ]
            }
        ]).then(function (data) {
            return (data.teamChoice);
        }).catch(function (error) {
            console.log(error);
        });
    };

    promptInfo(teamChoice) {
        switch (teamChoice) {
            case "Engineer":
                return inquirer.prompt(this.engineerPrompt).then(function (data) {
                    return data;
                });
            case "Intern":
                return inquirer.prompt(this.internPrompt).then(function (data) {
                    return data;
                });
            case "Manager":
                return inquirer.prompt(this.mangerPrompt).then(function (data) {
                    return data;
                });
        }
    }

    render(){
        fs.readFile('templates/main.html', 'utf8',(err,htmlString) => {
            htmlString = htmlString.split("<script></script>").join(this.getScript)
        })
    }



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
// for the provided `render` function to work! ```
