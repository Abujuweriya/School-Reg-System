class Student {
    constructor(firstName, lastName, idNumber, classRoom) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.classRoom = classRoom;
    }
}

class Command {
    registerNewStudent(student) {
        const allStudents = document.getElementById('all-students');
        const row = document.createElement('tr')
        row.innerHTML = `
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.idNumber}</td>
    <td>${student.classRoom}</td>
    <td> <a href='#' class='remove-student'>🛑</td>
    `;

        allStudents.appendChild(row);

    }
    clearAllInputs() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('idNumber').value = '';
        document.getElementById('classRoom').value = '';
    }
    displayAlert(messsage, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(messsage));
        const container = document.querySelector('.container')
        const form = document.getElementById('student-form');

        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    deleteStudent(element) {
        if (element.className === 'remove-student') {
            element.parentElement.parentElement.remove()

        }
    }
}

const handleFormSubmit = (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const idNumber = document.getElementById('idNumber').value;
    const classRoom = document.getElementById('classRoom').value;

    const student = new Student(firstName, lastName, idNumber, classRoom);

    //register new student
    const command = new Command();
    if (firstName === "" || lastName === "" || idNumber === "") {
        command.displayAlert('Please fill out all the inputs', 'alert-warning');
    } else {
        command.registerNewStudent(student);
        command.displayAlert('New student added to the list', 'alert-success')
        command.clearAllInputs();
    }

}
//event listener
document
    .getElementById('student-form')
    .addEventListener('submit', handleFormSubmit);

document.getElementById('all-students').addEventListener('click', function (e) {

    const command = new Command();

    command.deleteStudent(e.target);

    command.displayAlert('student deleted succesfully', 'alert-success')
    e.preventDefault();
})

