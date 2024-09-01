import React from 'react'

import { Header } from '../components/Home/Header'

export const Contact: React.FC = () => {

    return (
        <>
            <div className=' bg-white w-screen h-screen'>
                <Header />
                <div className='text-center'>
                    <h1 className='text-black mb-10'>CONTACT US</h1>
                    <h2 className='text-black text-lg font-bold'>If you have some issue, contact s1300106,s1300107@u-aizu.ac.jp</h2>
                    <h2 className='text-lg text-black mt-10 font-bold'>If you want to participate in the dev, visit our GitHub</h2>
                    <a href='https://github.com/Andyyyy64/Laboratory-Database' className='text-lg mb-10'>GitHub</a>
                    <h2 className='text-black text-3xl mt-24'>Thank you so much for visiting our site!! <br />
                        if you have any inquiries or require assistance, <br />
                        please do not hesitate to reach out to our administrator s1300106 and s1300107. <br />
                        Your feedback and participation are greatly valued!!</h2>
                </div>
            </div>
        </>
    )
}