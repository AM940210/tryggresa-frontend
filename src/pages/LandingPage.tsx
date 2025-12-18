import SearchForm from "../components/search/SearchForm";

export default function LandingPage() {
    return (
        <section className="w-full">
            {/* Hero Text Section */}
            <div className="max-w-4xl mx-auto px-6 pt-6 text-center">
                <h1 className="text-2xl md:text-5xl font-bold text-gray-900">
                    Enkel och trygg bokning av Färdtjänst och Sjukresor.
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mt-4">
                    För äldre personer och personer med funktionsnedsättning - boka din färdtjänst och sjukresor online.
                </p>

                
            </div>

            {/* Hero Image Section */}
            <div className="w-full">
                <img 
                    src="/hero.jpg"
                    alt="Trygg resa"
                    className="w-full mt-4 object-contain"
                />
            </div>

            {/* SearchForm */}
            <SearchForm />
        </section>
    );
}