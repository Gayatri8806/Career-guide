/* ================= NAVIGATION ================= */

function goToHome() {
    window.location.href = "Home.html";
}

function goToQuiz() {
    window.location.href = "Quize.html";
}

function goToCourses() {
    window.location.href = "course.html"; // FIXED (was course.html)
}

function goToJobs() {
    window.location.href = "jobs.html";
}

function goToProjects() {
    window.location.href = "project.html";
}

/* ================= LOGOUT ================= */

function logout() {
    localStorage.clear(); // optional: clear session data
    alert("Logged out successfully!");
    window.location.href = "login.html";
}

/* ================= PASSWORD TOGGLE ================= */

function togglePassword() {
    let pass = document.getElementById("password");
    if (!pass) return;

    pass.type = pass.type === "password" ? "text" : "password";
}

/* ================= LOGIN FUNCTION ================= */

async function loginUser(event) {
    event.preventDefault();

    let emailEl = document.getElementById("email");
    let passEl = document.getElementById("password");
    let capInput = document.getElementById("captchaInput");
    let capText = document.getElementById("captchaText");

    if (!emailEl || !passEl || !capInput || !capText) {
        alert("Form elements missing ❌");
        return false;
    }

    let email = emailEl.value.trim();
    let password = passEl.value.trim();
    let captchaInput = capInput.value.trim();
    let captchaText = capText.innerText.trim();

    // Validation
    if (!email || !password) {
        alert("Please fill all fields ❌");
        return false;
    }

    if (captchaInput !== captchaText) {
        alert("Invalid Captcha ❌");
        return false;
    }

    try {
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        console.log("LOGIN RESPONSE:", data);

        if (data.status === "success" || data.success === true) {
            alert("Login Successful ✅");

            // optional session store
            localStorage.setItem("loggedInUser", email);

            window.location.href = "Home.html";
        } else {
            alert("Invalid Email or Password ❌");
        }

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        alert("Cannot connect to server ❌");
    }

    return false;
}

/* ================= GENERIC NAV HELPERS ================= */

function openCourse(page) {
    window.location.href = page;
}

function openJobPage(page) {
    window.location.href = page;
}

function openProjectPage(page) {
    window.location.href = page;
}