
import React from 'react';


export default function SingleRollupComponent({letter, index}) {

    const sanitizedHtml = modifyHtmlString(letter.htmlBody);
    let domain = letter.sender.split("@")[1].replace(">", "");
    if (domain.includes("gmail")) {
        domain = domain.replace("gmail", "google")
    }
    const favicon = "https://" + domain + "/favicon.ico";

    return (
        <iframe
        srcDoc={sanitizedHtml}
        title={`Newsletter ${index}`}
        className="w-full min-h-[80vh] no-scrollbar"
        sandbox="allow-popups"
    />
    )
}

function modifyHtmlString(htmlString) {
    const modifiedHtmlString = htmlString.replace(
        /<a([^>]*)>/g,
        '<a$1 target="_blank">'
    );

    return modifiedHtmlString;
}