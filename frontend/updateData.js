// 🔥 UPDATE COURSE + QUIZ + CERTIFICATE

function updateCourseData(courseName, score) {

    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    let found = false;

    courses = courses.map(c => {
        if (c.name === courseName) {
            found = true;
            return {
                ...c,
                courseStatus: "completed",
                quizStatus: "completed",
                score: score,
                certificate: score >= 40
            };
        }
        return c;
    });

    if (!found) {
        courses.push({
            name: courseName,
            courseStatus: "completed",
            quizStatus: "completed",
            score: score,
            certificate: score >= 40
        });
    }

    localStorage.setItem("courses", JSON.stringify(courses));
}