export default function Footer() {
  return (
    <footer className="bg-gray-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">TryggResa</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              En trygg och enkel tjänst för bokning av färdtjänst och sjukresor.
              Anpassad för alla – oavsett digital vana.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Snabblänkar
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">Boka resa</a></li>
              <li><a href="#" className="hover:text-gray-900">Så fungerar det</a></li>
              <li><a href="#" className="hover:text-gray-900">Om TryggResa</a></li>
              <li><a href="#" className="hover:text-gray-900">Kontakt</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Kontakt
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              E-post: support@tryggresa.se<br />
              Telefon: 010-123 45 67<br />
              Vardagar 08:00 – 17:00
            </p>
          </div>

        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TryggResa. Alla rättigheter förbehållna.
        </div>

      </div>
    </footer>
  );
}
