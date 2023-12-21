"use client"

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

export default function KeyboardDisplay({keys}) {


    const pressed ="bg-blue-700 text-white font-bold py-2 px-4 rounded";
    const notPressed = "bg-blue-500 text-white font-bold py-2 px-4 rounded";


    const keyPressed = (event) => {
        console.log("Button pressed: ", event.key, event.code);
        let btn = document.getElementById(event.code);
        if (btn) { btn.setAttribute("class", pressed); }
    };

    const keyReleased = (event) => {
        let btn = document.getElementById(event.code);
        if (btn) { btn.setAttribute("class", notPressed); }
    }

    function Keyboard() {
        return Object.entries(keys).map((entry) => {
            const [key, value] = entry;
            let rowId = `row-${key}`;

            return <div id={rowId} key={rowId}>
                {
                    value.map((values) => {
                        console.log(values);
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

    return (
        <div>
            <Keyboard />
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