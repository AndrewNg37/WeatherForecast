import React from 'react';

export function Alert(props) {
    return (
        <div className="alert alert-danger mb-0" role="alert">
            {props.AlertMessage}
        </div>
    );
}
