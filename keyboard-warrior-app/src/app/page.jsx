'use client'
import { useEffect, useState } from "react"
import { Container, Row, Col } from "reactstrap"

//components 
// function TextBox() {
//     return (

//     )
// }
// home page


export default function Page() {
    const [excerpt, setExcerpt] = useState(null);

   useEffect(() => {
    fetch("https://contentai-net-text-generation.p.rapidapi.com/v1/text/blog-articles", {
        method: "GET",
        params: {
            category: "law"
        },
        headers: {
            "X-RapidAPI-Key": "5b90fa9c73msh0f8707e2c137fdcp188e07jsn5109faf408b0",
            "X-RapidAPI-Host": "contentai-net-text-generation.p.rapidapi.com",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            setExcerpt(data[0].except);
            console.log(data)
        })
        .catch((error) => console.log(error));
   }, []);

    return (
        <main>
            <Container className="main-container">
                <h1>Excerpts for the soul</h1>
                {excerpt && <p>{excerpt}</p>}
            </Container>
        </main>
    )
}