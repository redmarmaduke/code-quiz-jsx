import React from 'react';

function Title(props) {
    return (
        <header>
            <h1 style={{
                margin: ".67em 0 .67em 0",
                textAlign: "center"
            }}>{props.children}</h1>
        </header>
    );
}

export default Title;