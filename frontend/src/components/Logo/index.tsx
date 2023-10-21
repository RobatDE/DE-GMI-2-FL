import React from 'react';

type Props = {
  className?: string;
  logofilename?: string;
};

let srcLogo = 'https://digitalexhaust.co/wp-content/uploads/2023/04/DE-Logo-250-px-x-45-px.png';

export default function Logo({ className = '', logofilename = ''}: Props) {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  if(logofilename != null )
     srcLogo = logofilename;
  return (
    <img
      src={srcLogo}
      className={className}
      alt={'Digital Exhaust logo'}
    ></img>
  );
}
