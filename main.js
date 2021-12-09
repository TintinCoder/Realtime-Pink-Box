var video;
var canvas;
var poseNet;
var noseX = 0;
var noseY = 0;
var difference = 0;
var leftWristX = 0;
var rightWristX = 0;
function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(500, 500)
    canvas.position(600, 150)

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', poses)
}

function draw (){
    document.getElementById('measurments').textContent = `${difference}px`;
    background('#969A97')
    fill('#F90093')
    stroke('black');
    square(noseX, noseY, difference)
}

function modelLoaded() {
    console.log('poseNet loaded');
}

function poses(results) {
    if(results.length > 0){
        // Fetching Nose X N Y
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        // FETCHING wrists x and y
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        // Defining difference var
        difference = floor(leftWristX - rightWristX)
    }
}