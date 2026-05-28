// 1. Arrays
//                0         1        2         3
let names = ["Nathan", "Ashley", "Amber", "Zack"];
console.log(names);

console.log(names[2])

let grades = [90, 85, 92, 88];
console.log(grades);

// 2. Objects
let people = [
    {
        name: "Nathan",
        age: 28,
        classes: [{
            name: "WDD131",
            grade: 90
        },
        {   
            name: "cse132",
            grade: 85
        }]
    },
    {
        name: "Ashley",
        age: 28,
        classes: [{
            name: "WDD131",
            grade: 67
        },
        {   
            name: "cse132",
            grade: 56
        }]
    },
    {
        name: "Amber",
        age: 28,
        classes: [{
            name: "WDD131",
            grade: 96
        },
        {   
            name: "cse132",
            grade: 84
        }]
    },
    {
        name: "Zack",
        age: 25,
        classes: [{
            name: "WDD131",
            grade: 77
        },
        {   
            name: "cse132",
            grade: 89
        }]
    }
];

console.log(people[3].name);
console.log(people[3].classes[0].name);
console.log(people[3].classes[0].grade);

// 3. Array Methods
people.push({
    name: "John",
    age: 30,
    classes: [{
        name: "WDD131",
        grade: 80
    },
    {   
        name: "cse132",
        grade: 75
    }]
});

people.forEach((thes) => {
    console.log(thes.name);
});

let namesArray = people.map((thes) => {
    return thes.name;
});

console.log(namesArray);


let filteredPeople = people.filter((thes) => {
    return thes.age === 28;
});

console.log(filteredPeople);

let passedClasses = people.reduce((acc, thes) => {
    let passed = thes.classes.filter((cls) => cls.grade >= 70);
    return acc.concat(passed);
}, []);

console.log(passedClasses);

let index = people.indexOf(people.find((thes) => thes.name === "Amber"));
console.log(index);

