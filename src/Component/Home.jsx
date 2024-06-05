import React from 'react'

const Home = () => {
  return (
    <div className='conatiner-fluid vh-100 backgroungimg'>
      <div className='backdiv p-2' style={{position: 'relative', top: '50px', left: "70px", border: '1px solid #5DC4FC', width: '500px', backgroundColor: "rgb(255,255,255, 0.2)", height: '320px', borderRadius: "20px" }}>
        <h1 className='text-center' style={{ color: "#5DC4FC", fontWeight: "bold" }} >React</h1>
        <p style={{ color: "#5DC4FC", fontSize: "18px", marginTop: '20px' }}>React is a JavaScript library for building user interfaces (UIs) on the web. React is a declarative, component based library that allows developers to build reusable UI components and It follows the Virtual DOM (Document Object Model) approach, which optimizes rendering performance by minimizing DOM updates. React is fast and works well with other tools and libraries.</p>
      </div>
      <div className='p-2' style={{position: 'relative', left: '900px', border: '1px solid #B45DFC', width: '500px', height: '320px', backgroundColor: "rgb(255,255,255, 0.2)", borderRadius: "20px" }}>
        <h1 className='text-center text' style={{ color: "#B45DFC", fontWeight: "bold" }} >Redux</h1>
        <p style={{ color: "#B45DFC", fontSize: "18px", marginTop: '20px' }}>Redux is simply a store to store the state of the variables in your app. Redux creates a process and procedures to interact with the store so that components will not just update or read the store randomly. Similar to the bank. It does not mean because you have money in the bank that you can go anytime, open the vault, and take money. You have to go through certain steps to withdrawal money.</p>
      </div>
    </div>
  )
}

export default Home