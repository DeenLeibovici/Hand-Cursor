let handPose, video, canvas, ctx;

window.onload = () => {
    video = document.getElementById("video");
    canvas = document.getElementById("output");
    ctx = canvas.getContext("2d");

    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();

            handPose = ml5.handPose(video, modelLoaded);
            handPose.on("predict", results => drawKeypoints(results));
        })
        .catch((err) => console.error("Error accessing webcam:", err));
};

function modelLoaded() {
    console.log("Hand Pose model loaded!");
}

function drawKeypoints(results) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    results.forEach(prediction => {
        prediction.landmarks.forEach(([x, y]) => {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    });
}
