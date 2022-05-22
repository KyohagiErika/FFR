/**
 * Perform a HTTP request with XMLHttpRequest
 * @param {string} url - URL to send request
 * @param {string} method - the HTTP request method
 * @param {Function} callback - call when HTTP response is received
 * @param {string} content - the request body text 
 * @param {*} options - some request headers
 */
const request = async (url, method, callback, content = null, options = null) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        const headers = {}
        xhr.getAllResponseHeaders().split('\n').forEach(str => {
            const key = str.slice(0, str.indexOf(': '))
            const val = str.slice(str.indexOf(': ')+2, str.length-1)
            headers[key] = val
        })
        callback({
            statusCode: xhr.status,
            headers: headers,
            responseText: xhr.responseText
        })
    }
    xhr.open(method, url)
    for (let key in options) {
        xhr.setRequestHeader(key, options[key])
    }
    xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest')
    xhr.send(content)
}
