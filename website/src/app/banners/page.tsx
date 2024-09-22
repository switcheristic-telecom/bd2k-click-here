"use client";
import Image from "next/image";
import { useState } from "react";

type TLanguage = "en" | "zh" | "ja" | "es" | "kr";

function languageToName(language: TLanguage) {
  switch (language) {
    case "en":
      return "English";
    case "zh":
      return "Chinese";
    case "ja":
      return "Japanese";
    case "es":
      return "Spanish";
    case "kr":
      return "Korean";
  }
}

function languageToShortName(language: TLanguage) {
  switch (language) {
    case "en":
      return "EN";
    case "zh":
      return "ZH";
    case "ja":
      return "JA";
    case "es":
      return "ES";
    case "kr":
      return "KR";
  }
}

const allLanguages: TLanguage[] = ["en", "es", "zh", "ja", "kr"];

const IMAGE_SAMPLES = [
  {
    language: "zh",
    src: "/images/click-here-sample-zh.png",
    xOffset: 110,
    yOffset: 0,
  },
  {
    language: "en",
    src: "/images/click-here-sample-en.gif",
    xOffset: -110,
    yOffset: 0,
  },
];

export default function Home() {
  const [language, setLanguage] = useState<TLanguage>("zh");
  const [currentImage, setCurrentImage] = useState(
    IMAGE_SAMPLES.filter((img) => img.language === language)[0],
  );

  return (
    <div className="flex h-dvh w-screen items-center justify-center font-mono">
      <div className="absolute left-0 top-0 m-4 text-right text-white">
        {allLanguages.map((lang, i) => (
          <>
            <button
              key={i}
              className={`${language === lang ? "underline" : ""}`}
              onClick={() => {
                setLanguage(lang);
                setCurrentImage(
                  IMAGE_SAMPLES.filter((img) => img.language === lang)[0],
                );
              }}
            >
              {languageToShortName(lang)}
            </button>
            {i < allLanguages.length - 1 && <span> / </span>}
          </>
        ))}
      </div>
      <div
        style={{
          transform: `translate(${currentImage?.xOffset}px, ${currentImage?.yOffset}px)`,
        }}
      >
        <Image
          src={currentImage!.src || ""}
          alt="Click Here"
          width={468}
          height={60}
        />
      </div>
    </div>
  );
}
