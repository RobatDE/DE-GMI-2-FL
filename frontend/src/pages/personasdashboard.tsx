import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import type { ReactElement } from 'react';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/SectionMain';
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton';
import {fetch,update,deleteItem,setRefetch,} from '../stores/personas/personasSlice';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import PersonaCard from '../components/PersonaCard';
import UserCard from '../components/UserCard';
import { mdiInformation } from '@mdi/js';
import BaseIcon from '../components/BaseIcon';
import { getPageTitle } from '../config';
import Link from 'next/link';

const PersonasDashboard = () => {
  const [users, setUsers] = React.useState('Loading...');
  const [personas, setPersonas] = React.useState([]);


  async function loadData() {
    const fns = [
      setUsers,
      setPersonas,
    ];

    const responseUsers = await axios.get(`/users/count`);
    const responsePersonas = await axios.get(`/personas`);

    Promise.all([
      responseUsers,
      responsePersonas,
    ])
      .then((res) => res.map((el) => el.data))
      .then((data) => {setPersonas(data[1].rows), console.dir(data[1].rows)});
       console.log('end of loaddata:     '+personas);
      }
/*         .then((data) => {data.forEach((el, i) => fns[i](el.count))
*/
  React.useEffect(() => {
    loadData().then()
  }, []);

  return (
    <>
      <Head>
        <title>{getPageTitle('PersonasDashboard')}</title>
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
         <>{personas.length > 0 ? (personas.map( (_personas) => (
          <PersonaCard  personaobj={_personas}  key={_personas.id}/> 

         )) ) : (<br/>)}</> 
        </div>
      </SectionMain>
    </>
  );
};

PersonasDashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PersonasDashboard;
