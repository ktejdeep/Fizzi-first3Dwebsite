'use client';
import { Float } from '@react-three/drei';
import React from 'react'
import { SodaCan, SodaCanProps } from './SodaCan';
import { forwardRef } from 'react';
import { Group } from 'three/examples/jsm/libs/tween.module.js';

type FloatingCanProps = {
    flavor?: SodaCanProps['flavor'];
    floatSpeed?: number;
    floatIntensity?: number;
    rotationIntensity?: number;
    floatingRange?: [number, number];
    children?: React.ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(
({flavor='grape',
    floatSpeed= 1.5
    ,floatIntensity = 1,
    rotationIntensity = 1,
    floatingRange = [-.1,-.1],
    children
    ,...props},
    ref,

) => {
  return (
    <group ref={ref} {...props} >

        <Float 
            speed = {floatSpeed}
            rotationIntensity={floatSpeed}
            floatIntensity={floatIntensity}
            floatingRange={floatingRange}
        >
            {children}
            <SodaCan flavor={flavor}/>
        </Float>

    </group>
        );
     },
);

FloatingCan.displayName = 'FloatingCan';

export default FloatingCan;