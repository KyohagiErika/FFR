/**
 * 
 * @param {String} method - the HTTP request method
 * @param {String} url - URL to send request
 * @param {function} resolve - call when HTTP response is received
 * @param {function} reject - call when HTTP request errored
 * @param {String} data - the body request
 * @param {*} headers - the header request
 */
 const sendXmlHttpRequest = async (method, url, resolve, reject, data , headers = null) =>{
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {    
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status >= 200  && this.status < 400) {
                if (resolve) {
                    resolve(this.response);
                }
            } else if (this.status >= 400) {
                if(reject) {
                    reject({ 
                        "status": this.status,
                        "statusText": this.statusText,
                        "response": this.response,
                    });
                }      
            }
        }
    };

    xhr.onerror = function () {    
        if(reject) {
            reject(new Error("There was a network error."));
        }  
    };

    xhr.open(method, url)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //xhr.setRequestHeader("Content-Type", "multipart/form-data");
    //xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest')

    xhr.responseType = 'json';
    xhr.send(data); 
    console.log('Data sent!');
}
