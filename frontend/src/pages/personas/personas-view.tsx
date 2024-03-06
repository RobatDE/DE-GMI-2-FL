import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/personas/personasSlice';
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
import PersonaAvatar from '../../components/PersonaAvatar';
import { Slider } from "@material-tailwind/react";

const PersonasView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { personas } = useAppSelector((state) => state.personas);
  console.log('personas(appsel):');
  console.log(personas);

  const { id } = router.query;
  const personaAvatar = PersonaAvatar({personaobj: personas, image: personas['avatar'], className: 'h-60 w-60  ' });
  console.log('personas avatar:');
  console.log(personaAvatar);

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View personas')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiPerspectiveLess}
          title={'View personas'}
          main
        >
        </SectionTitleLineWithButton>
        <CardBox >
        <div className="flex flex-row space-x-1">
        <div className={' mb-4'}>
        {personaAvatar}
        </div>
        <div className="flex flex-col content-start  space-x-1">
          <div className="flex flex-row space-x-1">
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Name</p>
              <p>{personas?.Name}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Description</p>
              <p>{personas?.Description}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Gender</p>
              <p>{personas?.Gender}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>GenderIdentity</p>
              <p>{personas?.GenderIdentity}</p>
            </div>
          </div>
          <div className="flex flex-row space-x-1">
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Occupation</p>
              <p>{personas?.Occupation}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>EducationLevel</p>
              <p>{personas?.EducationLevel}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Incomerange</p>
              <p>{personas?.IncomeRange}</p>
            </div>

            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Age</p>
              <p>{personas?.Age}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>MaritalStatus</p>
              <p>{personas?.MaritalStatus}</p>
            </div>
          </div>
          <div className="flex flex-row space-x-1">

            <div className={'mb-4'}>
              <p className={'block  mb-2'}>EmploymentType</p>
              <p>{personas?.EmploymentType}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>EmploymentType</p>
              <p>{personas?.HouseholdComposition}</p>
            </div>     
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Religion</p>
              <p>{personas?.Religion}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Income</p>
              <p>{personas?.Income}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Nationality</p>
              <p>{personas?.Nationality}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Geography</p>
              <p>{personas?.Geography}</p>
            </div>
          </div>
          <div className="flex flex-row space-x-1">
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Ethnicity</p>
              <p>{personas?.Ethnicity}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Race</p>
              <p>{personas?.Race}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Language</p>
              <p>{personas?.Language}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>PoliticalAffiliation</p>
              <p>{personas?.PoliticalAffiliation}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>HomeOwnership</p>
              <p>{personas?.HomeOwnership}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>PersonalityDetails</p>
              <p>{personas?.PersonalityDetails}</p>
            </div>
            </div>
          <div className="flex flex-row space-x-1">
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>PositionDetails</p>
              <p>{personas?.PositionDetails}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Communications</p>
              <p>{personas?.CommunicationsDetails}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Motives</p>
              <p>{personas?.MotivationsDetails}</p>
            </div>
            <div className={'mb-4'}>
              <p className={'block  mb-2'}>Role</p>
              <p>{personas?.role ?? 'No data'}</p>
            </div>
          </div>
            <SwitchField
              field={{ name: 'disabled', value: personas?.disabled }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </div>
          <div className="flex w-96 flex-col gap-8">
            <Slider size="lg" defaultValue={50} className="text-[#2ec947]" placeholder=""/>
            <Slider size="lg" defaultValue={40} className="text-[#2ec947]" placeholder=""/>
            <Slider size="lg" defaultValue={60} className="text-[#2ec947]" placeholder=""/>
          </div>
 
        </div>        

          <>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/personas/personas-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

PersonasView.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PersonasView;
