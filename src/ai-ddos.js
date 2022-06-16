const config = require('./config')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const out = require('./lib/out')

const aiDdos = () => {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
        out.log(`AI Server response with status ${xhr.status === 200 ? out.success(xhr.status) : out.danger(xhr.status)}`)
        out.log(`Response text: ${xhr.responseText}`)
    }
    return setInterval(() => {
        out.log('Open connection to AI server at '+config.AI_SERVER_URL)
        xhr.open('get', config.AI_SERVER_URL);
        xhr.send();
        out.log(out.success(`Request sent (${Date.now()}).`)+' Waiting for response...')
    }, 5*60*1000)
};

module.exports = aiDdos;