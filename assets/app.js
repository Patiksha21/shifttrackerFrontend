// ================== STATIC EMPLOYEES ==================
let employees = [
    { short: "JD", name: "John Doe", time: "08:12 AM", duration: "03:03:27", status: "online" },
    { short: "SL", name: "Sarah Lee", time: "08:15 AM", duration: "Remote 03:00:14", status: "online" },
    { short: "MC", name: "Mark Connor", time: "08:18 AM", duration: "Remote 02:57:11", status: "online" },
    { short: "ED", name: "Emily Davis", time: "08:20 AM", duration: "Automation Disconnected", status: "offline" },
];


// ================== TABLE RENDER FUNCTION ==================
function loadTable(filter = "all") {
    const tbody = document.querySelector("#employeeTable tbody");
    tbody.innerHTML = "";

    let filtered = employees;

    if (filter === "online") filtered = employees.filter(e => e.status === "online");
    if (filter === "offline") filtered = employees.filter(e => e.status === "offline");

    filtered.forEach(emp => {
        let statusBadge =
            emp.status === "online"
                ? `<span class="badge-status online">Online</span>`
                : `<span class="badge-status offline">Disconnected</span>`;

        let durationBadge = emp.duration.includes("Remote")
            ? `<span class="yellow-badge">${emp.duration}</span>`
            : emp.duration.includes("Disconnected")
            ? `<span class="red-badge">${emp.duration}</span>`
            : emp.duration;

        tbody.innerHTML += `
            <tr>
                <td><span class="badge-circle">${emp.short}</span> ${emp.name}</td>
                <td>${emp.time}</td>
                <td>${durationBadge}</td>
                <td>${statusBadge}</td>
            </tr>
        `;
    });
}

loadTable();


// ================== FILTER TABS WORKING ==================
document.addEventListener("DOMContentLoaded", function() {

    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", function(event) {

            event.preventDefault();

            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            loadTable(this.getAttribute("data-filter"));
        });
    });

});





// ================== ADD NEW EMPLOYEE ==================
document.getElementById("addBtn").addEventListener("click", () => {

    let name = document.getElementById("empName").value;
    let time = document.getElementById("loginTime").value;
    let duration = document.getElementById("duration").value;
    let status = document.getElementById("status").value;

    if (!name || !time || !duration) {
        alert("Please fill all fields");
        return;
    }

    let short = name.split(" ").map(w => w[0]).join("").toUpperCase();

    employees.push({
        short,
        name,
        time,
        duration,
        status
    });

    loadTable();
});


// ================= CSV EXPORT FUNCTION ==================
function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");

    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);
    downloadLink.click();
}

// ================= EXPORT TABLE TO CSV ==================
function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText.replace(/,/g, "")); 
        }
        csv.push(row.join(","));
    }

    downloadCSV(csv.join("\n"), filename);
}

// ================= EXPORT BUTTON CLICK ==================
document.querySelector('.btn-export').addEventListener('click', function () {
    exportTableToCSV("employee_report.csv");
});

// VIEW REPORTS BUTTON
document.querySelector('.btn-view-report')?.addEventListener('click', function () {
    alert("Opening Reports...");
});


// =============== SIDEBAR ACTIVE SWITCH ===============
// const sidebarButtons = document.querySelectorAll('.menu-item');

// sidebarButtons.forEach(btn => {
//     btn.addEventListener('click', function () {
//         document.querySelector('.menu-item.active')?.classList.remove('active');
//         this.classList.add('active');
//     });
// });


// Sidebar Active Switch
const sidebarButtons = document.querySelectorAll('.menu-item');

sidebarButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelector('.menu-item.active')?.classList.remove('active');
        this.classList.add('active');
    });
});

// PAGE SWITCH for Sidebar
document.querySelector(".menu-item:nth-child(1)").addEventListener("click", function () {
    document.getElementById("shiftPage").style.display = "block";
    document.getElementById("archivePage").style.display = "none";
});

document.querySelector(".menu-item:nth-child(2)").addEventListener("click", function () {
    document.getElementById("shiftPage").style.display = "none";
    document.getElementById("archivePage").style.display = "block";
});

// ============ LIVE CLOCK FUNCTION ============
function updateClock() {
    const clockEl = document.querySelector('.time');
    const now = new Date();

    // Get hours, minutes, seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Format AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // handle 0 => 12

    // Add leading zeros
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Update clock element
    clockEl.innerHTML = `<i class="fa-regular fa-clock me-1"></i>${hours}:${minutes}:${seconds} ${ampm}`;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // initial call

document.addEventListener("DOMContentLoaded", function () {
    const filterBtn = document.querySelector(".filter-btn");
    const filterPanel = document.getElementById("filterPanel");

    if (filterBtn) {
        filterBtn.addEventListener("click", () => {
            filterPanel.style.display =
                filterPanel.style.display === "block" ? "none" : "block";
        });
    }
});

// logout function
function logout() {
    // Example: login page redirect
    window.location.href = "Login.html";
}
    
