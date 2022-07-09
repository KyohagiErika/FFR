(function () {
  if (
    !"mediaDevices" in navigator ||
    !"getUserMedia" in navigator.mediaDevices
  ) {
    alert("Camera API is not available in your browser");
    return;
  }

  // get page elements
  const video = document.querySelector("#video");
  const response = document.querySelector("#response");
  const rectangle = document.querySelector("#rectangle");
  const btnSubmit = document.querySelector("#submitBtn");
  const btnRemove = document.querySelector("#removeBtn");
  const btnScreenshot = document.querySelector("#btnScreenshot");
  const screenshotsContainer = document.querySelector("#screenshots");
  const canvas = document.querySelector("#canvas");

  // video constraints
  const constraints = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440,
      },
    },
  };

  // use front face camera
  let useFrontCamera = true;

  // current video stream
  let videoStream;

  btnRemove.addEventListener("click", function () {
    if (screenshotsContainer.children.length > 0) {
      rectangle.classList.remove("hidden");
      screenshotsContainer.removeChild(screenshotsContainer.firstChild);
    }
  })

  // take screenshot
  btnScreenshot.addEventListener("click", function () {
    if (screenshotsContainer.children.length > 0) {
      screenshotsContainer.removeChild(screenshotsContainer.firstChild);
    }
    rectangle.classList.add("hidden");
    const img = document.createElement("img");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    img.src = canvas.toDataURL("image/png");
    screenshotsContainer.prepend(img);
  });


  //send image to /camera
  btnSubmit.addEventListener("click", async function () {
    if (screenshotsContainer.children.length > 0) {
      var formData = new FormData()
      let blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      formData.append('img', blob, 'face.png');


      //----------------------------------------------
      //create xmlhttprequest
      const xhr = new XMLHttpRequest()
      // xhr.open('post', 'https://ffr-ai-server.yellowwater-165ae20a.eastasia.azurecontainerapps.io/api_v1', false)
      xhr.open('post', '/camera', false)
      xhr.onload = () => {
        response.classList.remove("hidden")
        if (xhr.status === 400) {
          response.innerHTML = xhr.responseText
          alert(xhr.responseText)
        } else {
          response.innerHTML = 'User ID:' + xhr.responseText
          console.log('User name:' + xhr.responseText)
        }
        response.innerHTML = xhr.responseText
        console.log(xhr.responseText)
      }
      xhr.setRequestHeader("Content-type", "image/png");
      xhr.send(formData)
      console.log('Image sent!')

      //-------------------------------------------------
    }
  })

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }


  // stop video stream
  function stopVideoStream() {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  // initialize
  async function initializeCamera() {
    stopVideoStream();
    constraints.video.facingMode = useFrontCamera ? "user" : "environment";

    try {
      videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = videoStream;
    } catch (err) {
      alert("Could not access the camera");
    }
  }

  initializeCamera();
})();
