song = "";

function preload() {
    song = loadSound("music.mp3");
}
scoreLeftWrist ="0";
scoreRightWrist ="0";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("PoseNet is initialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =", leftWristX + "leftWristY = ", leftWristY);

        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =", rightWristX + "rightWristY = ", rightWristY);
    }
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX, leftWristY,20);
    if(scoreRightWrist > 0.2)
    {
    if(rightWristY >0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY >100 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY >100 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY >100 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
}
    if(scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    leftWristY_divide_1000 = remove_decimals/1000;
    volume = leftWristY_divide_1000 *2 ;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song.setVolume(volume);
}   
}
    
    



function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}