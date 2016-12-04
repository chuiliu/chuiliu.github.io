window.onload = function() {
    var calendar = document.querySelector('.calendar');
    var monthD = document.querySelector('.month');
    var dateD = document.querySelector('.date');

    var now = new Date();
    var date = now.getDate();
    var dateBefore = new Date(now.getTime() - 24 * 3600 * 1000).getDate();
    var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = monthArr[now.getMonth()];

    monthD.innerText = month;
    dateD.innerText = dateBefore;
    dateD.dataset['date'] = date;
    calendar.classList.add('update');
};