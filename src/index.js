import { hot } from 'react-hot-loader/root';
import React from 'react';
import { hydrate } from 'react-dom'
import Routes from './Routes'

hydrate(<Routes />, document.getElementById('root'))