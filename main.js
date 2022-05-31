Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 100
});
camera = document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id ="capturedImg" src="' + data_uri + '">';
    });
}
console.log("ml5 version", ml5.version);
classifier = ml5.imgClassifier("https://teachablemachine.withgoogle.com/models/_fMXks_VX/model.json", modelLoaded);
function modelLoaded() {
    console.log('Model Loaded!');
}

function check() {
    img = document.getElementById('capturedImg');
    classifier.classify(img, gotResult);
}
function speak() {
    var synth = window.speechSynthesis;

    speak_data = toSpeak;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);

        document.getElementById("result_emotion_name").innerHTML = results[0].label;

        gesture = results[0].label;

        toSpeak = "";

        if (gesture == "Yes") {
            toSpeak = "Yes";
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        else if (gesture == "Stop") {
            toSpeak = "Stop";
            document.getElementById("update_emoji").innerHTML = "&#9995;";
        }
        else if (gesture == "Look") {
            toSpeak = "Look";
            document.getElementById("update_emoji").innerHTML = "&#128072;";
        }
        else if (gesture == "No") {
            toSpeak = "No";
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }

    }
}


