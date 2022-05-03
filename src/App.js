import './App.css';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const COUNTRY = gql`
    query Country($code: ID!) {
        country(code: $code) {
            code
            name
            emoji
            nameWithEmoji @client
        }
    }
`;

const COUNTRIES = gql`
    query Countries {
        countries {
            code
            name
            emoji
            nameWithEmoji @client
        }
    }
`;

function App() {
    const [code, setCode] = useState('');
    const { data, loading, error } = useQuery(COUNTRY, {
        variables: { code },
        skip: code.length !== 2
    });

    const { data: dataCountries, loading: loadingCountries, error: errorCountries } = useQuery(COUNTRIES);
    console.log(data);
    console.log(loading);

    const handleChange = e => {
        setCode(e.target.value?.toUpperCase())
    }

  return (
    <div className="App">
        {error && `<h1>You broke it ${error}</h1>`}
        {!data || loading ? (<h1>Loading...</h1>) :
        (<>
            <h1>{data.country?.name} </h1>
            <h2>{data.country?.nameWithEmoji} </h2>
        </>
        )}
        <input type="text" value={code} onChange={handleChange} />

        {errorCountries && `<h1>You broke countries ${error}</h1>`}
        {!dataCountries || loadingCountries ? (
        <h1>Loading...</h1>
        ) : (
        <>
            <h1>Countries with flags</h1>
            <ul>
                {dataCountries.countries.map(country => (
                <li key={country.code}><h2>{country.nameWithEmoji}</h2></li>
                ))}
            </ul>
        </>
        )}
    </div>
  );
}

export default App;
