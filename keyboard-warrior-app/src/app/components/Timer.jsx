"use client"
import { useStopwatch } from 'react-timer-hook';
import { useEffect, useState } from 'react';
// expiryTimestamp - Date object

let hasStarted = false;

function Go(start) {
    console.log("Timer eventListner added to textArea");
    if (!hasStarted) {
        start();
        hasStarted = true;
    }
}


export default function MyTimer() {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: false });

    const [internalClock, setInternalClock] = useState(0);
    const [excerpt, setExcerpt] = useState();
    const [textArea, setTextArea] = useState();
    const [ready, setReady] = useState(false);
    const [ta_div, setTa_Div] = useState();

    useEffect (() => {
        const interval = setInterval(() => {
            setInternalClock((internalClock) => internalClock + 1);
        }, internalClock);

        if (!ready) {
            setExcerpt(document.getElementById("excerpt"));
            setTa_Div(document.getElementById("KW-textarea"));
            setTextArea(document.querySelector("textarea"));
        }
        if (excerpt && textArea && ta_div && !ready) {
            console.log("Excerpt and textArea are ready, setting ready to true.");
            setReady(true);
            textArea.addEventListener("input", function () {
                Go(start);
            });
        }
        if (ready) {
            if (ta_div && ta_div.getAttribute("success") == 'true'){
                pause();
                textArea.removeEventListener("input", Go);

                let wordsPerSecond = excerpt.textContent.length / totalSeconds;
                console.log("Words per second: ", wordsPerSecond.toFixed(2));
            }
        }

        return () => clearInterval(interval);
    }, [internalClock]);

   try {
        return (
            <div style={{textAlign: 'right'}}>
                <div style={{fontSize: '50px'}}>
                    <span>{String(days).padStart(2,"0")}</span>:
                    <span>{String(hours).padStart(2,"0")}</span>:
                    <span>{String(minutes).padStart(2,"0")}</span>:
                    <span>{String(seconds).padStart(2,"0")}</span>
                </div>
            </div>
        );
    } catch (e) {

    }
}