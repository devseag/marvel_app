import { useState, flushSync } from "react";

function TestComponent() {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);

    function handleClick() {
        // setCount( c => c + 1);
        // setFlag(f => !f);
        setTimeout(() => {
            // setCount(c => c + 1);
            // setFlag(f => !f);
            flushSync(() => {
                setCount(c => c + 1);
            })
                
            flushSync(() => {
                setFlag(f => !f);             
            })
        }, 100);
    }

    console.log('render');

    return (
        <div>
            <button onClick={handleClick}>Next</button>
            <h1 style={{ color: flag ? "blue" : "black"}}>{count}</h1>
        </div>
    )
}

export default TestComponent;