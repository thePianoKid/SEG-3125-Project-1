var url = new URL(window.location.href);
const bookingPath = "/book.html";

function bookRoger() {
    book("roger");
}

function bookIan() {
    book("ian");
}

function bookGeorge() {
    book("george");
}

function bookErin() {
    book("erin");
}

function bookDavid() {
    book("david");
}

function bookJason() {
    book("jason");
}

function book(employee) {
    url.pathname = bookingPath;
    url.searchParams.set("employee", employee);
    window.location.href = url;
}