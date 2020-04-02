/* 
 * the objective of the following script it to create a timer
 * that can be setted by the user
 * it gonna have one function to manage the time that must work
 * together with the audioplayer function
 */

let timerObj = {
    minutes: 0,
    seconds: 0,
    time: 0,
    timerID: 0
}

let audioplayer = new Audio("");

function start_pause() {
    if ($("#only-btn").val() === "Start") {
        start();

    } else {
        pause();
        
    }

    function start() {
        $("#only-btn").val("Pause" || 0);

        audioplayer.play();

        timerObj.timerID = setInterval(function() {
            timerObj.seconds--;
            
            if (timerObj.seconds < 0 || timerObj.seconds < 0) { 

                if (timerObj.minutes > 0) {
                    timerObj.minutes--;
                    timerObj.seconds = 59;

                } else {
                    return stopTimer();

                }
                
            }

            if (audioplayer.paused) {
                audioplayer.currentTime = 0;
                audioplayer.play();
                
            }

            updateValues("minutes", timerObj.minutes);
            updateValues("seconds", timerObj.seconds);

        }, 1000);

    }

    function pause() {
        $("#only-btn").val("Start" || 0);

        clearInterval(timerObj.timerID);
        audioplayer.pause();

    }

}

function stopTimer() {
    clearInterval(timerObj.timerID);

    $("#only-btn").val("Start" || 0);

    updateValues("minutes", 0);
    updateValues("seconds", 0);

    audioplayer.pause();
    audioplayer.currentTime = 0;

}

function updateValues(key, value) {
    if (value < 0) {
        value = 0;

    }

    if (key === "seconds") {
        if (value < 10) {
            value = "0" + value;

        } else if (value > 59) {
            value = 59;

        }
    }

    $("#" + key).html(value || 0);
    $("#" + key + "-input").val(value || 0);
    timerObj[key] = value;

}

(function updatePage(key){
    let input = "#" + key + "-input";

    $(input).change(function() {
        updateValues(key, $(input).val());

    })

    $(input).keyup(function() {
        updateValues(key, $(input).val());

    })

    return arguments.callee;    

}("seconds")("minutes"));
