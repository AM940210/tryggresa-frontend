import SearchForm from "../components/search/SearchForm";

export default function LandingPage() {
  return (
    <section className="w-full">

      {/* GLOBAL CONTAINER */}
      <div className="max-w-5xl mx-auto px-4">

        {/* Hero Text Section */}
        <div className="pt-6 text-center">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900">
            Enkel och trygg bokning av Färdtjänst och Sjukresor.
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mt-4">
            För äldre personer och personer med funktionsnedsättning – boka din färdtjänst och sjukresor online.
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="mt-6">
          <img
            src="/hero.jpg"
            alt="Trygg resa"
            className="w-full object-contain"
          />
        </div>

        {/* SearchForm */}
        <div className="mt-12 mb-12">
          <SearchForm />
        </div>

        {/* Info text section */}
        <div className="mt-6 mb-8 bg-gray-50 py-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto px-6 items-stretch">

                <div className="space-y-4 h-full flex flex-col justify-center">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        Sjukresor och färdtjänst finns till för att ge dig en trygg, säker och anpassad transport när du behöver det som mest. För många kan en resa till vården, rehabilitering eller vardagens ärenden kännas både stressande och osäker. Därför är det viktigt att resan i sig inte blir ett hinder.
                    </p>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        Med TryggResa vill vi göra varje resa så enkel och smidig som möjligt. Genom tydlig information, enkel bokning och omtanke i varje steg skapar vi en tjänst som är lätt att använda och trygg att lita på. Våra pålitliga förare och anpassade fordon ser till att du kommer fram i lugn och ro – oavsett om det gäller ett viktigt vårdbesök eller ett ärende i vardagen.
                    </p>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        Vårt mål är att du ska känna dig trygg redan från bokningen, under hela resan och tills du är framme.
                    </p> 
                </div>              



                {/* Image */}
                <img
                    src="/bil2.jpg"
                    alt="Trygg resa"
                    className="w-full object-contain"
                />

            </div>
        </div>


      </div>

    </section>
  );
}
