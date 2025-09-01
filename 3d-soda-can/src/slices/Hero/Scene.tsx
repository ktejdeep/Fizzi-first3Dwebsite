'use client'

import FloatingCan from "@/components/FloatingCan"
import { Environment } from "@react-three/drei"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Group } from "three"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import useStore from "@/hooks/useStore";


// No need to register the plugin globally if you're using the hook
gsap.registerPlugin(useGSAP,ScrollTrigger);

type Props = {}

const Scene = (props: Props) => {

  const isReady = useStore((state) => state.isReady);
  const can1ref = useRef<Group>(null);
  const can2ref = useRef<Group>(null);
  const can3ref = useRef<Group>(null);
  const can4ref = useRef<Group>(null);
  const can5ref = useRef<Group>(null);
  const groupRef = useRef<Group>(null); // This is the main container group

  const Float_speed = 1.5;


  useGSAP(() => {
    if (
        !can1ref.current || !can2ref.current || !can3ref.current || 
        !can4ref.current || !can5ref.current
    ) return;
      
    isReady();


    gsap.to(can1ref.current.rotation, { duration: 0, z: -0.5 });
    gsap.to(can1ref.current.position, { duration: 0, x: -1.5 });

    gsap.to(can2ref.current.rotation, { duration: 0, z: 0.5 });
    gsap.to(can2ref.current.position, { duration: 0, x: 1.5 });

    gsap.to(can3ref.current.position, { duration: 0, y: 5, z: 2 });
    gsap.to(can4ref.current.position, { duration: 0, x: 2, y: 4, z: 2 });
    gsap.to(can5ref.current.position, { duration: 0, y: -5 });

    const introtl = gsap.timeline({ 
      defaults:{
        duration:3,
        ease:"back.out(1.4)"
      }
    });

    if (window.scrollY < 20){
    introtl
    .from(can1ref.current.position, {y:-5,x:1},0)
    .from(can1ref.current.rotation, {z:3},0)
    .from(can2ref.current.position, {y:5,x:1,z:3},0)
    .from(can2ref.current.rotation, {z:3},0 )
    }

    const scrolltl = gsap.timeline({
      defaults:{
        duration: 2,
      },
      scrollTrigger:{
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });
    
    scrolltl
    // .to(groupRef.current.rotation, {y:Math.PI * 2}, 0)

      //can 1  -  black cherry
    .to(can1ref.current.position, {y: -0.4, x: -0.4, z:-0.3}, 0)
    .to(can1ref.current.rotation, {z:0.3}, 0)

      //can 1  -  black cherry
    .to(can2ref.current.position, {y: -0.2, x: 1, z:-1}, 0)
    .to(can2ref.current.rotation, {z:0}, 0)

      //can 1  -  black cherry
    .to(can3ref.current.position, {x: -0.3, y:0.5, z:-1}, 0)
    .to(can3ref.current.rotation, {z: -0.1}, 0)
      //can 1  -  black cherry
    .to(can4ref.current.position, {x:0.3,y:-0.3,z:-0.5}, 0)
    .to(can4ref.current.rotation, {z:0.3}, 0)
      //can 1  -  black cherry
    .to(can5ref.current.position, {y: 0.5, x: 0.3,z: 0.3}, 0)
    .to(can5ref.current.rotation, {z:-0.25}, 0)

    .to(groupRef.current.position, {x:1, duration:3,ease:"sine.inOut"}, 1.3); // Adjust the main group position if needed
     

  }); // Scoping to the main group is best practice


  return (
    <group ref={groupRef}>
      {/* No need for the extra groups. The ref is now correctly forwarded 
        to the group inside each FloatingCan component. 
      */}
      <FloatingCan ref={can1ref} flavor="blackCherry" floatSpeed={Float_speed} />
      <FloatingCan ref={can2ref} flavor="lemonLime" floatSpeed={Float_speed} />
      <FloatingCan ref={can3ref} flavor="grape" floatSpeed={Float_speed} />
      <FloatingCan ref={can4ref} flavor="strawberryLemonade" floatSpeed={Float_speed} />
      <FloatingCan ref={can5ref} flavor="watermelon" floatSpeed={Float_speed} />

      <Environment files={"/hdr/field.hdr"} />
    </group>
  )
};

export default Scene;