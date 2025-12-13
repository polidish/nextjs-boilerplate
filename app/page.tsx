"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#D2691E] text-white min-h-screen">
      {/* pier.jpeg */}
      <div className="relative">
        <Image src="/pier.jpeg" alt="Pier" width={1920} height={1080} className="w-full object-cover" priority />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
          <p className="bg-black/60 px-8 py-4 rounded text-2xl md:text-4xl font-bold text-yellow-300">
            Visualize your ad right here, to the left, or in the center.
          </p>
        </div>
      </div>

      {/* decanter.jpeg */}
      <div className="relative -mt-px">
        <Image src="/decanter.jpeg" alt="Decanter" width={1920} height={1080} className="w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="bg-black/50 px-10 py-6 rounded text-4xl md:text-6xl font-bold text-yellow-300 text-center leading-tight">
            Advertisements are<br />absolutely uncurated<br />for your privacy
          </p>
        </div>
      </div>

      {/* peacock.jpeg */}
      <div className="relative -mt-px">
        <Image src="/peacock.jpeg" alt="Peacock" width={1920} height={1080} className="w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="bg-black/60 px-10 py-6 rounded text-4xl md:text-5xl font-bold text-yellow-300 text-center leading-tight">
            Polidish: the Outpost where luxury partners<br />meet High Worth While Individuals (HWWI).
          </p>
        </div>
      </div>

      {/* Two black portals */}
      <div className="max-w-5xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-16">
        <div className="bg-black p-16 text-center rounded-2xl">
          <h2 className="text-5xl font-black text-yellow-300 underline decoration-yellow-300 mb-6">
            POLIDISH.STORE COMING SOON FOR
          </h2>
          <p className="text-3xl text-yellow-300">ORIGINAL POLIDISH BRAND MERCH</p>
        </div>
        <div className="bg-black p-16 text-center rounded-2xl">
          <h2 className="text-5xl font-black text-yellow-300 underline decoration-yellow-300 mb-6">
            POLIDISH.BLOG COMING SOON IN
          </h2>
          <p className="text-3xl text-yellow-300">2026-MEMBERS EXTENDED DISH</p>
        </div>
      </div>

      {/* Your exact footer */}
      <footer className="bg-[#B4520A] py-16 text-center text-lg">
        Polidish LLC is not legally responsible for your poor judgement. If you endanger children, threaten terrorism or break the law, you reveal yourself. Two-factor Authentication. It's a troll-free freedom fest.
        <br /><br />
        <span className="text-4xl font-bold text-yellow-300">…127 Minds Day I</span>
        <br />
        <span className="text-sm text-gray-300">Copyright 2025 Polidish LLC. All rights reserved.</span>
      </footer>
    </div>
  );
}
