(function () {
    const result = document.querySelector("#resultevent")
    document.getElementById('attendance-button').addEventListener('click', (e) => {
        e.preventDefault()
        //const data = new FormData(document.getElementById('form'))
        sendXmlHttpRequest('get', '/attendance',
            function (data) {
                let list=""
                var i=1;
                for (attendance of data) {    
                    var date = attendance.date     
                    list+="<tr>" +
                        "<td>"+i+"</td>"+
                        "<td>"+attendance.title+"</td>"+
                        "<td>"+date.toISOString().slice(0, 10)+"</td>"+
                        "</tr>";
                    i++;
                }
                document.getElementById('attendance-list').innerHTML=list
            },
            function (error) {
                //console.log(error.response);
                result.innerHTML = error.response
            })
    })

    document.getElementById('attendance-button').addEventListener('click', (e) => {
        e.preventDefault()
        sendXmlHttpRequest('get', '/attendance',
            function (data) {
                let list=""
                for (attendance of data) {             
                    list+="<option value="+attendance._id+">"+attendance.title+"</option>"
                }
                document.getElementById('attendanceId').innerHTML = list
            },
            function (error) {
                //console.log(error.response);
                result.innerHTML = error.response
            })
    })

    document.getElementById('edit-attendance').addEventListener('click', (e) => {
        e.preventDefault()
        var select = document.getElementById('attendanceId')
        var option = select.options[select.selectedIndex]
        var title = document.getElementById('title').value
        var date = document.getElementById('date').value
        var params = 'title='+title+'&date='+date
        sendXmlHttpRequest('put', '/attendance?attendanceId='+option.value,  
            function (data) {
                for( var response of data) {
                    result.innerHTML = response.message
                    //console.log(response)
                }    
            },
            function (error) {
                //console.log(error.response);
                result.innerHTML = error.response
            }, params)
    })

    document.getElementById('create-attendance').addEventListener('click', (e) => {
        e.preventDefault()
        var title = document.getElementById('title').value
        var date = document.getElementById('date').value
        var params = 'title='+title+'&date='+date
        sendXmlHttpRequest('post', '/attendance',  
            function (data) {
                result.innerHTML = data.message
                //console.log(data.message)
            },
            function (error) {
                //console.log(error.response);
                result.innerHTML = error.response
            }, params)
    })

    document.getElementById('delete-attendance').addEventListener('click', (e) => {
        e.preventDefault()
        var select = document.getElementById('attendanceId')
        var option = select.options[select.selectedIndex]
        sendXmlHttpRequest('delete', '/attendance?attendanceId='+option.value,
            function (data) {
                //console.log(data.message)
                result.innerHTML = data.message
            },
            function (error) {
                //console.log(error.message);
                result.innerHTML = error.message
            })
    })

    document.getElementById('clear-information').addEventListener('click', (e) => {
        e.preventDefault()
        document.getElementById('title').value = ""
        document.getElementById('date').value = ""
    })
})();

function showTitle(event) {
        sendXmlHttpRequest('get', '/attendance?attendanceId='+event.target.value,
            function (data) {
                document.getElementById('title').value = data.title
                document.getElementById('date').value = data.date
                //console.log(data)
            },
            function (error) {
                //console.log(error);
                result.innerHTML = error.message
            })
  }