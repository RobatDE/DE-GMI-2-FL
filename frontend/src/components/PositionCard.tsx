import { mdiCheckDecagram } from '@mdi/js';
import { Field, Form, Formik } from 'formik';
import { useAppSelector } from '../stores/hooks';
import CardBox from './CardBox';
import FormCheckRadio from './FormCheckRadio';
import PositionAvatar from './PersonaAvatar';
import React, { ReactNode } from 'react';
import { Slider } from "@material-tailwind/react";
import 'rc-slider/assets/index.css';

///const PositionCard = ({ className }: Props) => {
  
type Props = {
  positionobj?: object | null;
  avatar?: object | null;
  className?: string;
  children?: ReactNode;
};

function PositionCard({
  positionobj,
  avatar,
  className = '',
  children,
}: Props) {
console.dir('_positionobj:'+JSON.stringify(positionobj));
  const positions = useAppSelector((state) => state.positions);
  const positionAvatar = PositionAvatar({personaobj: positionobj, image: positionobj['avatar'] , className});

  return (
    <CardBox className={className}>
      <div className='flex flex-col z=[1] lg:flex-row items-center justify-around lg:justify-center'>
        <div className='space-y-3  text-center md:text-left lg:mx-12'>
          <div className='flex justify-center md:block'>
          <h1 className='text-2xl'>
            {positionAvatar}
          </h1>
          <br/>
          Positions: {positionobj['title']}<br/>
          Code: {positionobj['code']}<br/>
          <br/>
          </div>
          <div className="flex w-96 flex-col gap-8">
            
          </div>
        </div>
      </div>
    </CardBox>
  );
}

export default PositionCard;
