'use client';
import { FC, JSX } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import Scene from "./Scene";
import { View } from "@react-three/drei";
import { Bubbles } from "@/components/Bubbles";
import useStore from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {

  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)",true);

  useGSAP(() =>{
      if (!ready && isDesktop) return;

      const tl = gsap.timeline();
      tl
      .set(".hero", {opacity: 1})
      .from(".hero-header", {scale: 3, opacity: 0,ease: "power4.in", delay: 0.3, stagger: 1,})

      tl.from(".hero-subheading", {y: 30, opacity: 0,},"+=0.8",)
      .from(".hero-body", {y: 10, opacity: 0,},"+=0.2",)
      .from("hero-button", {y: 10, opacity: 0,},"+=0.6",);

      // First timeline for background color
      gsap.timeline({
        scrollTrigger: { 
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      })
      .fromTo("body", {
        backgroundColor: "#FDE047",
      }, {
        backgroundColor: "#D9F99D",
        overwrite: "auto",
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".text-side-heading",
          start: "top center",
          end: "bottom center",
          scrub: false,
          toggleActions: "play none none reverse"
        }
      })
      .from(".text-side-heading .split-char", {
        scale: 1.3,
        y: 40,
        rotate: -25,
        opacity: 0,
        stagger: {
          each: 0.1,
          from: "start"
        },
        duration: 1,
        ease: "back.out(3)"
      })
    .from(".text-side-body", {
      y:20,
      opacity: 0,
    });
  },{dependencies: [ready, isDesktop]});

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="hero opacity-0" >
      {isDesktop && (
          <View className="hero-scene pointer-events-none sticky top-0 z-[50] -mt-[100vh] hidden w-screen h-screen md:block">
            <Scene/>
            <Bubbles count={300} speed={1} repeat={true}/>
          </View>
      )}

      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">

            <h1 className="hero-header text-8xl font-[1000] uppercase leading-[.8] text-orange-500 md:text-[10rem] lg:text-[13rem] ">
              <TextSplitter text={asText(slice.primary.heading)} />
            </h1>

            <div className="hero-subheading mt-12 text-5xl font-emibold text-sky-950 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>

            <div className="hero-body text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>

            <Button buttonLink={slice.primary.button_link} buttonText={slice.primary.button_text} className="hero-button mt-12"/>
            
          </div>
        </div>


        <div className="grid text-side relative z-[80] h-screen items-center gap-0 mid:grid-cols-2">

          <PrismicNextImage className="w-full md:hidden" field={slice.primary.cans_image} />

          <div>
            <h2 className="text-side-heading text-balance text-3xl font-semibold uppercase text-sky-950 lg:text-9xl" >
              <TextSplitter text={asText(slice.primary.second_heading)}/>
              </h2>
          </div>

          <div className="text-side-body mt-1 max-w-xl text-balance text-2xl font-normal text-sky-950 ">
            <PrismicRichText field={slice.primary.second_body} />
          </div>

        </div>
      </div>
    </Bounded>
  );
};

export default Hero;