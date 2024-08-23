import React from "react";
import { useRef } from "react";

import { HeroChart } from "@/components/hero/HeroChart";
import { Cover } from "@/components/ui/cover";

import { TextEffect } from "@/components/ui/text-effect";
import { LeaderBoardChart } from "@/components/leaderboard/LeaderBoardChart";

import { Button } from "@/components/ui/moving-border";
import { InView } from "@/components/ui/in-view";
import RenderIfVisible from "react-render-if-visible";
import LeaderboardFilters from "@/components/leaderboard/LeaderboardFilters";
import { useBenchmarkFilters } from "@/services/state/benchmarksStore";

// import '../index.css';

function HomePage() {
  const myRef = useRef<HTMLElement | null>(null);
  const {filters} = useBenchmarkFilters();

  return (
    <>
      <div className="max-w-5xl mx-auto px-6">
        <section className="w-full py-12 md:pt-24 lg:pt-24 h-[100vh]">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
            <div className="flex justify-center">
              <div className="relative h-[400px] w-full max-w-[400px] rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-[300px] w-[300px] blur-3xl rounded-full bg-gradient-to-r from-primary to-primary-foreground opacity-15" />
                </div>
                <HeroChart />
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="space-y-2 ">
                <h1 className="text-3xl font-heading tracking-tighter sm:text-4xl md:text-6xl">
                  <TextEffect per="word" as="h3" preset="slide">
                    What is the most
                  </TextEffect>
                  <Cover className="-ml-2 py-1 bg-gradient-to-r from-[#ffb15c] to-[#ffffff] bg-clip-text text-transparent">
                    blazingly fast
                  </Cover>
                  <TextEffect per="word" as="h3" preset="slide-with-delay">
                    stack?
                  </TextEffect>
                </h1>

                <p className="max-w-[600px] font-body  pt-6 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Let's rethink how we benchmark back-end technologies
                </p>
              </div>
              <div className="flex gap-10 font-body">
                <Button
                  borderRadius="1.75rem"
                  className="text-base font-semibold"
                  onClick={() =>
                    myRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  View all benchmarks
                </Button>
                <a
                  href="#"
                  className="inline-flex text-base h-10  items-center bg-opacity-90 justify-center rounded-full bg-white px-8 font-semibold text-primary-foreground  transition-colors hover:bg-primary/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  How and Why
                </a>
              </div>
            </div>
          </div>
        </section>
        <section ref={myRef}></section>
        <InView
          variants={{
            hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          viewOptions={{ margin: "0px 0px -200px 0px" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            

          <section className="mt-10 mb-24">
            <LeaderboardFilters/>

            <RenderIfVisible visibleOffset={0} stayRendered={true}>
              <LeaderBoardChart />
            </RenderIfVisible>
          </section>
        </InView>

        <section className="h-96"></section>
      </div>
    </>
  );
}

export default HomePage;
