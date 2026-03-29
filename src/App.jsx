import React, { useState } from 'react'
import Header from './components/Header/Header'
import Search from './components/Search/Search';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <main>
      <div className='pattern'></div>
      <div className='wrapper'>
      <Header></Header>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
      <h1>{searchTerm}</h1>
    </div>
    </main>
  )
}

export default App