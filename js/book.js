const confirmBookingPath = "/confirm-booking.html";
const availableTimes = ["9AM - 10AM", "11AM - 12PM", "3PM - 3:30PM"];
const btnClassName = "btn btn-secondary";
const outlinedBtnClassName = "btn btn-outline-secondary";
let selectedBtnId;
let selectedDayParam;
let serviceSelect;
let employeeSelect;

window.onload = function() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    // The service parameter can have one of three valid values:
    // email, video or search
    let service = params.service;
    serviceSelect = document.getElementById("service-select");

    let employee = params.employee;
    employeeSelect = document.getElementById("employee-select");

    // Automatically selects the correct service based on what the user selected on the services page
    if (service === null) {
        // Select defaults to the email service
        serviceSelect.value = "email";
    } else {
        serviceSelect.value = service;
    }

    if (employee === null) {
        // Select defaults to the leading firm partner
        employeeSelect.value = "roger";
    } else {
        employeeSelect.value = employee;
    }

    renderAvailableTimes();
}

function renderAvailableTimes() {
    const timeContainer = document.getElementById("avaiable-time-container");
    var timeBtn;
    var flexBreak;

    for (let i=0; i < availableTimes.length; i++) {
        timeBtn = document.createElement("button");
        timeBtn.setAttribute("type", "button");
        selectedBtnId = 0;
        if (i == 0) {
            timeBtn.setAttribute("class", btnClassName);
        } else {
            timeBtn.setAttribute("class", outlinedBtnClassName);
        }

        timeBtn.setAttribute("id", "available-time-" + i.toString());
        timeBtn.innerHTML = availableTimes[i];

        timeBtn.addEventListener('click', function() { selectTime(i); }, false);

        flexBreak = document.createElement("div");
        flexBreak.setAttribute("class", "flex-break");

        timeContainer.append(timeBtn, flexBreak);
    }
}

function selectTime(btnId) {
    selectedBtnId = btnId;
    var timeBtn;
    for (let i=0; i < availableTimes.length; i++) {
        timeBtn = document.getElementById("available-time-"+i.toString());
        if (btnId == i) {
            timeBtn.setAttribute("class", btnClassName);
        } else {
            timeBtn.setAttribute("class", outlinedBtnClassName);
        }
    }
}

function confirmBooking() {
    var url = new URL(window.location.href);  
    url.pathname = confirmBookingPath;
    url.searchParams.set("date", selectedDayParam.getDate());
    url.searchParams.set("month", selectedDayParam.getMonth());
    url.searchParams.set("year", selectedDayParam.getFullYear());
    url.searchParams.set("time", document.getElementById("available-time-"+selectedBtnId).innerHTML);

    url.searchParams.set("employee", employeeSelect.options[employeeSelect.selectedIndex].text);
    url.searchParams.set("service", serviceSelect.options[serviceSelect.selectedIndex].text);
    window.location.href = url;
}

(function($) {

	"use strict";

	document.addEventListener('DOMContentLoaded', function(){
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth(),
        monthTag = ["January","February","March","April","May","June","July","August","September","October","November","December"],
        day = today.getDate(),
        days = document.getElementsByTagName('td'),
        selectedDay,
        setDate,
        daysLen = days.length;
// options should like '2014-01-01'
    function Calendar(selector, options) {
        this.options = options;
        this.draw();
    }
    
    Calendar.prototype.draw  = function() {
        this.getCookie('selected_day');
        this.getOptions();
        this.drawDays();
        var that = this,
            reset = document.getElementById('reset'),
            pre = document.getElementsByClassName('pre-button'),
            next = document.getElementsByClassName('next-button');
            
            pre[0].addEventListener('click', function(){that.preMonth(); });
            next[0].addEventListener('click', function(){that.nextMonth(); });
            reset.addEventListener('click', function(){that.reset(); });
        while(daysLen--) {
            days[daysLen].addEventListener('click', function(){that.clickDay(this); });
        }
    };
    
    Calendar.prototype.drawHeader = function(e) {
        var headDay = document.getElementsByClassName('head-day'),
            headMonth = document.getElementsByClassName('head-month');

            e?headDay[0].innerHTML = e : headDay[0].innerHTML = day;
            headMonth[0].innerHTML = monthTag[month] +" - " + year;        
     };
    
    Calendar.prototype.drawDays = function() {
        selectedDayParam = selectedDay = new Date(year, month, day);
        var startDay = new Date(year, month, 1).getDay(),
            nDays = new Date(year, month + 1, 0).getDate(),
            n = startDay;
        for(var k = 0; k <42; k++) {
            days[k].innerHTML = '';
            days[k].id = '';
            days[k].className = '';
        }

        for(var i  = 1; i <= nDays ; i++) {
            days[n].innerHTML = i; 
            n++;
        }
        
        for(var j = 0; j < 42; j++) {
            if(days[j].innerHTML === ""){
                
                days[j].id = "disabled";
                
            }else if(j === day + startDay - 1){
                if((this.options && (month === setDate.getMonth()) && (year === setDate.getFullYear())) || (!this.options && (month === today.getMonth())&&(year===today.getFullYear()))){
                    this.drawHeader(day);
                    days[j].id = "today";
                }
            }
            if(selectedDay){
                if((j === selectedDay.getDate() + startDay - 1)&&(month === selectedDay.getMonth())&&(year === selectedDay.getFullYear())){
                days[j].className = "selected";
                this.drawHeader(selectedDay.getDate());
                }
            }
        }
    };
    
    Calendar.prototype.clickDay = function(o) {
        var selected = document.getElementsByClassName("selected"),
            len = selected.length;
        if(len !== 0){
            selected[0].className = "";
        }
        o.className = "selected";
        selectedDayParam = selectedDay = new Date(year, month, o.innerHTML);
        this.drawHeader(o.innerHTML);
        this.setCookie('selected_day', 1);
        
    };
    
    Calendar.prototype.preMonth = function() {
        if(month < 1){ 
            month = 11;
            year = year - 1; 
        }else{
            month = month - 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.nextMonth = function() {
        if(month >= 11){
            month = 0;
            year =  year + 1; 
        }else{
            month = month + 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.getOptions = function() {
        if(this.options){
            var sets = this.options.split('-');
                setDate = new Date(sets[0], sets[1]-1, sets[2]);
                day = setDate.getDate();
                year = setDate.getFullYear();
                month = setDate.getMonth();
        }
    };
    
     Calendar.prototype.reset = function() {
         month = today.getMonth();
         year = today.getFullYear();
         day = today.getDate();
         this.options = undefined;
         this.drawDays();
     };
    
    Calendar.prototype.setCookie = function(name, expiredays){
        if(expiredays) {
            var date = new Date();
            date.setTime(date.getTime() + (expiredays*24*60*60*1000));
            var expires = "; expires=" +date.toGMTString();
        }else{
            var expires = "";
        }
        document.cookie = name + "=" + selectedDay + expires + "; path=/";
    };
    
    Calendar.prototype.getCookie = function(name) {
        if(document.cookie.length){
            var arrCookie  = document.cookie.split(';'),
                nameEQ = name + "=";
            for(var i = 0, cLen = arrCookie.length; i < cLen; i++) {
                var c = arrCookie[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                    
                }
                if (c.indexOf(nameEQ) === 0) {
                    selectedDayParam = selectedDay =  new Date(c.substring(nameEQ.length, c.length));
                }
            }
        }
    };

    var calendar = new Calendar();
}, false);

})(jQuery);
