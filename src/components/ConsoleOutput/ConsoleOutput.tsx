import React from 'react';

export const ConsoleOutput: React.FunctionComponent = (props) => {
    return (
        <>
            <h2 style={{ color: '#fff' }}>
                Console message:
            </h2>
            <div style={{ width: '100%', color: '#fff' }}>
                { props.children }
            </div>
        </>
    )
}
