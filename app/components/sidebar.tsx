
import Account from "./account";
import MainLinks from "./mainLinks";
import UserLinks from "./userLinks";
import Playlists from "./playlistsBar";


export default function Sidebar() {

  return <main className=" bg-zinc-800 p-4 h-screen w-[15rem] flex flex-col gap-y-10">
    <Account />
    <MainLinks />
    <UserLinks />
    <Playlists />
  </main>;
}
