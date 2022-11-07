import React from 'react';
import { Pagination } from 'antd';
import './NavigationList.css';

function NavigationList({ newPage }) {
  return <Pagination size="small" defaultCurrent={1} total={50} onChange={(value) => newPage(value)} />;
}
export default NavigationList;
