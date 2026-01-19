import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Size Guide | HZRD",
  description: "Find your perfect fit. HZRD size guide for all apparel and accessories.",
};

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen bg-white pt-28">
      {/* Hero Section */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                Fit Guide
              </span>
              <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                Size Guide
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 flex items-end">
              <p className="font-sans text-sm text-gray-500 max-w-sm">
                All measurements are in centimeters. When in doubt, size down for a more fitted look.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* T-Shirts & Hoodies */}
      <section className="py-16 md:py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
              01
            </span>
            <h2 className="font-heading text-3xl md:text-4xl uppercase tracking-tighter">
              T-Shirts & Hoodies
            </h2>
            <p className="font-sans text-sm text-gray-500 mt-2">
              Oversized relaxed fit. Measure across chest and from shoulder to hem.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Size</th>
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Chest (cm)</th>
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Length (cm)</th>
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Shoulder (cm)</th>
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Sleeve (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">S</td>
                  <td className="py-4 px-6 font-mono text-gray-600">116</td>
                  <td className="py-4 px-6 font-mono text-gray-600">72</td>
                  <td className="py-4 px-6 font-mono text-gray-600">52</td>
                  <td className="py-4 px-6 font-mono text-gray-600">22</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">M</td>
                  <td className="py-4 px-6 font-mono text-gray-600">122</td>
                  <td className="py-4 px-6 font-mono text-gray-600">74</td>
                  <td className="py-4 px-6 font-mono text-gray-600">54</td>
                  <td className="py-4 px-6 font-mono text-gray-600">23</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">L</td>
                  <td className="py-4 px-6 font-mono text-gray-600">128</td>
                  <td className="py-4 px-6 font-mono text-gray-600">76</td>
                  <td className="py-4 px-6 font-mono text-gray-600">56</td>
                  <td className="py-4 px-6 font-mono text-gray-600">24</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">XL</td>
                  <td className="py-4 px-6 font-mono text-gray-600">134</td>
                  <td className="py-4 px-6 font-mono text-gray-600">78</td>
                  <td className="py-4 px-6 font-mono text-gray-600">58</td>
                  <td className="py-4 px-6 font-mono text-gray-600">25</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">XXL</td>
                  <td className="py-4 px-6 font-mono text-gray-600">140</td>
                  <td className="py-4 px-6 font-mono text-gray-600">80</td>
                  <td className="py-4 px-6 font-mono text-gray-600">60</td>
                  <td className="py-4 px-6 font-mono text-gray-600">26</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pants */}
      <section className="py-16 md:py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
              02
            </span>
            <h2 className="font-heading text-3xl md:text-4xl uppercase tracking-tighter">
              Pants
            </h2>
            <p className="font-sans text-sm text-gray-500 mt-2">
              Relaxed fit with tapered leg. Measure at natural waist.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Size</th>
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Waist (cm)</th>
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Inseam (cm)</th>
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Thigh (cm)</th>
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Leg Opening (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">28</td>
                  <td className="py-4 px-6 font-mono text-gray-600">72</td>
                  <td className="py-4 px-6 font-mono text-gray-600">76</td>
                  <td className="py-4 px-6 font-mono text-gray-600">58</td>
                  <td className="py-4 px-6 font-mono text-gray-600">16</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">30</td>
                  <td className="py-4 px-6 font-mono text-gray-600">77</td>
                  <td className="py-4 px-6 font-mono text-gray-600">78</td>
                  <td className="py-4 px-6 font-mono text-gray-600">60</td>
                  <td className="py-4 px-6 font-mono text-gray-600">17</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">32</td>
                  <td className="py-4 px-6 font-mono text-gray-600">82</td>
                  <td className="py-4 px-6 font-mono text-gray-600">80</td>
                  <td className="py-4 px-6 font-mono text-gray-600">62</td>
                  <td className="py-4 px-6 font-mono text-gray-600">18</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">34</td>
                  <td className="py-4 px-6 font-mono text-gray-600">87</td>
                  <td className="py-4 px-6 font-mono text-gray-600">82</td>
                  <td className="py-4 px-6 font-mono text-gray-600">64</td>
                  <td className="py-4 px-6 font-mono text-gray-600">19</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">36</td>
                  <td className="py-4 px-6 font-mono text-gray-600">92</td>
                  <td className="py-4 px-6 font-mono text-gray-600">84</td>
                  <td className="py-4 px-6 font-mono text-gray-600">66</td>
                  <td className="py-4 px-6 font-mono text-gray-600">20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Rings */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
              03
            </span>
            <h2 className="font-heading text-3xl md:text-4xl uppercase tracking-tighter">
              Rings
            </h2>
            <p className="font-sans text-sm text-gray-500 mt-2">
              Measure the inside diameter of a ring that fits or measure your finger circumference.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] max-w-2xl">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Size (US)</th>
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Diameter (mm)</th>
                  <th className="py-4 px-6 text-left font-mono text-xs uppercase tracking-widest">Circumference (mm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">7</td>
                  <td className="py-4 px-6 font-mono text-gray-600">17.3</td>
                  <td className="py-4 px-6 font-mono text-gray-600">54.4</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">8</td>
                  <td className="py-4 px-6 font-mono text-gray-600">18.2</td>
                  <td className="py-4 px-6 font-mono text-gray-600">57.0</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">9</td>
                  <td className="py-4 px-6 font-mono text-gray-600">19.0</td>
                  <td className="py-4 px-6 font-mono text-gray-600">59.5</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">10</td>
                  <td className="py-4 px-6 font-mono text-gray-600">19.8</td>
                  <td className="py-4 px-6 font-mono text-gray-600">62.1</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans font-medium">11</td>
                  <td className="py-4 px-6 font-mono text-gray-600">20.6</td>
                  <td className="py-4 px-6 font-mono text-gray-600">64.6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
