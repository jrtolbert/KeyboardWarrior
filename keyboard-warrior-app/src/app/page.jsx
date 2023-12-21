// 'use client'

import ExcerptAPI from './components/ExcerptAPI';
import Keyboard from './components/Keyboard';
import GetKeyBindings from './components/KeyboardHelper';
import ReadKeys from "./components/ReadKeys";
import { ToastContainer } from 'react-toastify';
import MyTimer from './components/Timer';
import PercentCompleted from './components/PercentComplete';
import { Container, Col, Row } from 'react-bootstrap';



export default async function Page() {
    const excerpt = await <ExcerptAPI />;
    const keybindings = await GetKeyBindings();

    return (
        <main>
            <Keyboard keys={keybindings} />
            {/* <Container>
                <div id='header-div' className='grid grid-rows-1 grid-cols-2 grid-flow-col auto-row-auto bg-emerald-500'>
                    <div className='col-span-1 flex justify-start'>
                        <img className='max-w-md ' src='./KW-logo.png' alt='logo' />
                     </div>
                     <div className='col-span-1 flex justify-end'>
                        <div id='Title'>
                            <h1 className="mt-2 text-blue-800 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">Key Board Warrior</h1>
                        </div>
                     </div>
                </div>
                <Row className='columns-2'>
                    <Col id='PercentComplete' className='border-2'>
                        <PercentCompleted />
                    </Col>
                    <Col id='Stopwatch' className='top-10 border-2'>
                        <ToastContainer autoClose={3000} position='top-right' theme='dark'/>
                        <MyTimer />
                    </Col>
                </Row>
                <div id='padding'></div>
                <Row>
                    <div className='flex flex-col border-2'>
                        <div id='excerpt-div' className='inline-block'>
                            <p id='excerpt'> {excerpt} </p>
                        </div>

                        <div id='padding'></div>

                        <div id='KW-textarea' className='border-2' success='false'>
                            <textarea placeholder="Blob" onChange={ReadKeys} className='w-full' rows='10'/>
                        </div>
                    </div>
                </Row>
            </Container> */}
        </main>
    )
}