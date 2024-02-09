const cleanSvgString = (svgString) => {
    if (svgString.startsWith('<?xml')) {
        const endOfXml = svgString.indexOf('?>');

        if (endOfXml !== -1) {
            svgString = svgString.substring(endOfXml + 2);
        }
    }

    svgString = svgString.trim();

    return svgString;
};

export default cleanSvgString;
