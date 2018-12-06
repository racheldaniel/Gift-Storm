import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import GiftStorm from './components/GiftStorm';
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.render(<Router><GiftStorm /></Router>, document.getElementById('root'));

