
//retrieev the form from the DOM, print out the result
const form = document.querySelector('#fsyForm');
console.log(form);
//add an event listener to the form, listen for the submit event, and print out the result

// If the user selects "one campus",
// but doesn't select ANY campuses,
// Display message "Please choose at least one campus"


// Helper fuction to return chekced campuses
function getCheckedCampuses(campuses) {
    return Array.from(campuses)
                .filter(campus => campus.checked)
                .map(campus => campus.value);
}

// Helper function to return if date is valid
function isDateValid() {
    const dateValue = document.getElementById('availableDate').value;
    const selectedDate = new Date(dateValue);
    const today = new Date();
    return today <= selectedDate;
}

form.addEventListener('submit', event => {
    event.preventDefault();
    document.querySelector('#output').textContent = "";
    const numberOfCampuses = form.travelRange.value;
    const campuses = form.campus;
    console.log(campuses);
    if ((numberOfCampuses === 'one' || numberOfCampuses === 'many') &&
        getCheckedCampuses(campuses).length == 0) {
            console.log("Please choose at least one campus");
            document.querySelector('#output').textContent = "Please choose at least one campus";
        }
    if (numberOfCampuses === 'many' && getCheckedCampuses(campuses).length < 2) {
        console.log("Please choose at least two campuses");
        document.querySelector('#output').textContent = "Please choose at least two campuses";
    }
    if (!isDateValid()) {
        console.log("Please select a valid date");
        document.querySelector('#output').textContent = "Please select a valid date";
    }
    
});