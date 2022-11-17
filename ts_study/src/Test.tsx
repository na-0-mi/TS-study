import * as React from 'react'
import { useState, useEffect } from 'react';

const App = () => {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        console.log(counter);
        setCounter(counter + 1);
    }, []);
    return <div>{counter}</div>;
};

export default App;