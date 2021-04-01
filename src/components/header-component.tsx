import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

const Header: React.FC = () => {
    const [search, setSearch] = useState('');

    const callApi = useCallback(debounce((searchkey) => getLatLong(searchkey), 1000), []);

    const handleChange = (e: any) => {
        setSearch(e.target.value);
        callApi(e.target.value);
    }

    const getLatLong = (searchkey: string) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchkey}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then(data => data.json())
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div onChange={e => handleChange(e)} className="header">
                <input className="search" type="text" />
            </div>
        </>
    )
}

export default Header