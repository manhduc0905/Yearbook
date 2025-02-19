// Show the relevant tab
function showTab(tabId) {
    document.getElementById("students").style.display = "none";
    document.getElementById("group-photos").style.display = "none";
    document.getElementById(tabId).style.display = "block";
}

// Function to convert Google Drive link to a direct image URL
function convertDriveLink(url) {
    const match = url.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=s4000` : url;
}

// Add a new student
function addStudent() {
    let studentName = prompt("Enter the student's name:");
    let studentImage = prompt("Enter the Google Drive image URL:");

    if (studentName && studentImage) {
        let convertedImage = convertDriveLink(studentImage);

        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push({ name: studentName, image: convertedImage });

        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }
}

// Edit student details
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    const name = prompt("Edit the student's name:", student.name);
    const imageUrl = prompt("Edit the image URL:", student.image);

    if (name && imageUrl) {
        students[index] = { name, image: convertDriveLink(imageUrl) };
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }
}

// Remove a student
function removeStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);

    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
}

// Render students
function renderStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let gallery = document.getElementById('students-gallery');
    gallery.innerHTML = '';

    students.forEach((student, index) => {
        let studentDiv = document.createElement('div');
        studentDiv.classList.add('student');
        studentDiv.innerHTML = `
            <img class="photo" src="${student.image}" alt="${student.name}">
            <p>${student.name}</p>
            <button style="background-color: green; color: white;" onclick="editStudent(${index})">Edit</button>
            <button style="background-color: red; color: white;" onclick="removeStudent(${index})">Remove</button>
        `;
        gallery.appendChild(studentDiv);
    });

    attachImageEventListeners(); // Ensures images get click event listener
}

function addGroupPhoto() {
    let groupName = prompt("Enter the group name:");
    let groupImage = prompt("Enter the Google Drive image URL:");

    if (groupName && groupImage) {
        let convertedImage = convertDriveLink(groupImage);

        let groups = JSON.parse(localStorage.getItem('groups')) || [];
        groups.push({ name: groupName, image: convertedImage });

        localStorage.setItem('groups', JSON.stringify(groups));
        renderGroupPhotos();
    }
}

// Edit group details
function editGroupPhoto(index) {
    let groups = JSON.parse(localStorage.getItem('groups')) || [];
    const group = groups[index];

    const name = prompt("Edit the group name:", group.name);
    const imageUrl = prompt("Edit the image URL:", group.image);

    if (name && imageUrl) {
        groups[index] = { name, image: convertDriveLink(imageUrl) };
        localStorage.setItem('groups', JSON.stringify(groups));
        renderGroupPhotos();
    }
}

// Remove a group
function removeGroupPhoto(index) {
    let groups = JSON.parse(localStorage.getItem('groups')) || [];
    groups.splice(index, 1);

    localStorage.setItem('groups', JSON.stringify(groups));
    renderGroupPhotos();
}

// Render group photos
function renderGroupPhotos() {
    let groups = JSON.parse(localStorage.getItem('groups')) || [];
    let gallery = document.getElementById('groups-gallery');
    gallery.innerHTML = '';

    groups.forEach((group, index) => {
        let groupDiv = document.createElement('div');
        groupDiv.classList.add('group');
        groupDiv.innerHTML = `
            <img class="photo" src="${group.image}" alt="${group.name}">
            <button style="background-color: green; color: white;" onclick="editGroupPhoto(${index})">Edit</button>
            <button style="background-color: red; color: white;" onclick="removeGroupPhoto(${index})">Remove</button>
        `;
        gallery.appendChild(groupDiv);
    });

    attachImageEventListeners(); // Ensures images get click event listener
}

// Attach click event listeners to images for fullscreen effect
function attachImageEventListeners() {
    document.querySelectorAll('.photo').forEach(img => {  // Fixed selector
        img.addEventListener('click', function () {
            let fullscreenOverlay = document.createElement('div');
            fullscreenOverlay.classList.add('fullscreen');
            fullscreenOverlay.innerHTML = `<img src="${this.src}" alt="Fullscreen Image">`;

            document.body.appendChild(fullscreenOverlay);
            fullscreenOverlay.addEventListener('click', () => fullscreenOverlay.remove());
        });
    });
}

// Load students and group photos on page load
window.onload = function() {
    renderStudents();
    renderGroupPhotos();
};
