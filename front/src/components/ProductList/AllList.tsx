import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import CoffeeList from './CoffeeList';

const AllListBg = tw.div`flex-col bg-background select-none`;

const AllList = () => {
  return (
    <AllListBg>
      <SearchBar />
      <CoffeeList />
    </AllListBg>
  );
};

export default AllList;
