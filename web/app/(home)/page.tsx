import { HomeNav } from "@/components/home-nav";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { sitConfig } from "@/config/site";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ai.Doc | Home",
  description: sitConfig.description
};
export default function Home() {
  return (
    <main className="min-h-screen">
      <header className=" border-b">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <Logo />
          <HomeNav />
        </div>
      </header>
      <section className="max-w-screen-lg mx-auto pt-16 px-4">
        <div className="flex flex-col items-center md:items-start w-full h-full ">
          <p className="text-6xl font-semibold px-2 ">
            <strong>AI</strong>
            .Doc
          </p>
          <p className="text-xl text-neutral-400 dark:text-neutral-200 mt-4 text-center md:text-left px-4 md:px-0">{sitConfig.description}</p>
          <div className="flex items-center gap-4 mt-8">
            <Link href="/login">
              <Button >
                Get Start
              </Button>
            </Link>
            <Link href={sitConfig.github} target="_blank">
              <Button variant="secondary">Github</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
