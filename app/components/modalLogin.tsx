import { Modal, ModalContent, ModalHeader, ModalBody, Input, Checkbox, Link, Divider } from "@nextui-org/react";
import Image from "next/image";
import { MailIcon } from "@/public/MailIcon";
import { LockIcon } from "@/public/LockIcon";

interface ModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

export default function ModalLogin({isOpen, onOpenChange}: ModalProps) {
    return(
        <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        size="md"
        backdrop="blur"
        shouldBlockScroll={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
                <div className=" flex gap-x-[3rem]">
                  <button
                    onClick={onClose}
                    className=" px-4 py-2 w-full border-2 border-neutral-600 hover:bg-neutral-600 rounded-lg text-white hover:scale-105 transition-all active:scale-95"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={onClose}
                    className=" border-neutral-600 border-2 hover:bg-neutral-600 px-4 py-2 w-full rounded-lg text-white hover:scale-105 transition-all active:scale-95"
                  >
                    Login
                  </button>
                </div>
                <div className=" flex items-center w-full justify-center gap-x-3">
                  <Divider className=" my-4 w-44" />
                  <h1>OR</h1>
                  <Divider className=" my-4 w-44" />
                </div>
                <div className="flex justify-center gap-x-10 mb-4">
                  <Image src={'/google.svg'} alt="Google" width={50} height={50} className="bg-white p-2 rounded-xl hover:scale-105 transition-all active:scale-95 cursor-pointer" />
                  <Image src={'/apple.svg'} alt="Apple" width={50} height={50} className=" bg-white p-2 rounded-xl hover:scale-105 transition-all active:scale-95 cursor-pointer" />
                  <Image src={'/facebook.svg'} alt="Facebook" width={50} height={50} className=" bg-white p-2 rounded-xl hover:scale-105 transition-all active:scale-95 cursor-pointer" />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}