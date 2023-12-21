import fs from 'fs';
import Papa from 'papaparse';


async function initializeKeyBindings() {
    const keyBindingsPath = './public/keybindings.json';
    const keyBindingsCapPath = './public/keybindingsCaps.json'
    const keyBindingsShiftPath = './public/keybindingsShift.json'
    const fileContent = fs.readFileSync(keyBindingsPath);
    const fileContentCap = fs.readFileSync(keyBindingsCapPath);
    const fileContentShift = fs.readFileSync(keyBindingsShiftPath);
    let results = JSON.parse(fileContent);
    // let results = [JSON.parse(fileContent), JSON.parse(fileContentCap), JSON.parse(fileContentShift)];

    return results;
}

export default async function GetKeyBindings() {
    const bindings = await initializeKeyBindings();
    return bindings;
}