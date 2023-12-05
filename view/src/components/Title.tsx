import React from 'react';

/**
 * Title Component
 * @param {React.PropsWithChildren} props
 * @return {JSX.Element}
 */
function Title(props: React.PropsWithChildren) {
  return (
    <header>
      <h1
        style={{
          margin: '.67em 0 .67em 0',
          textAlign: 'center',
        }}
      >
        {props.children}
      </h1>
    </header>
  );
}

export default Title;
