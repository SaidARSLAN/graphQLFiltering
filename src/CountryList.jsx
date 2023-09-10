// src/CountryList.js

import React, { useState } from 'react';
import { useQuery,gql } from '@apollo/client';
const GET_ALL_COUNTRIES = gql`
query {
  countries{
    name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

function CountryList() {
  const { data, loading, error } = useQuery(GET_ALL_COUNTRIES);
  const [filterText, setFilterText] = useState("");
  const [groupText, setGroupText] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  const afterFilteredCountries = data.countries.filter((country) => country.name.includes(filterText))
  const handleClick = (event) => {
      event.target.classList.toggle("bg-black");
      event.target.classList.toggle("text-white");
      for (let item of event.target.parentElement.children) {
        if (item.value !== event.target.value) {
          item.classList.remove("bg-black");
          item.classList.remove("text-white");
        }
      }
  }

  return (
    <div className='w-full flex flex-col items-center h-screen mt-24'>
      <div className='w-full flex items-center justify-center'>
        <form className='w-full flex items-center justify-center'>
            <input className='border-2 border-black w-1/5 my-4 mr-4 py-2 px-2 text-2xl font-mono' type='text' placeholder="search..." value={filterText} onChange={(e) => setFilterText(e.target.value)}/>
            <select onChange={e => setGroupText(e.target.value)} className='bg-gray-300 py-2 px-2 flex justify-center items-center font-mono text-2xl'>
              <option value="capital">capital</option>
              <option value="currency">currency</option>
              <option value="native">native</option>
            </select>
        </form>
    </div>
      <ul className='w-full flex flex-col items-center justify-center'>
        {afterFilteredCountries.map((country,index) => <li key={index} className='text-2xl font-mono hover:bg-black hover:text-white duration-200 px-12 py-2 cursor-pointer' value={index} onClick={handleClick}>{country.name} - {groupText ? country[groupText] : country.capital}</li>)}
      </ul>
      
      {/* <ul>
        <li>{data.country.name}<span> {data.country.emoji}</span></li>
        <li>{data.country.capital}</li>
        <li>{data.country.currency}</li>
        <li>{data.country.languages.map((language) => {
            return <div key={language}>
              <p>{language.code}</p>
              <p>{language.name}</p>
            </div>
        })}</li>
        <li>{data.country.native}</li>
      </ul> */}
    </div>
  );
}

export default CountryList;
