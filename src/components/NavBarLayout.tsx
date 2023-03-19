import NavBar from "./NavBar";
import React from "react";
import SEO from "./SEO/Head";

export default function NavBarLayout({children, styleAdd}:{children:React.ReactNode, styleAdd?:string}){


    return (
        <>
        <SEO title={'OA'}/>
        <main className={`h-screen flex flex-col`}>
            <NavBar/>
            <div className={`max-h-screen flex-1 flex justify-center ${styleAdd}`}>
                {children}
            </div>
        </main>
        </>)
}