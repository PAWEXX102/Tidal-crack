import { AuthContext } from "../providers/authProvider";
import { Button } from "@nextui-org/react";
import ModalLogin from "./modalLogin";
import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";

export default function Playlists() {
  const { user }: any = AuthContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userInfo = user.user;

  const handleAddPlaylist = () => {
    if (!userInfo) {
      onOpen();
    }
  };

  return (
    <main className=" mt-4">
      {userInfo ? <div>dwd</div> : ""}
      <Button
        className=" w-full flex items-center justify-start gap-x-5"
        onClick={() => handleAddPlaylist()}
        variant="light"
        startContent={
          <div className=" p-[6px] bg-zinc-600 rounded-full">
            <Image src={"/plus.svg"} alt="plus" width={13} height={20} />
          </div>
        }
      >
        Create
      </Button>
      <ModalLogin isOpen={isOpen} onOpenChange={onOpenChange} />
    </main>
  );
}
