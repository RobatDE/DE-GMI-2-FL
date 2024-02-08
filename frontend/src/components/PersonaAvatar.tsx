/* eslint-disable @next/next/no-img-element */
// Why disabled:
// avatars.dicebear.com provides svg avatars
// next/image needs dangerouslyAllowSVG option for that

import React, { ReactNode } from 'react';

type Props = {
  personaobj?: object | null;
  image?: object | null;
  className?: string;
  children?: ReactNode;
};

export default function PersonaAvatar({
  personaobj,
  image,
  className = '',
  children,
}: Props) {
  const avatarImage = image && image[0] ? `${image[0].publicUrl}` : '/gen-person-outline-image-grey.jpg';


return (
    <div className={className}>
      {/* <img
        src={avatarImage}
        alt={personaobj['Description']}
        className='rounded-full z-[1] h-20 w-20 ml-8 mt-20 bg-gray-100 dark:bg-slate-800'
      /> */}
      <img
        src={avatarImage}
        alt={personaobj['Name']}
        className='z-10 block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800'
      />

      {children}
    </div>
  );
}
