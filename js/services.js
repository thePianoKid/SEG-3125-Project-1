var url = new URL(window.location.href);
const bookingPath = "/book.html";

// The service parameter can have one of three valid values:
// email, video or search
function bookEmail() {
    book("email");
}

function bookVideo() {
    book("video");
}

function bookSearch() {
    book("search");
}

function book(service) {
    url.pathname = bookingPath;
    url.searchParams.set("service", service);
    window.location.href = url;
}