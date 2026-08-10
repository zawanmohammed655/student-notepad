

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = -1;


function saveNote() {

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title === "" || content === "") {
        alert("Please enter title and content.");
        return;
    }

    if (editIndex === -1) {

        // CREATE
        const note = {
            title: title,
            content: content,
            date: new Date().toLocaleString()
        };

        notes.push(note);

    } else {

        // UPDATE
        notes[editIndex].title = title;
        notes[editIndex].content = content;

        notes[editIndex].date = new Date().toLocaleString();

        editIndex = -1;

        document.getElementById("saveBtn").textContent = "Add Note";
    }

    localStorage.setItem("notes", JSON.stringify(notes));

    clearForm();
    displayNotes();
}



function displayNotes() {

    const container = document.getElementById("notesContainer");
    const searchText = document
        .getElementById("search")
        .value
        .toLowerCase();

    container.innerHTML = "";

    notes.forEach((note, index) => {

        if (
            note.title.toLowerCase().includes(searchText) ||
            note.content.toLowerCase().includes(searchText)
        ) {

            const noteElement = document.createElement("div");

            noteElement.className = "note";

            noteElement.innerHTML = `
                <h2>${escapeHTML(note.title)}</h2>

                <p>${escapeHTML(note.content)}</p>

                <div class="note-date">
                    📅 ${note.date}
                </div>

                <button
                    class="edit-btn"
                    onclick="editNote(${index})">
                    ✏️ Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteNote(${index})">
                    🗑️ Delete
                </button>
            `;

            container.appendChild(noteElement);
        }
    });
}



function editNote(index) {

    document.getElementById("title").value =
        notes[index].title;

    document.getElementById("content").value =
        notes[index].content;

    editIndex = index;

    document.getElementById("saveBtn").textContent =
        "Update Note";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function deleteNote(index) {

    if (confirm("Are you sure you want to delete this note?")) {

        notes.splice(index, 1);

        localStorage.setItem(
            "notes",
            JSON.stringify(notes)
        );

        displayNotes();
    }
}



function clearForm() {

    document.getElementById("title").value = "";

    document.getElementById("content").value = "";
}


function toggleDarkMode() {

    document.body.classList.toggle("dark");

    const darkModeBtn =
        document.getElementById("darkModeBtn");

    if (document.body.classList.contains("dark")) {

        darkModeBtn.textContent = "☀️ Light";

        localStorage.setItem("darkMode", "enabled");

    } else {

        darkModeBtn.textContent = "🌙 Dark";

        localStorage.setItem("darkMode", "disabled");
    }
}


function loadDarkMode() {

    if (localStorage.getItem("darkMode") === "enabled") {

        document.body.classList.add("dark");

        document.getElementById("darkModeBtn").textContent =
            "☀️ Light";
    }
}



function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// LOAD APP
loadDarkMode();
displayNotes();
