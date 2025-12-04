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
const ADMIN_URL = "http://localhost:8080/api/admin";
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You are not logged in");
            window.location.href = "index.html";
        }

        function getAuthHeaders() {
            return {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
        }

        // ===================== LIVE TIME =====================
        function updateTime() {
            const now = new Date();
            let h = now.getHours();
            let m = now.getMinutes();
            let s = now.getSeconds();
            let ampm = h >= 12 ? "PM" : "AM";
            h = h % 12 || 12;
            m = m < 10 ? "0" + m : m;
            s = s < 10 ? "0" + s : s;
            document.getElementById("liveTime").innerHTML = `<i class="fa-regular fa-clock me-1"></i>${h}:${m}:${s} ${ampm}`;
        }
        setInterval(updateTime, 1000);
        updateTime();

        // ===================== HELPER =====================
        async function handleResponse(res) {
            if (!res.ok) {
                let msg = await res.text();
                if (!msg) msg = res.statusText;
                throw new Error(`Error ${res.status}: ${msg}`);
            }
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return res.json();
            }
            return res.text();
        }

        // ===================== LOAD EMPLOYEES =====================
        async function loadEmployees() {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:8080/api/admin/users", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                await handleResponse(res);  // this throws errors properly
                const data = await res.json();

                console.log("Employees:", data);
                return data;

            } catch (err) {
                console.error(err);
                alert("Error loading employees: " + err.message);
            }
        }






        let backendRoles = []; // global variable

        async function loadEmpDropdown() {
            try {
                const res = await fetch("http://localhost:8080/api/auth/roles");

                if (!res.ok) {
                    throw new Error("Failed to fetch roles, Status: " + res.status);
                }

                backendRoles = await res.json();   // Save the roles list
                console.log("Loaded roles:", backendRoles);

                const selectRole = document.getElementById("selectRole");
                selectRole.innerHTML = '<option value="">Select Role</option>';

                backendRoles.forEach(role => {
                    const option = document.createElement("option");
                    option.value = role.id;         // role id as value
                    option.textContent = role.name; // Display text
                    selectRole.appendChild(option);
                });

            } catch (err) {
                console.error(err);
                alert("Unable to load roles: " + err.message);
            }
        }



        document.addEventListener("DOMContentLoaded", function () {
            loadEmpDropdown();
        });

        // ===================== ADD EMPLOYEE =====================
        document.getElementById("addBtn").addEventListener("click", async function () {
            window.alert('Aadd button click')
            const empName = document.getElementById("empName").value.trim();
            const empId = document.getElementById("empId").value.trim();
            const password = document.getElementById("password").value.trim();
            // const role = document.getElementById("role").value;

            // console.log(empName, empId, password, role)

            if (!empName || !empId || !password) {
                alert("Please fill all fields!");
                return;
            }

            // const roleMap = { "Admin": 1, "TL": 2, "Employee": 3 };

            const selectedRoleId = document.getElementById("selectRole").value;

            const employeeData = {
                fullName: empName,
                email: empId + "@kavyainfoweb.com",
                password: password,
                active: true,
                role: { id: selectedRoleId },   // <-- directly sending backend id
                teamId: null,
                status: "OFFLINE"
            };

            console.log(employeeData)
            try {
                await addEmployee(employeeData);
                alert("Employee Added Successfully!");
                loadEmployees();
                document.getElementById("empName").value = "";
                document.getElementById("empId").value = "";
                document.getElementById("password").value = "";

            } catch (err) {
                console.error(err);
                alert("Failed to add employee: " + err.message);
            }
        });

        // ===================== DELETE EMPLOYEE =====================
        async function handleDelete(id) {
            if (!confirm("Delete this employee?")) return;
            try {
                await deleteEmployee(id);
                alert("Employee Deleted!");
                loadEmployees();
            } catch (err) {
                console.error(err);
                alert("Failed to delete employee: " + err.message);
            }
        }

        // ===================== LOGOUT =====================
        function logout() {
            if (confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("token");
                window.location.href = "index.html";
            }
        }

        // ===================== BACKEND API FUNCTIONS =====================
        async function addEmployee(employeeData) {
            const res = await fetch(`${ADMIN_URL}/users`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(employeeData)
            });
            return handleResponse(res);
        }

        async function updateEmployee(id, employeeData) {
            const res = await fetch(`${ADMIN_URL}/users/${id}`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify(employeeData)
            });
            return handleResponse(res);
        }

        async function deleteEmployee(id) {
            const res = await fetch(`${ADMIN_URL}/users/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders()
            });
            return handleResponse(res);
        }

        async function getAllUsers() {
            const res = await fetch(`${ADMIN_URL}/users`, {
                method: "GET",
                headers: getAuthHeaders()
            });
            return handleResponse(res);
        }

        async function exportCsv() {
            const res = await fetch(`${ADMIN_URL}/export/csv`, { method: "GET", headers: getAuthHeaders() });
            if (!res.ok) { alert("Failed to export CSV: " + res.status); return; }
            const blob = await res.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "sessions.csv";
            link.click();
        }

        async function exportExcel() {
            const res = await fetch(`${ADMIN_URL}/export/excel`, { method: "GET", headers: getAuthHeaders() });
            if (!res.ok) { alert("Failed to export Excel: " + res.status); return; }
            const blob = await res.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "sessions.xlsx";
            link.click();
        }

        // INITIAL LOAD
        loadEmployees();

        // history
        document.addEventListener("DOMContentLoaded", function(){

    const BACKEND_URL = "http://localhost:8080";
    const tableBody = document.querySelector("#archiveTable tbody");

    const token = localStorage.getItem("token"); // ⬅ GET STORED TOKEN
    if (!token) {
        alert("Unauthorized! Please login again.");
        window.location.href = "login.html";
        return;
    }

    // =============================
    // FETCH ARCHIVE DATA (WITH JWT)
    // =============================
    async function fetchArchiveData(fromDate = '', toDate = '', employeeName = '') {
        try {
            let url = `${BACKEND_URL}/api/admin/sessions/archive?`;
            if(fromDate) url += `fromDate=${fromDate}&`;
            if(toDate) url += `toDate=${toDate}&`;
            if(employeeName) url += `employeeName=${encodeURIComponent(employeeName)}&`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token   // ⬅ JWT HERE
                }
            });

            if(!response.ok) throw new Error("Failed to fetch archive data");

            return await response.json();

        } catch (error) {
            console.error(error);
            alert("Error fetching archive data.");
            return [];
        }
    }

    // =============================
    // RENDER TABLE
    // =============================
    function loadArchiveTable(data){
        tableBody.innerHTML = "";

        if(data.length === 0){
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center">No records found</td></tr>`;
            return;
        }

        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.date}</td>
                <td>${row.user?.fullName || row.employee}</td>
                <td>${row.login}</td>
                <td>${row.logout}</td>
                <td>${row.duration}</td>
                <td>
                  <span class="badge ${row.status === 'Completed' ? 'bg-success' : 'bg-warning'}">
                    ${row.status}
                  </span>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // INITIAL LOAD
    fetchArchiveData().then(loadArchiveTable);

    // FILTER APPLY
    window.applyArchiveFilter = async function(){
        const from = document.getElementById("fromDate").value;
        const to = document.getElementById("toDate").value;
        const name = document.getElementById("filterName").value;

        const filtered = await fetchArchiveData(from, to, name);
        loadArchiveTable(filtered);
    };

    // EXPORT TO EXCEL
    window.exportArchive = function(){
        const from = document.getElementById("fromDate").value;
        const to = document.getElementById("toDate").value;
        const name = document.getElementById("filterName").value;

        let url = `${BACKEND_URL}/api/admin/export/excel?`;
        if(from) url += `fromDate=${from}&`;
        if(to) url += `toDate=${to}&`;
        if(name) url += `employeeName=${encodeURIComponent(name)}&`;

        window.open(url, "_blank");
    };

});

