"use client"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


var stringReadIn;

function KeyListener(event) {
    stringReadIn = event.target.value;
}


export default function ReadKeys() {
    const textArea = document.querySelector("textarea");
    const excerpt = document.querySelector("p#excerpt");
    let ta_div = document.getElementById("KW-textarea");
    
    textArea.addEventListener("input", KeyListener);

    if (stringReadIn == excerpt.innerText) {
        ta_div.setAttribute("success", true);
        toast("Strings Match!");
        textArea.removeEventListener("input", KeyListener);
    }
}