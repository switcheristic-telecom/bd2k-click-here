"use client";

import React, { useState } from "react";

const AboutDescriptionPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative my-auto inline-block">
      <button
        className="inline-block text-base text-white underline"
        onClick={togglePopup}
      >
        {">"} show more
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-30 mx-auto flex max-w-3xl items-center justify-center">
          <div className="relative z-30 h-dvh overflow-auto rounded bg-black/70 p-8 shadow md:max-h-96">
            <h2 className="mb-4 text-xl font-bold">Click here...</h2>
            <p className="mt-4 text-base">
              {` Click Here… is an interactive installation that showcases an
              archive of early web banner ads in different languages curated
              from the Wayback Machine. Banner ads are a form of graphical
              advertisement prevalent on the web in the late 1990s and early
              2000s. Widely regarded by early web users as a visual nuisance for
              their gaudy graphics and flashy animations, banner ads
              nevertheless played an important role in shaping the online
              experience for users worldwide.`}
            </p>
            <p className="mt-4 text-base">
              {` Click Here… is composed of a period-appropriate CRT monitor, a
              computer mouse, and a wall projection. Visitors can click the
              mouse button to browse through banner ad frames centered on the
              iconic phrase "click here" (or its counterparts in different
              languages) on the monitor. Each time a new banner ad frame is
              loaded, the wall projection showcases the original web page where
              the banner ad originally appeared. By highlighting the most
              archetypical phrase in these ads and showcasing the original web
              pages, Click Here… is both a demonstration of the dot-com era
              commercial culture and a comparative study of the distinctive
              characteristics and commonalities of early web design patterns
              between web pages in different languages.`}
            </p>
            <p className="mt-4 text-base">
              {`By offering a space to
              (re)experience the early web’s ethos and aesthetics, Click Here…
              invites visitors to reflect upon the trending nostalgia of the
              dot-com era through exploring the tension between romanticizing
              the past web and acknowledging its complex legacy in paving the
              way for the hyper-surveilled, ad-saturated Internet of today.`}
            </p>
            <button
              className="absolute right-0 top-0 rounded p-6 text-white"
              onClick={togglePopup}
            >
              [×]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutDescriptionPopup;
