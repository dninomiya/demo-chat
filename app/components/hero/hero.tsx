import Image from 'next/image';
import React from 'react';
import image from './image.png';

export default function Hero() {
  return (
    <div className="absolute inset-0">
      <Image fill className="object-cover" src={image} alt="" />
    </div>
  );
}
