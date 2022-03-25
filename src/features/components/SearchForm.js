import React, { useRef } from 'react';
const lookup = require('country-code-lookup')

export function SearchForm(props) {
    const cityEl = useRef(null);
    const countryEl = useRef(null);

    const search = (e) => {
        e.preventDefault();
        e.stopPropagation();

        var countryCode = countryEl.current.value ? lookup.byCountry(countryEl.current.value).internet : '';
        props.searchWeather(cityEl.current.value, countryCode);
    }

    const clearForm= () => {
        document.getElementById('searchForm').reset();
    }

    return (
        <form onSubmit={(e) => search(e)} id="searchForm">
            <div id="Component-SearchForm" className="row mt-3">
                <div className="col-md-4 d-flex flex-row flex-nowrap align-items-center mb-3 mb-md-0">
                    <label htmlFor="cityField" className="me-2">City:</label>
                    <input type="text" id="cityField" ref={cityEl} className="form-control" />
                </div>
                <div className="col-md-4 d-flex flex-row flex-nowrap align-items-center mb-3 mb-md-0">
                    <label htmlFor="countryField" className="me-2">Country:</label>
                    <input type="text" id="countryField" ref={countryEl} className="form-control" />
                </div>
                <div className="col-md-4 d-flex flex-row flex-nowrap align-items-center">
                    <button type="submit" className="btn btn-primary me-2"><i className="bi bi-search pe-1"></i>Search</button>
                    <button type="button" onClick={clearForm} className="btn btn-secondary me-2"><i className="bi bi-x-lg pe-1"></i>Clear</button>
                </div>
            </div>
        </form>

    );
}
