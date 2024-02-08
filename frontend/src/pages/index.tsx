import React from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import BaseButton from '../components/BaseButton';
import CardBox from '../components/CardBox';
import SectionFullScreen from '../components/SectionFullScreen';
import LayoutGuest from '../layouts/Guest';
import { Field, Form, Formik } from 'formik';
import FormField from '../components/FormField';
import FormCheckRadio from '../components/FormCheckRadio';
import BaseDivider from '../components/BaseDivider';
import ButtonsBase from '../components/ButtonsBase';
import { getPageTitle } from '../config';
import Link from 'next/link';
import CardBoxComponentTitle from '../components/CardBoxComponentTitle';
import BaseIcon from '../components/BaseIcon';
import { mdiInformation } from '@mdi/js';
import {Helmet} from "react-helmet";

export default function Starter() {
  return (
    <>
      <Head>
        <Helmet>
          <div>
          <meta property="og:image" content="https://digitalexhaust.co/wp-content/uploads/2023/05/Screenshot-2023-05-24-at-4.05.05-PM.png"/>
            <meta property="og:image:secure_url" content="https://digitalexhaust.co/wp-content/uploads/2023/05/Screenshot-2023-05-24-at-4.05.05-PM.png"/>
            <meta property="og:image:width" content="1771"/>
            <meta property="og:image:height" content="938"/>
            <meta property="og:image:alt" content="digital exhaust hompage image"/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="og:description" content="Home"/>
            <meta property="og:type" content="article"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:site_name" content="Digital Exhaust"/>
            <meta property="og:title" content="Home"/>
            <meta property="og:url" content="https://digitalexhaust.co/"/>
            <meta property="og:updated_time" content="2023-05-24T22:07:17+00:00"/>
            <meta property="profile:first_name" content="Tracy"/>
            <meta property="profile:last_name" content="Thayne"/>
            <meta property="profile:username" content="Tracy Thayne"/>
          </div>
        </Helmet>
      </Head>

      <SectionFullScreen bg='violet'>
        <style type="text/css" id="custom-background-css">
        </style>

        <CardBox className='w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12'>
          <CardBoxComponentTitle title='Welcome to your DE-GMI-2 app!' />
          <BaseDivider />
          <div className='space-y-3'>
          </div>
          <BaseDivider />
          <ButtonsBase>
            <BaseButton
              href='/login'
              label='Login'
              color='info'
              className='w-full'
            />
          </ButtonsBase>
          <div className='grid grid-cols-1 gap-2 lg:grid-cols-4 mt-2'>
          </div>
        </CardBox>
      </SectionFullScreen>
    </>
  );
}

Starter.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
