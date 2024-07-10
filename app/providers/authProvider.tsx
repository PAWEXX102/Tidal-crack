import { auth } from "@/app/services/firebase";
import { createContext, useContext, useEffect, useState } from "react";
export const Context = createContext({});

type UserT = {
    user: any,
    isLogin: boolean
}

const LodingImage = () => {
    return <div className=" items-center text-center w-full justify-center h-svh flex">
        Loading
    </div>
}

const AuthProvider = ({ children }: any) => {
    const [loading, setLoading] = useState<boolean>(true)
    const initialState = {
        user: null,
        isLogin: false,
    }
    const [user, setUser] = useState<UserT>(initialState);

    useEffect(() => {
        const subscribe = auth.onAuthStateChanged((userState) => {
            setUser({ isLogin: userState ? true : false, user: userState });
            setLoading(false);
        });
        return subscribe;
    }, [])

    console.log("User State ", user.user)
    return (
        <Context.Provider value={{ user, setUser }}>
            {loading && <LodingImage />}
            {!loading && children}
        </Context.Provider>
    )
}

export default AuthProvider;
export const AuthContext = () => useContext(Context);