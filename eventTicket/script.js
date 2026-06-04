const form = document.querySelector('#ticketForm');

// Helper function to return if date is valid
function isDateValid() {
    const dateValue = document.getElementById('eventDate').value;
    const selectedDate = new Date(dateValue);
    const today = new Date();
    return today <= selectedDate;
}

// Helper function to dynamically display student ID field or accessCode field based on ticket type
function displayCodeFields() {
    const guestType = form.guestType.value;
    const studentIdField = document.getElementById('studentIdField');
    const accessCodeField = document.getElementById('accessCodeField');
    if (guestType === 'student') {
        studentIdField.classList.remove('hidden1');
        accessCodeField.classList.add('hidden2');
    } else if (guestType === 'guest') {
        studentIdField.classList.add('hidden1');
        accessCodeField.classList.remove('hidden2');
    } else {
        studentIdField.classList.add('hidden1');
        accessCodeField.classList.add('hidden2');
    }
}

// Validate form on submit, including checking if date is valid
// and checking if student id is 9 digits
// and checking if access code is "EVENT131"
// and dynamically showing/hiding student ID and access code fields based on ticket type selection
// and displaying appropriate error messages in the output div
// if successfully submitted, display "Ticket Created" and the ticket details in the output div

form.guestType.addEventListener('change', displayCodeFields);

form.addEventListener('submit', event => {
    event.preventDefault();
    document.querySelector('#output').textContent = "";
    const guestType = form.guestType.value;
    const studentId = form.studentId.value;
    const accessCode = form.accessCode.value;

    if (!isDateValid()) {
        console.log("Please select a valid date");
        document.querySelector('#output').textContent = "Please select a valid date";
        return;
    }
    if (guestType === 'student') {
        if (!/^\d{9}$/.test(studentId)) {
            console.log("Student ID must be 9 digits");
            document.querySelector('#output').textContent = "Student ID must be 9 digits";
            return;
        }
    } else if (guestType === 'guest') {
        if (accessCode !== 'EVENT131') {
            console.log("Access code is incorrect");
            document.querySelector('#output').textContent = "Access code is incorrect";
            return;
        }
    }
    console.log("Ticket Created");
    const ticketDetails = `${form.firstName.value} ${form.lastName.value}\n${guestType}\n${form.eventDate.value}`;
    document.querySelector('#output').textContent = "Ticket Created\n" + ticketDetails;
});