// OPEN SETTINGS
function openSettings() {
    window.location.href = "settings.html";
}

//    login page 
function togglePassword() {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

async function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    document.getElementById("email-error").innerHTML = "";
    document.getElementById("pass-error").innerHTML = "";
    document.getElementById("loading").style.display = "none";

    if (!email) {
        document.getElementById("email-error").innerHTML = "Please enter Email";
        return;
    }
    if (!password) {
        document.getElementById("pass-error").innerHTML = "Please enter Password";
        return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("loading").innerHTML = "Checking...";

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        let data = {};
        try {
            data = await response.json();
        } catch (e) {
            // Prevent JSON parsing error
            data = {};
        }

        if (!response.ok) {
            document.getElementById("loading").style.display = "none";
            document.getElementById("pass-error").innerHTML =
                data.message || "Invalid login credentials";
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", data.email);
        localStorage.setItem("fullName", data.fullName);

        document.getElementById("loading").innerHTML = "Login Successful! Redirecting...";

        setTimeout(() => {
            if (data.role === "EMPLOYEE") {
                window.location.href = "employee.html";
            } else if (data.role === "TEAM_LEADER"|| data.role ==="TL") {
                window.location.href = "teamleader.html";
            } else if (data.role === "ADMIN") {
                window.location.href = "admin.html";
            } else {
                alert("Invalid role from server");
            }
        }, 1000);

    } catch (error) {
        console.log(error);
        document.getElementById("loading").style.display = "none";
        document.getElementById("pass-error").innerHTML = "Server error. Try again.";
    }
}

// report page
const REPORT_URL = "http://localhost:8080/api/reports";

// CHANGE: token → token1
const token1 = localStorage.getItem("token1");

if (!token1) {
    alert("You are not logged in");
    window.location.href = "index.html";
}

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token1}`
    };
}

// ======== LIVE CLOCK ========
function updateClock() {
    const clockEl = document.querySelector('.time');
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    clockEl.innerHTML = `<i class="fa-regular fa-clock me-1"></i>${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// ======== HELPER: FORMAT TIME ========
function formatTime(dateTimeStr) {
    if (!dateTimeStr) return "—";
    const dt = new Date(dateTimeStr);
    let hours = dt.getHours();
    const minutes = dt.getMinutes();
    const seconds = dt.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const mm = minutes < 10 ? "0" + minutes : minutes;
    const ss = seconds < 10 ? "0" + seconds : seconds;
    return `${hours}:${mm}:${ss} ${ampm}`;
}

// ======== HELPER: FORMAT DURATION (hh:mm:ss) ========
function formatDuration(seconds) {
    if (!seconds) return "00:00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}

// ======== FETCH REPORT DATA ========
async function loadReport(date = new Date().toISOString().slice(0, 10)) {
    try {
        // Fetch summary
        const summaryRes = await fetch(`${REPORT_URL}/summary?date=${date}`, { 
            headers: getAuthHeaders() 
        });

        if (!summaryRes.ok) throw new Error("Failed to load summary");
        const summary = await summaryRes.json();

        document.getElementById("totalLogins").innerText = summary.totalLogins || 0;
        document.getElementById("totalShifts").innerText = summary.totalShifts || 0;
        document.getElementById("loginLoss").innerText = summary.loginLoss || 0;
        document.getElementById("overtimeCases").innerText = summary.overtimeCases || 0;

        // Fetch daily logs
        const dailyRes = await fetch(`${REPORT_URL}/daily?date=${date}`, { 
            headers: getAuthHeaders() 
        });

        if (!dailyRes.ok) throw new Error("Failed to load daily logs");
        const dailyLogs = await dailyRes.json();

        const tbody = document.getElementById("dailyLogBody");
        tbody.innerHTML = "";
        dailyLogs.forEach(log => {
            const alerts = log.overtime ? "⚠ Overtime" : "-";
            const empInitials = log.employeeName.split(" ").map(n => n[0]).join("").toUpperCase();

            const row = `
                <tr>
                    <td>${log.date}</td>
                    <td><span class="circle-badge">${empInitials}</span> ${log.employeeName}</td>
                    <td>${formatTime(log.loginTime)}</td>
                    <td>${formatTime(log.logoutTime)}</td>
                    <td>${formatDuration(log.shiftDurationSeconds)}</td>
                    <td>${formatDuration(log.idleTimeSeconds)}</td>
                    <td>${alerts}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

    } catch (err) {
        console.error(err);
        alert("Error loading report: " + err.message);
    }
}

// ======== EXPORT TO EXCEL ========
document.getElementById("exportBtn").addEventListener("click", function () {
    const table = document.querySelector("#reportTable");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Report" });
    XLSX.writeFile(workbook, "report_summary.xlsx");
});

// ======== GO BACK ========
function goBack() {
    window.location.href = "admin.html";
}

// INITIAL LOAD
loadReport();


// setting page

const API_URL = "http://localhost:8080/api/settings";

// CHANGE: token → token2
const token2 = localStorage.getItem("token2");

// ====== Authorization headers ======
function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token2}`
  };
}

// ====== Load settings on page load ======
async function loadSettings() {
  if (!token2) {
    alert("Please login first!");
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch(API_URL, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to load settings");
    const data = await res.json();

    // Fill form fields
    document.getElementById("setName").value = data.name || "";
    document.getElementById("setEmail").value = data.email || "";
    document.getElementById("companyName").value = data.companyName || "";
    document.getElementById("startTime").value = data.officeStartTime || "";
    document.getElementById("endTime").value = data.officeEndTime || "";
    document.getElementById("loginNotify").checked = data.loginNotification || false;
    document.getElementById("offlineNotify").checked = data.offlineNotification || false;
    document.getElementById("reportNotify").checked = data.reportNotification || false;

    // Apply theme
    document.body.setAttribute("data-theme", data.theme || "light");
    localStorage.setItem("theme", data.theme || "light");

  } catch (err) {
    console.error(err);
    alert("Error loading settings: " + err.message);
  }
}

// ====== Save / Update settings ======
async function saveSettings() {
  const payload = {
    name: document.getElementById("setName").value,
    email: document.getElementById("setEmail").value,
    password: document.getElementById("setPass").value, // optional
    companyName: document.getElementById("companyName").value,
    officeStartTime: document.getElementById("startTime").value,
    officeEndTime: document.getElementById("endTime").value,
    loginNotification: document.getElementById("loginNotify").checked,
    offlineNotification: document.getElementById("offlineNotify").checked,
    reportNotification: document.getElementById("reportNotify").checked,
    theme: localStorage.getItem("theme") || "light"
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to save settings");
    const data = await res.json();
    alert("Settings saved successfully!");
  } catch (err) {
    console.error(err);
    alert("Error saving settings: " + err.message);
  }
}

// ====== Theme functions ======
function setTheme(mode) {
  localStorage.setItem("theme", mode);
  document.body.setAttribute("data-theme", mode);
  saveSettings(); // save theme change automatically
}

// ====== Export functions ======
async function exportEmployees() {
  try {
    const res = await fetch(`${API_URL}/export/employees`, { headers: getAuthHeaders() });
    const data = await res.json();
    downloadFile("employees.json", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
    alert("Error exporting employees: " + err.message);
  }
}

async function exportLogs() {
  try {
    const res = await fetch(`${API_URL}/export/logs`, { headers: getAuthHeaders() });
    const data = await res.json();
    downloadFile("logs.json", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
    alert("Error exporting logs: " + err.message);
  }
}

async function clearAllData() {
  if (!confirm("Are you sure? All data will be erased!")) return;
  try {
    const res = await fetch(`${API_URL}/clear`, { method: "DELETE", headers: getAuthHeaders() });
    const message = await res.text();
    alert(message);
    location.reload();
  } catch (err) {
    console.error(err);
    alert("Error clearing data: " + err.message);
  }
}

// ====== Utility ======
function downloadFile(name, content) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
}


// team leader

// ====== Event Listeners ======
document.addEventListener("DOMContentLoaded", loadSettings);

const API_BASE = "http://localhost:8080/api/tl";

// Fetch TL data with JWT token
async function fetchTLData() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Not logged in or token expired!");
            window.location.href = "index.html";
            return [];
        }

        const response = await fetch(`${API_BASE}/employees`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // ✅ Include token
            }
        });

        if (response.status === 403) {
            alert("You do not have permission to access this page!");
            window.location.href = "index.html";
            return [];
        }

        if (!response.ok) throw new Error("Failed to fetch TL data");

        const data = await response.json();
        return data; // array of TLs with employees
    } catch (err) {
        console.error("Error fetching TL data:", err);
        return [];
    }
}

function renderTLTable(tlData) {
    const tbody = document.querySelector("#tlTable tbody");
    tbody.innerHTML = "";

    tlData.forEach(tl => {
        const tr = document.createElement("tr");
        tr.classList.add("tl-row");
        tr.innerHTML = `<td>${tl.fullName || tl.name}</td><td>${tl.employees?.length || 0}</td>`;
        tbody.appendChild(tr);

        // Employee details row
        const empTr = document.createElement("tr");
        const empTd = document.createElement("td");
        empTd.setAttribute("colspan", 2);

        let empTable = `
            <table class="table table-bordered employee-list" style="margin:0; display:none;">
                <thead class="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Login</th>
                        <th>Logout</th>
                        <th>Duration</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${tl.employees?.map(emp => `
                        <tr>
                            <td>${emp.fullName || emp.name}</td>
                            <td>${emp.login || "N/A"}</td>
                            <td>${emp.logout || "N/A"}</td>
                            <td>${emp.duration || "N/A"}</td>
                            <td>${emp.status || "Pending"}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

        empTd.innerHTML = empTable;
        empTr.appendChild(empTd);
        tbody.appendChild(empTr);

        // Toggle employee table on TL row click
        tr.addEventListener("click", () => {
            const list = empTd.querySelector(".employee-list");
            list.style.display = list.style.display === "table" ? "none" : "table";
        });
    });
}

// Fetch and render TL table on page load
fetchTLData().then(data => renderTLTable(data));

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// Live Clock
function updateClock() {
    const clockEl = document.querySelector('.time');
    if (!clockEl) return;
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let ampm = h >= 12 ? "PM" : "AM";
    h = h % 12; h = h ? h : 12;
    m = m < 10 ? "0" + m : m;
    clockEl.innerHTML = `<i class="fa-regular fa-clock me-1"></i>${h}:${m} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

function openSettings() {
    window.location.href = "settings.html";
}
