import NavBar from "./NavBar";
import React from "react";
import SEO from "./SEO/Head";

export default function NavBarLayout({children}:{children:React.ReactNode}){


    return (
        <>
        <SEO title={'OA'}/>
        <main className={`h-screen flex-col`}>
            <NavBar/>
            <div className={`max-h-screen`}>
                {children}
            </div>
        </main>
        </>)
}