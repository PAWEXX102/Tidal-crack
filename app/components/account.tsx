"use client";

import { AuthContext } from "../providers/authProvider";
import {
  Button,
  useDisclosure,
} from "@nextui-org/react";
import  ModalLogin  from "./modalLogin";

export default function Account() {
  const { user }: any = AuthContext();
  const userInfo = user.user;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <main>
      {!userInfo ? (
        <Button
          onClick={onOpen}
          className=" w-full"
        >
          Log in
        </Button>
      ) : (
        <div>{userInfo.email}</div>
      )}
      <ModalLogin isOpen={isOpen} onOpenChange={onOpenChange} />
    </main>
  );
}
