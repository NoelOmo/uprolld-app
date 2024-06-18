
import React from 'react';
import DOMPurify from 'dompurify';
import renderHTML from 'react-render-html';


export default function SingleRollupComponent({letter, index}) {

    const sanitizedHtml = modifyHtmlString(letter.htmlBody);
    let cleanHtml = DOMPurify.sanitize(sanitizedHtml, {USE_PROFILES: {html: true}});

    return (
        <>{renderHTML(cleanHtml)}</>
    )
}

function modifyHtmlString(htmlString) {
    const modifiedHtmlString = htmlString.replace(
        /<a([^>]*)>/g,
        '<a$1 target="_blank">'
    );

    return modifiedHtmlString;
}