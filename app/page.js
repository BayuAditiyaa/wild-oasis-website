import Image from "next/image";
import bg from "@/app/public/bg.png"; // Pastikan path ini benar sesuai struktur folder Anda

export default function Home() {
  return (
    <main className="mt-10 md:mt-24"> {/* Margin top lebih kecil di mobile */}
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center px-5 md:px-0"> {/* Tambahkan padding horizontal di mobile agar teks tidak menempel ke tepi layar */}
        <h1 className="text-5xl md:text-8xl text-primary-50 mb-6 md:mb-10 tracking-tight font-normal leading-tight"> {/* Ukuran teks responsif: 5xl di mobile, 8xl di desktop. Margin bottom juga disesuaikan. Leading tight agar tidak terlalu renggang di mobile */}
          Welcome to paradise.
        </h1>
        <a
          href="/cabins"
          className="inline-block bg-accent-500 px-6 py-4 md:px-8 md:py-6 text-primary-800 text-base md:text-lg font-semibold hover:bg-accent-600 transition-all rounded-sm md:rounded-none" 
          // inline-block agar padding berfungsi dengan baik.
          // Ukuran padding dan teks tombol sedikit lebih kecil di mobile agar proporsional.
          // rounded-sm opsional untuk sedikit estetika di mobile.
        >
          Explore luxury cabins
        </a>
      </div>
    </main>
  );
}