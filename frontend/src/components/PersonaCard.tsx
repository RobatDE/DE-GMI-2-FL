import { mdiCheckDecagram } from '@mdi/js';
import { Field, Form, Formik } from 'formik';
import { useAppSelector } from '../stores/hooks';
import CardBox from './CardBox';
import FormCheckRadio from './FormCheckRadio';
import PersonaAvatar from './PersonaAvatar';
import React, { ReactNode } from 'react';
import RCSlider from 'rc-slider';
import { Slider } from "@material-tailwind/react";
import 'rc-slider/assets/index.css';

///const PersonaCard = ({ className }: Props) => {
  
type Props = {
  personaobj?: object | null;
  avatar?: object | null;
  className?: string;
  children?: ReactNode;
};

function PersonaCard({
  personaobj,
  avatar,
  className = '',
  children,
}: Props) {
console.dir('_personas:'+JSON.stringify(personaobj));
  const personas = useAppSelector((state) => state.personas);
  const personaAvatar = PersonaAvatar({personaobj: personaobj, image: personaobj['avatar'] , className});

  return (
    <CardBox className={className}>
      <div className='flex flex-col z=[1] lg:flex-row items-center justify-around lg:justify-center'>
        <div className='space-y-3  text-center md:text-left lg:mx-12'>
          <div className='flex justify-center md:block'>
          <h1 className='text-2xl'>
            {personaAvatar}
          </h1>
          <br/>
          Personas: {personaobj['Name']}<br/>
          Role: {personaobj['Occupation']}<br/>
          Age: {personaobj['Age']}<br/>
          Education: {personaobj['EducationLevel']}<br/>
          {personaobj['Income']}<br/>
          <br/>
          </div>
          <div className="flex w-96 flex-col gap-8">
            <Slider size="lg" defaultValue={50} className="text-[#2ec947]" placeholder=""/>
            <Slider size="lg" defaultValue={40} className="text-[#2ec947]" placeholder=""/>
            <Slider size="lg" defaultValue={60} className="text-[#2ec947]" placeholder=""/>
          </div>
        </div>
      </div>
    </CardBox>
  );
}

export default PersonaCard;
