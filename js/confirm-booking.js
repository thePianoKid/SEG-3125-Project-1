months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

window.onload = function() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    let splitName = params.employee.split(" -");

    document.getElementById("meeting-details").innerText = `Meeting with ${splitName[0]} to discuss ${params.service}`;
    document.getElementById("date-details").innerText = `Date:  ${months[parseInt(params.month)]} ${params.date} ${params.year}`;
    document.getElementById("time-details").innerText = `Time: ${params.time}`

}