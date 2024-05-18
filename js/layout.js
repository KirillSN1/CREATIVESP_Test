/** 
 * Injects all pages to contents of "/some-page.html"(in exaple) file.
 * 
 * Repaces elements as followed:
 * @example
 * <link contents="/some-page.html"/>
 * 
*/
export function inject(){
    const contentLinks = document.querySelectorAll('link[contents]');
    for(const link of contentLinks.values()){
        injectOne(link);
    }
}
/** @param {Element} link  */
export function injectOne(link){
    const url = link.getAttribute('contents');
    fetch(url)
        .then((response)=>response.text())
        .then((data)=>{
            const parser = new DOMParser();
            const html = parser.parseFromString(data, "text/html");
            const children = [...html.body.childNodes];
            for(const node of children){
                if(node instanceof HTMLScriptElement){
                    insertScript(node.textContent);
                    continue;
                }
                if(node instanceof HTMLStyleElement){
                    insertStyle(node.textContent);
                    continue;
                }
                link.parentNode.insertBefore(node,link);
            }
            link.remove();
        })
}
export function insertScript(scriptText){
    var script = document.createElement('script');
    script.textContent = scriptText;
    document.body.appendChild(script);
}
export function insertStyle(styleText){
    var script = document.createElement('style');
    script.textContent = styleText;
    document.head.appendChild(script);
}