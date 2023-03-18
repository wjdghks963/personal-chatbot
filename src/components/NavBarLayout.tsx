import NavBar from "./NavBar";
import React from "react";
import Head from "next/head";
import SEO from "./SEO/Head";

export default function NavBarLayout({children}:{children:React.ReactNode}){


    return (
        <>
        <SEO title={'OA'}/>
        <main className={`h-[100vh] flex-col`}>

            <div className={`h-full relative`}>
                {children}
            </div>
            <NavBar/>

        </main>
        </>)
}