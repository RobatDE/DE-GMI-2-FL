import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TablePositions from '../../components/Positions/TablePositions';
import BaseButton from '../../components/BaseButton';
import axios from 'axios';
import { useAppDispatch } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import { setRefetch, uploadCsv } from '../../stores/positions/positionsSlice';

const PositionsTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [positions, setPositions] = React.useState([]);

  const dispatch = useAppDispatch();

  async function loadData() {

    const fns = [
      setPositions,
    ];

    const responsePositions = await axios.get(`/positions`);
    
      Promise.all([
        responsePositions,
      ])
      .then((data) => {setPositions(data)});
        }

      React.useEffect(() => {
        loadData().then()
      }, []);

  const [filters] = useState([
    { label: 'Title', title: 'title' },
    { label: 'Code', title: 'code' },
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

  const getPositionsCSV = async () => {
    const response = await axios({
      url: '/positions?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'positionsCSV.csv';
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
        <title>{getPageTitle('Positions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Positions'
          main
        >
        </SectionTitleLineWithButton>
        <CardBox className='mb-6'>
          <BaseButton
            className={'mr-3 btn-xs'}
            href={'/positions/positions-new'}
            color='info'
            label='Add Filter'
            onClick={addFilter}
          />
          <BaseButton
            className={'mr-3 btn-xs'}
            color='info'
            label='Download CSV'
            onClick={getPositionsCSV}
          />
        </CardBox>
        <CardBox className='mb-6' hasTable>
          <TablePositions
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

PositionsTablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PositionsTablesPage;
