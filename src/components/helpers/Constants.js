var isDevelopmentMode = false;
var url = '';
if (isDevelopmentMode) {
    url = "http://elearning-backend.local/api/v1";
} else {
    url = "https://elearning.ospoly.edu.ng/e-learning-backend-api/api/v1";
}

exports.JazitalBackendBaseURL = url;


// Open nav menu
exports.openNavMenu = () => {
    var element = document.getElementById("main-wrapper");
    element.classList.add("menu-toggle");

    var navIcon = document.querySelector(".hamburger");
    navIcon.classList.add("is-active");
}

// Close nav menu
exports.closeNavMenu = () => {
    var element = document.getElementById("main-wrapper");
    element.classList.remove("menu-toggle");

    var navIcon = document.querySelector(".hamburger");
    navIcon.classList.remove("is-active");
}
