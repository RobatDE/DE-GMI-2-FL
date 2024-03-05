import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/positions/positionsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant, mdiPerspectiveLess } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';
import PositionAvatar from '../../components/PersonaAvatar';
import { Slider } from "@material-tailwind/react";

const PositionsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { positions } = useAppSelector((state) => state.positions);
  console.log('positions(appsel):');
  console.dir(positions);

  const { id } = router.query;
  const positionAvatar = PositionAvatar({personaobj: positions, image: positions['avatar'], className: 'h-60 w-60  ' });
  // console.log('positions avatar:');
  // console.log(positionAvatar);

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View positions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiPerspectiveLess}
          title={'View positions'}
          main
        >
        </SectionTitleLineWithButton>
        <CardBox >
        <div className="flex flex-row space-x-1">
        <div className={' mb-4'}>
        {positionAvatar}
        </div>
        <div className="flex flex-col content-start  space-x-1">
          <div className="flex flex-row space-x-1">
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Title</p>
              <p>{positions?.title}</p>
            </div>
          </div>
          <div className="flex flex-col content-start  space-x-1">
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Description</p>
              <p>{positions?.description}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Code</p>
              <p>{positions?.code}</p>
            </div>
          </div>
            <SwitchField
              field={{ name: 'disabled', value: positions?.disabled }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </div>
          <div className="flex w-96 flex-col gap-8">
          </div>
 
        </div>        

          <>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/positions/positions-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

PositionsView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PositionsView;
