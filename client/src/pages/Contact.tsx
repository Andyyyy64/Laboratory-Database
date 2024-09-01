import React from 'react';
import { Header } from '../components/Home/Header';

export const Contact: React.FC = () => {
    return (
      <div className="bg-white w-screen h-screen">
        <Header />
        <div className="px-4 sm:px-8 lg:px-16 text-center">
          <h1 className="text-black mb-4 sm:mb-10 text-2xl sm:text-3xl">
            CONTACT US
          </h1>
          <h2 className="text-black text-lg sm:text-xl font-bold">
            If you have some issue, contact s1300106,s1300107@u-aizu.ac.jp
          </h2>
          <h2 className="text-lg sm:text-xl text-black mt-6 sm:mt-10 font-bold">
            If you want to participate in the dev, visit our GitHub
          </h2>
          <a
            href="https://github.com/Andyyyy64/Laboratory-Database"
            className="text-lg sm:text-xl text-blue-500 mt-4 sm:mt-6 block"
          >
            GitHub
          </a>
          <h2 className="text-black text-xl sm:text-2xl mt-12 sm:mt-24">
            Thank you so much for visiting our site!!
            <br />
            If you have any inquiries or require assistance,
            <br />
            please do not hesitate to reach out to our administrator s1300106
            and s1300107.
            <br />
            Your feedback and participation are greatly valued!!
          </h2>
        </div>
      </div>
    );
};
