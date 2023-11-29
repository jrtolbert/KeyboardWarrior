// 'use client'

import ExcerptAPI from './components/ExcerptAPI';
import ReadKeys from "./components/ReadKeys";
import { ToastContainer } from 'react-toastify';
import MyTimer from './components/Timer';


export default async function Page() {
    const excerpt = await <ExcerptAPI />;
    return (
        <main>
            <ToastContainer autoClose={3000} position='top-right' theme='dark'/>
            <MyTimer />
            <h1>Excerpt API Test</h1>
            <p id='excerpt'> {excerpt} </p>
            <div id='KW-textarea' success='false'>
                <textarea placeholder="Blob" onChange={ReadKeys} />
            </div>
            <input type='button' value='Click Me' />
        </main>
    )
}