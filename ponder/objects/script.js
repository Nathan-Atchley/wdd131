const aCourse = {
    name: "Dynamic Web Fundamentals",
    code: "WDD131",
    sections: [
        {
            sectionNum: "1",
            roomNum: "STC 247",
            enrolled: 24,
            days: "TTh",
            instructor: "Brother Warner"
        },
        {
            sectionNum: "2",
            roomNum: "STC 248",
            enrolled: 22,
            days: "MWF",
            instructor: "Brother Smith"
        }
    ],
    enrollStudent: function(sectionNum) {
        // Find the section from the array
        const sectionIndex = this.sections.findIndex(s => s.sectionNum === sectionNum);
        this.sections[sectionIndex].enrolled++;
        renderSections(this.sections);
    }
}

function sectionTemplate(section) {
    return `<tr>
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td></tr>`
}

function renderSections(sections) {
const html = sections.map(sectionTemplate);
document.querySelector("#sections").innerHTML = html.join("");
}

renderSections(aCourse.sections);

document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.enrollStudent(sectionNum);
});