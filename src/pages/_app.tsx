import {useState} from 'react';

import '../styles/global.css'

import { ChallangesProvider } from '../contexts/ChallangesContext';

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}

export default MyApp
