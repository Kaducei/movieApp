import React from 'react';
import './SearchFilms.css';
import { Input } from 'antd';

const debounce = require('lodash.debounce');

function SearchFilms({ fetchData }) {
  const debFetch = debounce(fetchData, 300);
  return (
    <header className="header">
      <form
        className="newTaskForm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          placeholder="Basic usage"
          onChange={(e) => {
            debFetch(e.target.value);
          }}
        />
      </form>
    </header>
  );
}
export default SearchFilms;
