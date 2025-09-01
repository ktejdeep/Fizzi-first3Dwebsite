'use client';

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { View } from "@react-three/drei";
import Scene from "./scene" 

/**
 * Props for `SkyDive`.
 */
export type SkyDiveProps = SliceComponentProps<Content.SkyDiveSlice>;

/**
 * Component for "SkyDive" Slices.
 */
const SkyDive: FC<SkyDiveProps> = ({ slice }) => {
  return (
    <Bounded  
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="skydive h-screen  "
    >
      <h2 className="sr-only">{slice.primary.textsenetence}</h2>

      <View className="w-screen h-screen">
        <Scene flavour={slice.primary.flavour} sentence={slice.primary.textsenetence}></Scene>
      </View>

    </Bounded>
  );
};

export default SkyDive;
