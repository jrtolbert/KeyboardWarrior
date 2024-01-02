"use client"
import { useState } from "react";

// function initializeArr() {
//     let arr = new Array();

//     for(var i = 97; i <= 122; i++) {
//         arr.push(String.fromCharCode(i));
//     }

//     return arr;
// }

// function initializeKeyboard() {
//     let keyboard = [
//         ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "back"],
//         ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
//         ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "enter"],
//         ["shift-l", "z", "x", "c", "v", "b", "n", "m", ",", ".", "\/", "shift-r"],
//         ["ctrl-l", "alt-l", " ", "alt-r", "ctrl-r"]
//     ]

//     return keyboard;
// }

let capsPressed = false;

export default function KeyboardDisplay({keys}) {


    const pressed ="bg-gray-700 text-white font-bold py-2 px-4 rounded";
    const notPressed = "bg-gray-400 text-white font-bold py-2 px-4 rounded";
    
    function Keyboard(bindings) {
        return Object.entries(bindings).map((entry) => {
            const [key, value] = entry;
            let rowId = `row-${key}`;

            return <div id={rowId} key={rowId}>
                {
                    value.map((values) => {
                        const keyObj = Object.keys(values);
                        const valObj = Object.values(values);
                        return <button className={notPressed} key={valObj} id={valObj}>
                            {keyObj}
                        </button>
                    })     
                }
            </div>
        });
    }

    const vKeyboardNorm = Keyboard(keys[0]);
    const vKeyboardCaps = Keyboard(keys[1]);
    const vKeyboardShift = Keyboard(keys[2]);
    const [virtualKeyboard, setVirtualKeyboard] = useState(vKeyboardNorm);


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
         } else if (btn) {
            btn.setAttribute("class", pressed);
         }
    };

    const keyReleased = (event) => {
        let btn = document.getElementById(event.code);
        if(btn && event.key == "Shift") {
            if (capsPressed) {
                SetKeyboardCaps();
            } else { SetKeyboardNorm(); }
            btn.setAttribute("class", notPressed); 
        }  else if (btn) {
            btn.setAttribute("class", notPressed); 
        }
    };


    return (
        <div>
         { virtualKeyboard }
            <textarea placeholder="Enter text here: " onKeyDown={keyPressed} onKeyUp={keyReleased} rows='10' />
        </div>
    );
}

// keyboard.map(function(row, index) {
                //     let id = `row-${index}`
                //     return <div key={index} id={id}>
                //         { 
                //             row.map(function(value) {
                //                 return <button className={notPressed} key={value} id={value}> {value} </button>
                //             })
                //         }
                //        </div>
                // })