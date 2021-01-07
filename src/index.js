import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// I'm using tailwind without PostCSS because I couldn't get it to work with Parcel
import './tailwind.css'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))
