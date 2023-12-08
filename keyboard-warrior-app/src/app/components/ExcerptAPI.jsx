import fs from 'fs';
import Papa from 'papaparse';


/* 
*   Function: GetCategory()
*   Params: None
*   Description: Parses ./public/Categories.csv file and returns a string Category
*                that will be fed into the excerpt api function to specify topic of excerpt
*   Return: String
*/


async function GetCategory () {
    // file path 
    const filePath = './public/Categories.csv';
    
    // returns the contents of the file 
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let results;

    // Parsing csv file, an array of data gets returned
    Papa.parse(fileContent, {
        header: false,
        complete: (res) => {
            results = res.data;
        },
        error: (err) => {
            console.error("Error while parsing file: ", err)
        }
    });

    // Utilizing Math.random() to randomize the value being returned from the results array
    var someVal = Math.floor(Math.random() * results.length);
    return results[someVal][0];
}


export default async function () {
    const category = await GetCategory();
    const url = `https://contentai-net-text-generation.p.rapidapi.com/v1/text/blog-articles?category=${category}`
    const response = await fetch (url, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "X-RapidAPI-Key": "5b90fa9c73msh0f8707e2c137fdcp188e07jsn5109faf408b0",
            "X-RapidAPI-Host": "contentai-net-text-generation.p.rapidapi.com"
        }
    });

    const excerpt = await response.json();
    const splitArr = excerpt.text.split("\n").filter((val) => {return val != ''})
    var randomVal = Math.floor(Math.random() * splitArr.length)
    return splitArr[randomVal];
}