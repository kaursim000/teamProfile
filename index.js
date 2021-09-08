const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
// const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");
const generateTeam = require("./util/generateHtml")


function again() {
    inquirer.prompt(
        {
            type: "confirm",
            message: "Would you like to make a new employee?",
            name: "end"
        }
    ).then(response => {
        response.end ? mainMenu() : makeTeam()
    })
}

let employees = []

function makeTeam(){
  const teamFile = generateTeam(employees)
fs.writeFile('./output/team.html', teamFile, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })
  employees = []
}

function mainMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What type of employee is this?",
                name: "role",
                choices: ["Engineer", "Intern", "Manager"],
            },
            {
                type: "input",
                message: "What is the employees name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is the employees email?",
                name: "email",
            },
            {
                type: "number",
                message: "What is the employees ID?",
                name: "id",
            }
        ])
        .then(response => {
            switch (response.role) {
                case "Engineer":
                    newEngineer(response)
                    break;
                case "Intern":
                    newIntern(response)
                    break;
                case "Manager":
                    newManager(response)
                    break;
                default:
                    mainMenu();
            }
        })
    }

function newEngineer(data){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the employee's github?",
            name: "github",
        }
    ])
    .then(response => {
      const engineer = new Engineer(data.name, data.id, data.email, response.github)
      console.log(engineer)
      employees.push(engineer)
      again()
    })
}

function newIntern(data){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the employee's school?",
            name: "school",
        }
    ])
    .then(response => {
        const intern = new Intern(data.name, data.id, data.email, response.school)
      console.log(intern)
      employees.push(intern)
      again()
    })
}

function newManager(data){
    inquirer
    .prompt([
        {
            type: "number",
            message: "What is the employee's office number?",
            name: "officeNumber",
        }
    ])
    .then(response => {
        const manager = new Manager(data.name, data.id, data.email, response.officeNumber)
      console.log(manager)
      employees.push(manager)
      again()
    })
}


mainMenu();

// Employee prompt: basic info
// What type of employee?
// Manager prompt || engineer prompt || intern prompt
// Yes: rerun script || No: End script