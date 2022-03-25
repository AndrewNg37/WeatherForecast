import React from 'react';

export function Header(props) {
    return (
        <div id="Component-Header" className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3 mb-2 border-bottom">
                        <p className="fw-bolder fs-4">{props.title}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
