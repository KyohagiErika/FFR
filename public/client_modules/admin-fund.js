const {  } = require('../client_modules/xml-http-requester.js')
const { fund } = require('../models/fund')
(function () {
    const result = document.querySelector("#resultevent")
    document.getElementById('fund-button').addEventListener('click', (e) => {
        e.preventDefault()
        //const data = new FormData(document.getElementById('form'))
        sendXmlHttpRequest('get', '/fund',
            function (data) {
                let list=""
                var i=1;
                for (fund of data) {
                    const date = fund.date
                    const period = fund.period
                    const status = fund.status
                    list+="<tr>" +
                        "<td>"+i+"</td>"+
                        "<td>"+fund.title+"</td>"+
                        "<td>"+date.toISOString().slice(0, 10)+"</td>"+
                        "<td>"+period.toISOString().slice(0, 10)+"</td>"+
                        "<td>"+status.toISOString().slice(0, 10)+"</td>"+
                        "</tr>";
                    i++;
                }
                document.getElementById('fund-list').innerHTML=list
            },
            function (error) {
                //console.log(error.response);
                result.innerHTML = error.response
            })
    })

    document.getElementById('fund-button').addEventListener('click', (e) => {
        e.preventDefault()
        sendXmlHttpRequest('get', '/fund',
            function (data) {
                let list=""
                for (fund of data) {
                    list+="<option value="+fund._id+">"+fund.title+"</option>"
                }
                document.getElementById('fundId').innerHTML = list
            },
            function (error) {
                //console.log(error.response);
                result.innerHTML = error.response
            })
    })

    document.getElementById('edit-fund').addEventListener('click', (e) => {
        e.preventDefault()
        const select = document.getElementById('fundId')
        const option = select.options[select.selectedIndex]
        const title = document.getElementById('title').value
        const date = document.getElementById('date').value
        const period = document.getElementById('period').value
        const status = document.getElementById('status').value
        const params = 'title='+title+'&date='+date+'&period='+period+'&status='+status
        sendXmlHttpRequest('put', '/fund?fundId='+option.value,
            function (data) {
                for( const response of data) {
                    result.innerHTML = response.message
                    //console.log(response)
                }
            },
            function (error) {
                //console.log(error.response);
                result.innerHTML = error.response
            }, params)
    })

    document.getElementById('create-fund').addEventListener('click', (e) => {
        e.preventDefault()
        const title = document.getElementById('title').value
        const date = document.getElementById('date').value
        const period = document.getElementById('period').value
        const status = document.getElementById('status').value
        const params = 'title='+title+'&date='+date+'&period='+period+'&status='+status
        sendXmlHttpRequest('post', '/fund',
            function (data) {
                result.innerHTML = data.message
                //console.log(data.message)
            },
            function (error) {
                //console.log(error.response);
                result.innerHTML = error.response
            }, params)
    })

    document.getElementById('delete-fund').addEventListener('click', (e) => {
        e.preventDefault()
        const select = document.getElementById('fundId')
        const option = select.options[select.selectedIndex]
        sendXmlHttpRequest('delete', '/fund?fundId='+option.value,
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
        document.getElementById('period').value = ""
        document.getElementById('status').value = ""
    })
})();

function showTitle(event) {
    sendXmlHttpRequest('get', '/fund?fundId='+event.target.value,
        function (data) {
            document.getElementById('title').value = data.title
            document.getElementById('date').value = data.date
            document.getElementById('period').value = data.period
            document.getElementById('status').value = data.status
            //console.log(data)
        },
        function (error) {
            //console.log(error);
            result.innerHTML = error.message
        })
}