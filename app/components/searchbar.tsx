import Image from "next/image";

export default function SearchBar() {
  return (
    <main className=" absolute top-0 right-0 left-0 mx-auto bg-zinc-900 mt-5 rounded-full border-2 flex  max-w-[35rem] items-center w-full max-h-[3.5rem] h-full z-50 border-zinc-700">
      <div className=" w-full flex items-center">
        <Image
          src="/search.svg"
          alt="Search"
          width={25}
          height={25}
          className=" ml-4"
        />
        <input
          type="text"
          placeholder="Search for songs, albums, artists"
          className=" w-full outline-none font-medium h-full bg-transparent placeholder:text-zinc-400 px-3"
        />
      </div>
      <div className=" h-[80%] w-[3px] bg-zinc-700 rounded-full"></div>
      <div className=" mx-5 w-max h-max relative">
        <Image
          src="/bell.svg"
          alt="Notification"
          width={27}
          height={27}
          className=" cursor-pointer"
        />
      </div>
    </main>
  );
}
