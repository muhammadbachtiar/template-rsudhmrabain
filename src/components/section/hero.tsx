'use client';
import Image from "next/image";
import Refetch from "../shared/refetch";
import useSetting from "@/hooks/settings/useSettings";

export default function Hero() {
  const { data, isLoading, isFetching, refetch, isError } = useSetting(`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[600px] flex justify-center items-center mb-[54px]">
      {isLoading ? (
        <div className="flex animate-pulse space-x-3 w-full h-full">
          <div className="h-full w-full flex-1 rounded-2xl bg-gray-200"></div>
        </div>
      ) : isError && !isFetching ? (
        <div className="w-full h-full flex items-center justify-center">
          <Refetch refetch={refetch} />
        </div>
      ) : (
        <>
          {data?.value?.videoUrl?.match(/\.(mp4|webm|ogg)$/i) && data?.value?.videoUrl ? (
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
            >
              <source src={data?.value?.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={data?.value?.videoUrl || '/images/unavailable-image.png'}
              alt="Hero Background"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1920px"
              priority
            />
          )}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
          <div className="relative z-10 px-4 sm:px-6 md:px-8 text-white text-center py-8 sm:py-12 lg:py-16 max-w-4xl mx-auto w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-center">
              {data?.value ? data?.value?.title ?? "" : "[Judul hero belum diatur]"}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-center">
              {data?.value ? data?.value?.description ?? "" : "[Deskripsi hero belum diatur]"}
            </p>
          </div>
        </>
      )}
    </section>
  );
}