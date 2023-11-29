"use client"
import { useStopwatch } from 'react-timer-hook';
import { useEffect, useState } from 'react';
// expiryTimestamp - Date object


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
      } = useStopwatch({ autoStart: true });

    const [excerpt, setExcerpt] = useState();
    
      useEffect (() => {
        console.log(seconds);
        if (seconds == 1) {
            setExcerpt(document.getElementById("KW-textarea"));
        }
        if (excerpt != undefined) {
            if (excerpt.getAttribute("success") == 'true')
                pause();
        }
      }, [seconds]);

   try {
        return (
            <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '100px'}}>
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