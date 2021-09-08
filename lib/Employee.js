// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        // this.role="Employee";
    }
    getName() {
        return (`Name: ${this.name}`);
    }
    getId() {
        return (`ID: ${this.id}`);
    }
    getEmail() {
        return (`Email: ${this.email}`)
    }
    getRole() {
        return (`Employee`)
    }
}

module.exports = Employee;