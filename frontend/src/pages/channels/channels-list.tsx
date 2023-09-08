import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TableChannels from '../../components/Channels/TableChannels';
import BaseButton from '../../components/BaseButton';
import axios from 'axios';
import { useAppDispatch } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import { setRefetch, uploadCsv } from '../../stores/channels/channelsSlice';

const ChannelsTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const dispatch = useAppDispatch();

  const [filters] = useState([
    { label: 'Channel', title: 'channel' },
    { label: 'Content', title: 'content' },
    { label: 'Redirect Id', title: 'redirect_id', number: 'true' },
    { label: 'Hits', title: 'hits', number: 'true' },
    { label: 'Unique Hits', title: 'unique_hits', number: 'true' },

    { label: 'Project', title: 'project' },
    { label: 'Event', title: 'event' },
    { label: 'Owner', title: 'owner' },
    { label: 'Redirect', title: 'redirect' },
  ]);

  const addFilter = () => {
    const newItem = {
      id: uniqueId(),
      fields: {
        filterValue: '',
        filterValueFrom: '',
        filterValueTo: '',
        selectedField: '',
      },
    };
    newItem.fields.selectedField = filters[0].title;
    setFilterItems([...filterItems, newItem]);
  };

  const getChannelsCSV = async () => {
    const response = await axios({
      url: '/channels?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'channelsCSV.csv';
    link.click();
  };

  const onModalConfirm = async () => {
    if (!csvFile) return;
    await dispatch(uploadCsv(csvFile));
    dispatch(setRefetch(true));
    setCsvFile(null);
    setIsModalActive(false);
  };

  const onModalCancel = () => {
    setCsvFile(null);
    setIsModalActive(false);
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Channels')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Channels Table'
          main
        >
          Breadcrumbs
        </SectionTitleLineWithButton>
        <CardBox className='mb-6'>
          <BaseButton
            className={'mr-3'}
            href={'/channels/channels-new'}
            color='info'
            label='New Item'
          />
          <BaseButton
            className={'mr-3'}
            color='info'
            label='Add Filter'
            onClick={addFilter}
          />
          <BaseButton
            className={'mr-3'}
            color='info'
            label='Download CSV'
            onClick={getChannelsCSV}
          />
          <BaseButton
            color='info'
            label='Upload CSV'
            onClick={() => setIsModalActive(true)}
          />
        </CardBox>
        <CardBox className='mb-6' hasTable>
          <TableChannels
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
          />
        </CardBox>
      </SectionMain>
      <CardBoxModal
        title='Upload CSV'
        buttonColor='info'
        buttonLabel={'Confirm'}
        // buttonLabel={false ? 'Deleting...' : 'Confirm'}
        isActive={isModalActive}
        onConfirm={onModalConfirm}
        onCancel={onModalCancel}
      >
        <DragDropFilePicker
          file={csvFile}
          setFile={setCsvFile}
          formats={'.csv'}
        />
      </CardBoxModal>
    </>
  );
};

ChannelsTablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default ChannelsTablesPage;
