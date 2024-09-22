import { Suspense } from "react";
import R3FCanvas from "./_components/R3FCanvas";
import AboutDescriptionPopup from "./_components/About";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="h-dvh w-screen font-mono">
      <section className="absolute bottom-0 left-0 z-10 m-4 max-h-36 max-w-xl overflow-auto bg-black/80 p-4 text-white md:max-h-none">
        <h1 className="mb-2 flex justify-between text-xl italic text-white md:text-2xl">
          <div>Click here...</div>
          <section className="sr-only">
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
          </section>
          <AboutDescriptionPopup />
        </h1>
        <hr className="my-4 border-neutral-400" />

        <h2 className="mt-2 text-base text-white md:text-xl">
          by{" "}
          <a
            href="https://lewei.me"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Richard L. Huang
          </a>{" "}
          and{" "}
          <a
            href="https://yufengzhao.com"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Yufeng Zhao
          </a>
          {" ("}as{" "}
          <a
            href="https://swtch.tel"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Switcheristic Telecommunications
          </a>
          {")"}
        </h2>
        <hr className="my-4 border-neutral-400" />
        <h2 className="mt-2 text-lg text-white md:text-xl">
          <a
            href="https://spamnewmediafestival.com/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            SPAM New Media Festival
          </a>
        </h2>
        <h3 className="mt-2 text-sm text-white md:text-base">
          September 27 - 29, 2024
          <br />
          Georgetown Steam Plant, Seattle, WA
        </h3>
      </section>
      <section className="fixed right-0 top-0 z-10 m-4 text-right text-white md:bottom-0 md:top-auto md:p-4">
        <h1 className="pr-4 text-base text-black md:text-lg">powered by</h1>
        <a
          href="https://banner-depot-2000.net"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            className="z-10 w-48 md:w-64"
            src={"/bd2k/banner-depot-2000-slim.svg"}
            width={300}
            height={200}
            alt="Banner Depot 2000"
          ></Image>
        </a>
      </section>

      <div className="h-dvh w-screen bg-[#0155F5]">
        <Suspense fallback={CanvasFallback()}>
          <R3FCanvas />
        </Suspense>
      </div>
    </main>
  );
}

function CanvasFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="my-auto text-4xl text-white">Loading...</h1>
    </div>
  );
}
