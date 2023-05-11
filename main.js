var img="";
objects=[];

function preload(){
    img=loadImage('dog_cat.jpg');
}

function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}

function draw() {
    image(video,0,0,380,380);

    if (status !="") {
        objectDetector.detect(video,gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status:objects detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are: "+ objects.length;
            percent=floor(objects[i].confidence*100);
            fill("blue");
            text(objects[i].label+" "+percent+"%",objects[i].x+5,objects[i].y+15);
            noFill();
            stroke("blue");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    /*fill("red");
    strokeWeight(2);
    text("dog",45,75);
    noFill();
    stroke("red");
    strokeWeight(5);
    rect(30,60,450,350);

    fill("purple");
    strokeWeight(2);
    text("cat",310,75);
    noFill();
    stroke("purple");
    strokeWeight(5);
    rect(300,60,300,350);*/
}

status="";

function modelLoaded() {
    console.log("model is loaded");
    status=true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.log(error);        
    } else {
        console.log(results);
        objects=results;
    }
}
