import image1 from "@/app/public/about-1.jpg";
import image2 from "@/app/public/about-2.jpg";
import Image from "next/image";
import { getCabins } from "../_lib/data-service";
import Link from "next/link";

export const metadata = {
  title: "About Page",
};

export const revalidate = 86400;

export default async function Page() {
  const cabins = await getCabins();

  return (
    // Responsif: 1 kolom di mobile (default), 5 kolom di desktop (lg:)
    // Gap (jarak) juga disesuaikan untuk mobile vs. desktop
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-16 lg:gap-x-24 lg:gap-y-32 text-lg items-center px-4 md:px-8 lg:px-0">
      
      {/* Bagian Teks 1 */}
      <div className="lg:col-span-3">
        {/* Font responsif: lebih kecil di mobile (default), lebih besar di desktop (lg:) */}
        <h1 className="text-3xl lg:text-4xl mb-6 lg:mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-6 lg:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      {/* Gambar 1 */}
      <div className="lg:col-span-2">
        <Image
          src={image1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
          quality={80} // Menurunkan kualitas sedikit untuk performa
          className="rounded-lg shadow-lg" // Menambah sedikit style
        />
      </div>

      {/* Gambar 2 */}
      {/* Tampilan mobile akan mengikuti urutan HTML (setelah Gambar 1, sebelum Teks 2) */}
      <div className="relative aspect-square lg:col-span-2">
        <Image
          src={image2}
          fill
          className="object-cover rounded-lg shadow-lg" // Menambah style
          alt="Family that manages The Wild Oasis"
          placeholder="blur" // Tambahkan placeholder blur di sini juga
          quality={80}
        />
      </div>

      {/* Bagian Teks 2 */}
      <div className="lg:col-span-3">
        <h1 className="text-3xl lg:text-4xl mb-6 lg:mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-6 lg:space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            {/* Mengganti <a> dengan <Link> untuk navigasi Next.js yang lebih baik */}
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-6 py-4 lg:px-8 lg:py-5 text-primary-800 text-base lg:text-lg font-semibold hover:bg-accent-600 transition-all rounded-md" // Menyesuaikan padding & font size
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}