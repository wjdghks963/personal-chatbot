import NavBar from "./NavBar";
import React from "react";

export default function NavBarLayout({children}:{children:React.ReactNode}){


    return (
        <main className={`h-[100vh] flex-col`}>
            <div className={`h-full relative`}>
                {children}
            </div>
            <NavBar/>

        </main>)
}