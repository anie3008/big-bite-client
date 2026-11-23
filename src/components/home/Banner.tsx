
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#351719] text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 md:grid-cols-2 md:py-24">

        {/* Hero Text */}
        <div>
          <p className="mb-4 inline-block rounded-full bg-brand/30px-4 py-2 text-sm text-brand-light">
            Freshly baked, delivered with love
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Hot & Fresh Pizza{" "}
            <span className="text-[#D98287]">
              Delivered to Your Door
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-brand-light md:text-lg">
            Delicious pizzas, made with love and delivered fresh
            to your doorstep. Your next favourite bite is just
            a click away!
          </p>

          <Link
            href="/menu"
            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
          >
            Explore Pizza Menu
            <ArrowRight size={20} />
          </Link>
        </div>

       

 {/* Pizza Illustration */}
       
       <div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
  {/* Soft decorative glow */}
  <div className="absolute inset-10 rounded-full bg-brand/20 blur-3xl" />

  <Image
    src="/images/bigbite-hero.png"
    alt="Freshly baked BigBite pizza"
    width={1648}
    height={927}
    priority
    className="relative z-10 h-auto w-full object-contain drop-shadow-2xl"
  />
</div>

      </div>
    </section>
  );
}
