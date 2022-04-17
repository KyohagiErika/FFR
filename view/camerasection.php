<style>
    #container {
        margin: 0px auto ;
        width: 1000px;
        height: 500px;
        border: 50px rgb(10, 105, 48) solid;
    }

    #videoElement {
        width: 1000px;
        height: 500px;
        background-color: rgb(172, 95, 129);
    }
</style>

<body>
<div id="container">
    <video autoplay="true" id="videoElement">

    </video>
</div>
<script>
    var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }
</script>
</body>
