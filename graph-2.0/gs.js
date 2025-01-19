class GraphLang extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const input = this.textContent;
        const output = this.parse(input);
        this.render(output);
    }

    parse(input) {
        const boldRegex = /\{b\}(.*?)\{\/b\}/g;
        const italicRegex = /\{i\}(.*?)\{\/i\}/g;
        const underlineRegex = /\{u\}(.*?)\{\/u\}/g;
        const strikethroughRegex = /\{s\}(.*?)\{\/s\}/g;
        const subscriptRegex = /\{sub\}(.*?)\{\/sub\}/g;
        const superscriptRegex = /\{sup\}(.*?)\{\/sup\}/g;
        const highlightRegex = /\{mark\}(.*?)\{\/mark\}/g;
        const highlightTextRegex = /\{highlight\}(.*?)\{\/highlight\}/g;
        const smallRegex = /\{small\}(.*?)\{\/small\}/g;
        const bigRegex = /\{big\}(.*?)\{\/big\}/g;
        const fontRegex = /\{font=([^\}]+)\}(.*?)\{\/font\}/g;
        const colorRegex = /\{color=([^\}]+)\}(.*?)\{\/color\}/g;
        const bgcolorRegex = /\{bgcolor=([^\}]+)\}(.*?)\{\/bgcolor\}/g;
        const borderRegex = /\{border=([^\}]+)\}(.*?)\{\/border\}/g;
        const shadowRegex = /\{shadow\}(.*?)\{\/shadow\}/g;
        const rotateRegex = /\{rotate=([^\}]+)\}(.*?)\{\/rotate\}/g;
        const opacityRegex = /\{opacity=([^\}]+)\}(.*?)\{\/opacity\}/g;
        const transformRegex = /\{transform=([^\}]+)\}(.*?)\{\/transform\}/g;
        const textAlignRegex = /\{text-align=([^\}]+)\}(.*?)\{\/text-align\}/g;
        const listRegex = /\{list\}(.*?)\{\/list\}/g;
        const orderedListRegex = /\{ol\}(.*?)\{\/ol\}/g;
        const quoteRegex = /\{quote\}(.*?)\{\/quote\}/g;
        const headingRegex = /\{(\d)\}(.*?)\{\/\1\}/g;
        const linkRegex = /\{link\}(.*?)\s*\|\s*(https?:\/\/[^\s]+)\{\/link\}/g;
        const codeRegex = /\{code\}(.*?)\{\/code\}/gs;
        const doNotCopyRegex = /\[do-not-copy\](.*?)\[\/do-not-copy\]/gs;
        const imgRegex = /\[img\]\((https?:\/\/[^\s]+)\)\s*\+(.+?)\[\/img\]/g;

        input = input.replace(headingRegex, (match, level, text) => {
            const headingLevel = Math.min(Math.max(parseInt(level), 1), 5);
            return `<h${headingLevel}>${text}</h${headingLevel}>`;
        });

        input = input.replace(linkRegex, (match, text, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`);
        input = input.replace(boldRegex, '<strong>$1</strong>');
        input = input.replace(italicRegex, '<em>$1</em>');
        input = input.replace(underlineRegex, '<u>$1</u>');
        input = input.replace(strikethroughRegex, '<s>$1</s>');
        input = input.replace(subscriptRegex, '<sub>$1</sub>');
        input = input.replace(superscriptRegex, '<sup>$1</sup>');
        input = input.replace(highlightRegex, '<mark>$1</mark>');
        input = input.replace(highlightTextRegex, '<span style="background-color: yellow;">$1</span>');
        input = input.replace(smallRegex, '<span style="font-size: smaller;">$1</span>');
        input = input.replace(bigRegex, '<span style="font-size: larger;">$1</span>');
        input = input.replace(fontRegex, (match, font, text) => `<span style="font-family: ${font};">${text}</span>`);
        input = input.replace(colorRegex, (match, color, text) => `<span style="color: ${color};">${text }</span>`);
        input = input.replace(bgcolorRegex, (match, color, text) => `<span style="background-color: ${color};">${text}</span>`);
        input = input.replace(borderRegex, (match, color, text) => `<span style="border: 1px solid ${color}; padding: 2px;">${text}</span>`);
        input = input.replace(shadowRegex, (match, text) => `<span style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">${text}</span>`);
        input = input.replace(rotateRegex, (match, angle, text) => `<span style="display: inline-block; transform: rotate(${angle}deg);">${text}</span>`);
        input = input.replace(opacityRegex, (match, value, text) => `<span style="opacity: ${value};">${text}</span>`);
        input = input.replace(transformRegex, (match, transform, text) => `<span style="transform: ${transform};">${text}</span>`);
        input = input.replace(textAlignRegex, (match, align, text) => `<div style="text-align: ${align};">${text}</div>`);
        input = input.replace(listRegex, (match, items) => {
            const listItems = items.split('\n').map(item => `<li>${item}</li>`).join('');
            return `<ul>${listItems}</ul>`;
        });
        input = input.replace(orderedListRegex, (match, items) => {
            const listItems = items.split('\n').map(item => `<li>${item}</li>`).join('');
            return `<ol>${listItems}</ol>`;
        });
        input = input.replace(quoteRegex, (match, text) => `<blockquote>${text}</blockquote>`);
        input = input.replace(codeRegex, (match, code) => `<pre><code>${code}</code></pre>`);
        input = input.replace(doNotCopyRegex, (match, text) => `<span style="user-select: none;">${text}</span>`);
        input = input.replace(imgRegex, (match, url, options) => `<img src="${url}" alt="${options}" />`);
        return input;
    }

    render(output) {
        this.shadowRoot.innerHTML = `<style>
        </style>
        <div>${output}</div>`;
    }
}

customElements.define('graph-lang', GraphLang);
