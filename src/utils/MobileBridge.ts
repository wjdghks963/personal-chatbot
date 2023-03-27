
export const isWebView = () =>{
    const isWebView = /wv/.test(navigator.userAgent.toLowerCase());
    if (isWebView) {
        return true
    } else {
        return false
    }
}

export const getWebViewMessage = () =>{
    const data = 0;

    return data;
}

export const sendWebViewMessage = () =>{
    return "message"
}
