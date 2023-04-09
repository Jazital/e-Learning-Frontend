var isDevelopmentMode = true;
var url = '';
if (isDevelopmentMode) {
    url = "http://elearning-backend.local/api/v1";
}
else {
    url = "https://pandagiantltd.com/e-learning-backend-api/api/v1";
}

exports.JazitalBackendBaseURL = url;
