"use client";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSession } from "next-auth/react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link)
const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
export const Hero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const { data: session } = useSession();
  const displayName = session?.user?.email?.split("@")[0] || "Login to Upload";
const Pref = session ? "/dashboard" : "/login;"


  function capitalizeFirstLetter(string: string) {
    if (string.length === 0) {
      return ""; // Handle empty strings gracefully
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const name = capitalizeFirstLetter(displayName);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
          Beta Now Live!
        </span> */}
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Personalized video sharing Platform
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          Choose exactly who can watch your video before it`&apos`s even
          finished uploading. Share your video only with specific individuals,
          put it behind a password, or hide it from everyone but you.
        </p>
        <MotionLink
        href={Pref}
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
          {name}
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </MotionLink>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};
