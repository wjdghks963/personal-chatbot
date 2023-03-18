import Head from "next/head";

export interface ISEO {
    title: string;
    description?: string;
    url?: string;
    image?: string;
    keywords?: string;
}

const SEO = ({ title, description, url, image, keywords }: ISEO) => {
    return (
        <Head>
            <title>{title || "OA"}</title>
            <meta name="description" content={description || "OA"} />
            <meta name="keywords" content={keywords || ""} />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="author" content="Jung" />
            <meta name="og:site_name" content="OA" />
            <meta property="og:title" content={title || "OA"} />
            <meta property="og:type" content="website" />
            <meta
                property="og:url"
                content={
                    url
                        ? "https://www.sabgilnote.xyz" + url
                        : "https://www.sabgilnote.xyz"
                }
            />
            <meta
                property="og:description"
                content={description || "OA"}
            />
            <meta property="og:article:author" content="jung" />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary" />
        </Head>
    );
};

export default SEO;