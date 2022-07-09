(function () {
    const result = document.querySelector("#result")
    const createResult = document.querySelector("#createResult")

    window.onload = loadListAttend()


    document.getElementById('edit-attendance').addEventListener('click', (e) => {
        e.preventDefault()
        var select = document.getElementById('attendID')
        var option = select.options[select.selectedIndex]
        var title = document.getElementById('attendTitle').value
        var date = document.getElementById('attendDate').value
        const [day, month, year] = date.split('-');
        date = new Date(+year, month - 1, +day);
        console.log(date)
        var params = 'title=' + title + '&date=' + date
        sendXmlHttpRequest('put', '/attendance?attendanceId=' + option.value,
            function (data) {
                for (var response of data) {
                    result.innerHTML = response.message
                    loadListAttend()
                    //console.log(response)
                }
            },
            function (error) {
                var resList = ""
                for (var response of error) {
                    resList += response.message + "<br>"
                    console.log(response)
                }
                result.innerHTML = resList
            }, params)
    })

    document.getElementById('createAttendance').addEventListener('click', (e) => {
        e.preventDefault()
        var title = document.getElementById('createAttendTitle').value
        var date = document.getElementById('createAttendDate').value
        console.log(date)
        var params = 'title=' + title + '&date=' + date
        sendXmlHttpRequest('post', '/attendance',
            function (data) {
                createResult.innerHTML = data.message
                loadListAttend()
                //console.log(data.message)
            },
            function (error) {
                var resList = ""
                for (var response of error) {
                    resList += response.message + "<br>"
                    console.log(response)
                }
                createResult.innerHTML = resList
            }, params)
    })

    document.getElementById("deleteAttendance").addEventListener('click', (e) => {
        e.preventDefault()
        var select = document.getElementById('attendID')
        var option = select.options[select.selectedIndex]
        sendXmlHttpRequest('delete', '/attendance?attendanceId=' + option.value,
            function (data) {
                //console.log(data.message)
                result.innerHTML = data.message
                loadListAttend()
            },
            function (error) {
                var errorList
                for (var res in error) {
                    errorList += res.message + "<br>"
                }
                result.innerHTML = errorList
            })
    })
    function loadListAttend() {
        sendXmlHttpRequest('get', '/attendance',
            function (data) {
                let table = ""
                var i = 1;
                for (attendance of data) {
                    table += "<tr class='hover:bg-gray-100'>" +
                        "<td" +
                        " class='p-4 whitespace-nowrap text-base font-medium text-gray-900'" +
                        ">" +
                        i +
                        "</td>" +
                        "<td" +
                        " class='p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0'" +
                        ">" +
                        "<div" +
                        " class='text-sm font-normal text-gray-500'" +
                        ">" +
                        "<div" +
                        " class='text-base font-semibold text-gray-900'" +
                        ">" +
                        attendance.title +
                        "</div>" +
                        "</div>" +
                        "</td>" +
                        "<td" +
                        " class='p-4 items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0'" +
                        ">" +
                        "<div" +
                        " class='text-sm font-normal text-gray-500'" +
                        ">" +
                        "<div" +
                        " class='text-base font-semibold text-gray-900'" +
                        ">" +
                        dateFormatter(attendance.date) +
                        "</div>" +
                        "</div>" +
                        "</td>" +
                        "</tr>"
                    i++;
                }
                document.getElementById('attendance-list').innerHTML = table


                let list = ""
                document.getElementById('attendTitle').value = data[0].title
                document.getElementById('attendDate').value = dateFormatter(data[0].date)
                for (attendance of data) {
                    list += "<option value=" + attendance._id + ">" + attendance.title + "</option>"
                }
                //console.log(list);
                document.getElementById('attendID').innerHTML = list
            },
            function (error) {
                console.log(error.response);
                //result.innerHTML = error.response
            })
    }
    function dateFormatter(ISOdate) {
        ISOdate = new Date(ISOdate)
        ISOdate.setDate(ISOdate.getDate() + parseInt(1));
        return ISOdate.toISOString().replace(/T.*/, '').split('-').reverse().join('-')
    }
})();

function showTitle(event) {
    sendXmlHttpRequest('get', '/attendance?attendanceId=' + event.target.value,
        function (data) {
            document.getElementById('attendTitle').value = data.title
            var ISOdate = new Date(data.date)
            ISOdate.setDate(ISOdate.getDate() + parseInt(1));
            document.getElementById('attendDate').value = ISOdate.toISOString().replace(/T.*/, '').split('-').reverse().join('-')
            //console.log(data)
            result.innerHTML = ""
        },
        function (error) {
            //console.log(error);
            result.innerHTML = error.message
        })
}

