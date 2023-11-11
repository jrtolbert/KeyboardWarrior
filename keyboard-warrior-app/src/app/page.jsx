// 'use client'
// import { useEffect, useState } from "react"
// import { Container, Row, Col } from "reactstrap"
import Papa from 'papaparse';
import fs from 'fs';

//functions

/* 
*   Function: GetCategory()
*   Params: None
*   Description: Parses ./public/Categories.csv file and returns a string Category
*                that will be fed into the excerpt api function to specify topic of excerpt
*   Return: String
*/

async function GetCategory() {
    console.log('Running Get Category function!');
    const filePath = './public/Categories.csv';
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let results;

    Papa.parse(fileContent, {
        header: false,
        complete: (res) => {
            results = res.data;
        },
        error: (err) => {
            console.error("Error while parsing file: ", err)
        }
    });

    var someVal = Math.floor(Math.random() * results.length);
    return results[someVal][0];
}


//components 
const ExcerptAPI = async (props) => {
    console.log(props.category);
    const url = `https://contentai-net-text-generation.p.rapidapi.com/v1/text/blog-articles?category=${props.category}`
    const response = await fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "X-RapidAPI-Key": "5b90fa9c73msh0f8707e2c137fdcp188e07jsn5109faf408b0",
            "X-RapidAPI-Host": "contentai-net-text-generation.p.rapidapi.com"
        }
    });
    const excerpt = await response.json();
    console.log(excerpt);
    return excerpt.text;
}


export default async function Page() {
    // const excerpt = excerptAPI
    const catVal = await GetCategory()
    return (
        <main>
            <h1>Excerpt API Test</h1>
            <p> <ExcerptAPI category={catVal} /> </p>
        </main>
    )
}