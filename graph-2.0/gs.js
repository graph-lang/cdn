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
        const textStyleRegex = /\{text\((.*?)\)\}(.*?)\{\/text\}/g;
        const shadowRegex = /\{shadow\}(.*?)\{\/shadow\}/g;
        const linkRegex = /\{link\((.*?)\)\}(.*?)\((.*?)\)\{\/link\}/g; 
        const headerRegex = /\{(\d)\}(.*?)\{\/\1\}/g; 

        // Обработка тени
        input = input.replace(shadowRegex, (match, text) => {
            return `<span style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);">${text}</span>`;
        });

        
        input = input.replace(headerRegex, (match, level, text) => {
            const headingLevel = Math.min(Math.max(parseInt(level), 1), 5); 
            return `<h${headingLevel}>${text}</h${headingLevel}>`;
        });

       
        input = input.replace(textStyleRegex, (match, styles, text) => {
            const styleArray = styles.split(',').map(style => style.trim());
            let styleString = '';

            styleArray.forEach(style => {
                if (style.startsWith('color:')) {
                    const color = style.split(':')[1].trim();
                    styleString += `color: ${color}; `;
                } else if (style.startsWith('font:')) {
                    const font = style.split(':')[1].trim();
                    styleString += `font-family: ${font}; `;
                } else if (style === 'b') {
                    styleString += 'font-weight: bold; ';
                } else if (style === 'i') {
                    styleString += 'font-style: italic; ';
                } else if (style === 'u') {
                    styleString += 'text-decoration: underline; ';
                } else if (style === 's') {
                    styleString += 'text-decoration: line-through; '; 
                } else if (style === 'big') {
                    styleString += 'font-size: larger; '; 
                } else if (style === 'small') {
                    styleString += 'font-size: smaller; '; 
                } else if (['1', '2', '3', '4', '5'].includes(style)) {
                    
                    
                }
            });

            return `<span style="${styleString}">${text}</span>`;
        });

        // Обработка ссылок с параметрами
        input = input.replace(linkRegex, (match, params, linkText, url) => {
            const paramArray = params.split(',').map(param => param.trim());
            let styleString = '';

            paramArray.forEach(param => {
                if (param.startsWith('color:')) {
                    const color = param.split(':')[1].trim();
                    styleString += `color: ${color}; `;
                }
                
            });

            return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="${styleString}">${linkText}</a>`;
        });

        return input;
    }

    render(output) {
        this.shadowRoot.innerHTML = `<style>
            a {
                color: blue;
                text-decoration: underline;
            }
            a:hover {
                text-decoration: none;
            }
            h1, h2, h3, h4, h5 {
                margin: 0; 
            }
        </style>
        <div>${output}</div>`;
    }
}

customElements.define('graph-lang', GraphLang);
