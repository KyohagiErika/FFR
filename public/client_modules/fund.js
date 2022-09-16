(function () {
    const result = document.querySelector("#result-fund")
    const createResult = document.querySelector("#create-fund-result")

    window.onload = loadListFund()

    document.getElementById('edit-fund').addEventListener('click', (e) => {
        e.preventDefault()
        var select = document.getElementById('fundId')
        var option = select.options[select.selectedIndex]
        var title = document.getElementById('fundTitle').value
        var period = document.getElementById('fundPeriod').value
        var params = 'title=' + title + '&period=' + period
        sendXmlHttpRequest('put', '/fund?fundId=' + option.value,
            function (data) {
                for (var response of data) {
                    result.innerHTML = response.message
                    loadListFund()
                }
            },
            function (error) {
                var resList = ""
                for (var response of error) {
                    resList += response.message + "<br>"
                }
                result.innerHTML = resList
            }, params)
    })

    document.getElementById('create-fund').addEventListener('click', (e) => {
        e.preventDefault()
        var title = document.getElementById('createFundTitle').value
        var period = document.getElementById('createFundPeriod').value
        var params = 'title=' + title + '&period=' + period
        sendXmlHttpRequest('post', '/fund',
            function (data) {
                createResult.innerHTML = data.message
                loadListFund()
            },
            function (error) {
                var resList = ""
                for (var response of error) {
                    resList += response.message + "<br>"
                }
                createResult.innerHTML = resList
            }, params)
    })

    document.getElementById("delete-fund").addEventListener('click', (e) => {
        e.preventDefault()
        var select = document.getElementById('fundId')
        var option = select.options[select.selectedIndex]
        sendXmlHttpRequest('delete', '/fund?fundId=' + option.value,
            function (data) {
                result.innerHTML = data.message
                loadListFund()
            },
            function (error) {
                var errorList
                for (var res in error) {
                    errorList += res.message + "<br>"
                }
                result.innerHTML = errorList
            })
    })
    function loadListFund() {
        sendXmlHttpRequest('get', '/fund',
            function (fundData) {
                let table = ""
                var i = 1;
                for (fund of fundData) {
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
                        fund.title +
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
                        fund.period +
                        "</div>" +
                        "</div>" +
                        "</td>" +
                        "</tr>"
                    i++;
                }
                document.getElementById('fund-list').innerHTML = table


                let list = ""
                document.getElementById('fundTitle').value = fundData[0].title
                document.getElementById('fundPeriod').value = fundData[0].period
                for (fund of fundData) {
                    list += "<option value=" + fund._id + ">" + fund.title + "</option>"
                }
                document.getElementById('fundId').innerHTML = list
            },
            function (error) {
                result.innerHTML = error.response
            })
    }
})();

function showFundTitle(event) {
    sendXmlHttpRequest('get', '/fund?fundId=' + event.target.value,
        function (data) {
            document.getElementById('fundTitle').value = data.title
            document.getElementById('fundPeriod').value = data.period
            result.innerHTML = ""
        },
        function (error) {
            result.innerHTML = error.message
        })
}

