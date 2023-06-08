window.onload = function() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    document.getElementById("msg").innerText = `We can't wait to meet with you ${params.firstName}!`;
}