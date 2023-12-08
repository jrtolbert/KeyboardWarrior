'use client'
import { useEffect, useState } from "react";

let result = 0;

function MatchMaker(event) {
    var target = document.getElementById("excerpt").textContent;
    var targetString = target.substring(1, target.length - 1);
    let matchCounter = 0;

    for (var i = 0; i <= event.target.value.length - 1; i++) {
        matchCounter += targetString[i] == event.target.value[i] ? 1 : 0;
    }

    result = Math.round(matchCounter / targetString.length * 100);
    console.log(`${result}% match`);
}

export default function PercentCompleted() {
    // console.log("Running PercentCompleted");
    let txtArea = undefined;

    const [seconds, setSeconds] = useState(0);
    const [blob, setBlob] = useState();
    const [excerpt, setExcerpt] = useState();
    const [ready, setReady] = useState(false);

    // capture excerptToRead and blob which is the textarea
    useEffect(() => {
        const interval = setInterval(() => {
           setSeconds((seconds) => seconds + 1); 
        }, seconds);
        if (seconds >= 1 && !ready) {
            console.log("Preparing excerptToRead and blobToCheck");
            setExcerpt(document.getElementById("excerpt"));
            setBlob(document.getElementById("KW-textarea"));
            if (excerpt && blob) {
                setReady(true);
            }
        }

        return () => clearInterval(interval);

    }, [seconds]);


    // extract textarea element from blob
    useEffect(() => {
        if (ready && result == 0) {
            console.log("Excerpt and blob are ready"); 
            txtArea = blob.querySelector("textArea");
            txtArea.addEventListener("input", MatchMaker);
        }
        if (result == 100) {
            txtArea.removeEventListener("input", MatchMaker);
        }
    }, [ready]);
}
   

    