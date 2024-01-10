"use client"
import { useState, useEffect } from "react";

let capsPressed = false;

export default function KeyboardDisplay({keys}) {


    const pressed ="flex-grow bg-gray-300 text-gray-400 font-bold py-2 px-4 rounded border h-auto w-auto border-gray-500";
    const notPressed = "flex-grow bg-gray-100 text-gray-400 font-bold py-2 px-4 rounded border h-auto w-auto border-gray-500";
    const spaceBarNotPressed = "flex-grow bg-gray-100 text-gray-400 font-bold py-2 px-4 rounded  h-11 w-4/12 border border-gray-500"
    const spaceBarPressed = "flex-grow bg-gray-300 text-gray-400 font-bold py-2 px-4 rounded h-11 w-4/12 border border-gray-500";

    function Keyboard(bindings) {
        return Object.entries(bindings).map((entry) => {
            const [key, value] = entry;
            let rowId = `row-${key}`;

            return <div id={rowId} key={rowId} className="flex">
                {
                    value.map((values) => {
                        const keyObj = Object.keys(values);
                        const valObj = Object.values(values);
                        if (valObj == "Space") {
                            return <button className={spaceBarNotPressed} key={valObj} id={valObj} disabled>
                                {keyObj}
                            </button>
                        } else {
                            return <button className={notPressed} key={valObj} id={valObj} disabled>
                                {keyObj}
                            </button>
                        }
                    })     
                }
            </div>
        });
    }

    const vKeyboardNorm = Keyboard(keys[0]);
    const vKeyboardCaps = Keyboard(keys[1]);
    const vKeyboardShift = Keyboard(keys[2]);
    const [virtualKeyboard, setVirtualKeyboard] = useState(vKeyboardNorm);
    const [txtAreaEl, setTxtAreaEl] = useState(undefined);
    const [seconds, setSeconds] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds + 1);
        }, 1000);
        if (seconds <= 1) {
            const textAreaDiv = document.getElementById("KW-textarea");
            if (textAreaDiv) {
                console.log("TextArea div container has been captured by the virtual keyboard component");
                setTxtAreaEl(textAreaDiv.querySelector("textarea")); 
            }
        }
        if (txtAreaEl && seconds <= 2) {
            console.log("Text Area element has been captured.");
            txtAreaEl.addEventListener("keydown", keyPressed);
            txtAreaEl.addEventListener("keyup", keyReleased);
        }

        return () => {
            clearInterval(interval);
            // if (txtAreaEl) {
            //     txtAreaEl.removeEventListener("keydown", keyPressed);
            //     txtAreaEl.removeEventListener("keyup", keyReleased);
            // }
        }
    }, [seconds, txtAreaEl]);



    function SetKeyboardShift() {
        setVirtualKeyboard(vKeyboardShift);        
    }

    function SetKeyboardCaps() {
        setVirtualKeyboard(vKeyboardCaps);
    }

    function SetKeyboardNorm() {
        setVirtualKeyboard(vKeyboardNorm);
    }

    const keyPressed = (event) => {
        // console.log("Button pressed: ", event.key, event.code);
        if (txtAreaEl) {
            console.log("Text area element captured, key pressed", event.key);
            let btn = document.getElementById(event.code);
            if(btn && event.key == "Shift") {
                btn.setAttribute("class", pressed)
                SetKeyboardShift();
            } else if (btn && event.key == "CapsLock") { 
                if (!capsPressed) {
                    btn.setAttribute("class", pressed);
                    SetKeyboardCaps();
                    capsPressed = true;
                } else if (capsPressed) {
                    btn.setAttribute("class", pressed);
                    SetKeyboardNorm();
                    capsPressed = false;
                }
            } else if (btn && event.code == "Space") {
                console.log("Updating space bar class");
                btn.setAttribute("class", spaceBarPressed);
            } else if (btn) { btn.setAttribute("class", pressed); }
        }
    };

    const keyReleased = (event) => {
        if (txtAreaEl) {
            let btn = document.getElementById(event.code);
            if(btn && event.key == "Shift") {
                if (capsPressed) {
                    SetKeyboardCaps();
                } else { SetKeyboardNorm(); }
                btn.setAttribute("class", notPressed); 
            } else if (btn && event.code == "Space") {
                btn.setAttribute("class", spaceBarNotPressed);
            } else if (btn) {
                btn.setAttribute("class", notPressed); 
            }
        }
    };


    
    return (
            <div className="flex flex-col virtual-keyboard-container bg-gray-200 border border-black">
                { virtualKeyboard }
            </div>
            // {/* <textarea placeholder="Enter text here: " onKeyDown={keyPressed} onKeyUp={keyReleased} rows='10' /> */}
    );
}