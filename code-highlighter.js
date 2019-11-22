const highlightCode = function (text, nodeFactory, lang) {
    // main
    const html = Prism.highlight(text, Prism.languages[lang], lang);
    const preparedHtml = replacesBreaks(replaceSpacesAndTabs(html));

    const source = nodeFactory.createElement('div');
    const output = nodeFactory.createElement('div');

    source.innerHTML = preparedHtml;
    colorize(source, output);

    return output.innerHTML;

    // functions
    // utils
    function replaceSpacesAndTabs(html){
        return html.replace(/(\t)/g, '    ');
    }
    function replacesBreaks(html) {
        let result = html.replace(/\n/gm, '</p><p>');
        if (result.startsWith('</p>')){
            result = result.substring(4);
        } else {
            result = '<p>' + result;
        }
        if (result.endsWith('<p>')){
            result = result.substring(0, result.length - 3);
        } else {
            result += '</p>';
        }
        return result;
    }

    // highlight
    function colorize(parentElement, outputElement){
        const children =  parentElement.childNodes;
        for (let i = 0; i < children.length; i++){
            const child = children[i];
            let token = createToken(child);

            if (token !== false) {
                if (child.tagName === 'P' && !child.hasChildNodes()) { //ToDo hack for empty <p></p>
                    outputElement.appendChild(nodeFactory.createElement('br'));
                } else {
                    outputElement.appendChild(token);
                }
                applyClassNames(token, child.className);
            }

            if (child.hasChildNodes()){
                const node = token !== false ? token : outputElement;
                if (!node || !node.nodeType || node.nodeType === 3){
                    console.warn(node, token, child);
                }
                colorize(child, node);
            }
        }
    }

    function isToken(element){
        return element.className && element.className.startsWith('token ');
    }

    function createToken(element) {
        if (!isToken(element)) {
            return element.cloneNode();
        }
        let classNames = element.className.split(' ');
        if (classNames.length < 2){
            return element.cloneNode();
        }
        switch (classNames[1]) {
            case 'source': // javastacktrace
                return nodeFactory.createElement('i');
            case 'keyword':
            case 'class-name':
            case 'annotation':
            case 'constant': // ts
            case 'builtin': // ts
            case 'header-name': // http
            case 'exceptions': //javastacktrace
                return nodeFactory.createElement('b');
            case 'function':
            case 'namespace':
            case 'comment':
            case 'generics':
            case 'parameter': // js
            case 'template-string': //js
            case 'function-variable': // ts
            case 'property': // jsonp
                return nodeFactory.createElement('span');
            case 'interpolation': //js
            case 'interpolation-punctuation': //js
            case 'template-punctuation': //js
            case 'number':
            case 'boolean':
            case 'string':
            case 'message': //javastacktrace
                return nodeFactory.createElement('span');
            case 'punctuation':
            case 'operator':
            case 'file': // javastacktrace
            case 'line-number': // javastacktrace
            case 'summary':  // javastacktrace
            case 'stack-frame': // javastacktrace
            case 'application-json': // http
                return false;
            default:
                console.warn(`Non operable class name: '${element.className}'`);
                return element.cloneNode();
        }
    }

    function applyClassNames(element, className) {
        if (!className) {
            return;
        }
        let classNames = className.split(' ');
        for (let i = 0; i < classNames.length; i++){
            applyStyles(element, classNames[i]);
        }

    }

    function applyStyles(element, className) {
        if (element.nodeType === 3){
            return;
        }
        switch (className) {
            case 'namespace':
                element.style.color = '#004A43';
                break;

            case 'keyword':
            case 'function':
            case 'header-name': // http
            case 'property': // jsonp
                element.style.color = '#000080';
                break;

            case 'parameter': // js
            case 'class-name':
            case 'constant': // ts
            case 'builtin': // ts
            case 'function-variable':// ts
                element.style.color = '#660E7A';
                break;
            case 'annotation':
                element.style.color = '#808000';
                break;

            case 'template-string': // js
            case 'generics':
            case 'source': //javastacktrace
                element.style.color = '#20999D';
                break;
            case 'comment':
                element.style.color = '#808080';
                break;

            case 'interpolation': // js
            case 'interpolation-punctuation': // js

            case 'punctuation':
                element.style.color = colorForText(element.textContent);
                break;
            case 'operator':
                break;

            case 'number':
                element.style.color = '#0000FF';
                break;
            case 'boolean':
                element.style.color = '#000080';
                break;

            case 'template-punctuation': // js

            case 'string':
                element.style.color = '#008000';
                break;
        }
    }

    function colorForText(text){
        switch (text) {
            case ';':
            case '}':
            case '{':
                return '#800080';
            default:
                return '#808030';

        }
    }
};

//exports.highlightCode = highlightCode;