import React, { ReactElement } from 'react';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { useStateSelector } from '@core/reducers';

export default function Component(): ReactElement {
    const classes = useStyles();
    const authState = useStateSelector(({ authState }) => authState);
    const dispatch = useDispatch();

    return <div className={classes.root}></div>;
}
