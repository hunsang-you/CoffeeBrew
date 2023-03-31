import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import CoffeeList from './CoffeeList';
import Paging from './Pagings';
import { listAPI } from '../../api/api';
const AllListBg = tw.div`flex-col bg-background select-none`;

const AllList = () => {
  useEffect(() => {
    const getLists = async () => {
      await listAPI
        .getBeans('page=0')
        .then((request) => console.log(request.data))
        .catch((e) => console.log(e));
    };
    getLists();
  }, []);

  return (
    <AllListBg>
      <SearchBar />
      <CoffeeList />
      <Paging />
    </AllListBg>
  );
};

export default AllList;
