import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import type { ReactElement } from 'react';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/SectionMain';
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton';
import {fetch,update,deleteItem,setRefetch,} from '../stores/positions/positionsSlice';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import PositionCard from '../components/PositionCard';
import UserCard from '../components/UserCard';
import { mdiInformation } from '@mdi/js';
import BaseIcon from '../components/BaseIcon';
import { getPageTitle } from '../config';
import Link from 'next/link';

const PositionsDashboard = () => {
  const [users, setUsers] = React.useState('Loading...');
  const [positions, setPositions] = React.useState([]);


  async function loadData() {
    const fns = [
      setUsers,
      setPositions,
    ];

    const responseUsers = await axios.get(`/users/count`);
    const responsePositions = await axios.get(`/positions`);
    
    Promise.all([
      responseUsers,
      responsePositions,
    ])
      .then((res) => res.map((el) => el.data))
      .then((data) => {setPositions(data[1].rows), console.dir(JSON.stringify(data[1]))});
      }

      React.useEffect(() => {
    loadData().then()
  }, []);

  return (
    <>
      <Head>
        <title>{getPageTitle('PositionsDashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Overview'
          main
        >
          Breadcrumbs 
        </SectionTitleLineWithButton>

        <div className='grid grid-cols-4 gap-6 lg:grid-cols-3 mb-6'>
         <>{positions.length > 0 ? (positions.map( (_position, index) => (
             <PositionCard  positionobj={_position}  key={_position.code}/> 
            )) ) : (<br/>)}</> 
        </div>
      </SectionMain>
    </>
  );
};

PositionsDashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PositionsDashboard;

/**
 *             <PositionCard  positionobj={_position}  key={_position.code}/> 
 */