import Image from "next/image";



export default function Page() {

  return (

    <main className="flex flex-col w-full items-center">



      {/* TOP BANNER */}

      <section className="w-full py-6 px-6 flex justify-between text-lg font-semibold tracking-wide">

        <div>YOU ARE CORDIALLY INVITED TO THE POLIDISH VENUE</div>

        <div>FREEDOM IS DELIBERATE</div>

      </section>



      {/* MAIN CONTENT */}

      <section className="w-full flex justify-center gap-10 px-6">



        {/* LEFT COLUMN */}

        <div className="flex flex-col gap-6 w-1/3">



          {/* Image 1 */}

          <div className="relative">

            <Image

              src="/images/pier.jpg"

              width={600}

              height={900}

              alt="Pier"

              className="rounded-lg object-cover"

            />

            <div className="absolute bottom-3 left-3 text-yellow-200 font-semibold text-sm">

              Visualize your ad right here, to the left, or in the center.

            </div>

          </div>



          {/* Image 2 */}

          <div className="relative">

            <Image

              src="/images/decanter.jpg"

              width={600}

              height={900}

              alt="Decanter"

              className="rounded-lg object-cover"

            />

            <div className="absolute bottom-3 left-3 text-yellow-200 font-semibold text-sm">

              Advertisements are absolutely uncurated for your privacy.

            </div>

          </div>



          {/* Image 3 */}

          <div className="relative">

            <Image

              src="/images/peacock.jpg"

              width={600}

              height={900}

              alt="Peacock"

              className="rounded-lg object-cover"

            />

            <div className="absolute bottom-3 left-3 text-yellow-200 font-semibold text-sm">

              Polidish: The Outpost where luxury partners meet High Worth While Individuals (HWWI).

            </div>

          </div>



          {/* Blog + Store */}

          <div className="flex flex-col gap-4 mt-4">

            <button className="w-full py-3 rounded bg-black text-yellow-300 font-semibold">

              POLIDISH.BLOG COMING SOON IN 2026 — MEMBERS EXTENDED DISH

            </button>

            <button className="w-full py-3 rounded bg-black text-yellow-300 font-semibold">

              POLIDISH.STORE COMING SOON FOR ORIGINAL POLIDISH BRAND MERCH

            </button>

          </div>



        </div>



        {/* RIGHT COLUMN */}

        <div className="flex flex-col w-1/3">



          {/* LOGIN BOX */}

          <div className="bg-black text-white rounded-xl p-6 shadow-lg">

            <h2 className="text-2xl font-bold mb-4">Polidish</h2>

            <p className="text-sm opacity-80 mb-4">

              Transparent. Public view. Members-only posting.<br />

              18+ • Freedom of speech • No censorship

            </p>

            <input

              className="w-full mb-3 p-2 rounded text-black"

              placeholder="your@email.com"

            />

            <button className="w-full py-2 mt-2 rounded bg-yellow-400 text-black font-semibold">

              Join

            </button>

          </div>



          {/* JUNGLE */}

          <div className="mt-6 bg-white p-4 rounded shadow h-96 border border-gray-300">

            <p className="text-sm italic opacity-70">Jungle loading…</p>

          </div>



        </div>

      </section>



      {/* FOOTER */}

      <footer className="w-full text-center text-xs text-black opacity-70 py-10 mt-10">

        Polidish LLC is not legally responsible for your poor judgement. If you endanger children, threaten terrorism, or break the law, you reveal yourself. Two-factor Authentication. It's a troll-free freedom fest.

      </footer>



    </main>

  );

}


