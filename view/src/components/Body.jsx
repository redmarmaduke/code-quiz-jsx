import React from 'react';

function Body(props) {
    return (
        <header>
            <div style={{
                marginBottom: "1em"
            }} className="justify-center">
                {props.children}
            </div>
        </header>
    );
}

export default Body;