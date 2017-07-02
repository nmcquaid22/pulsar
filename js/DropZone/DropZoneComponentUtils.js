class DropZoneComponentUtils {
    constructor (mimeTyper) {
        this.mimeTyper = mimeTyper;
    }

    /**
     * Build an options object from a node's attributes
     * @param {Element} node
     */
    getOptionsFromAttrs (node) {
        return [].slice.call(node.attributes).reduce((attrs, attr) => {
            const { name } = attr;
            let { value } = attr;
            // grab value from attributes matching data-dropzone-{option}={value}
            if (name.match(/dropzone/)) {
                // transform hyphen separated attr to DropZone camelCase option
                const option = name.replace(/data-dropzone-/, '');

                // split the space separated whitelist into an array
                if (option === 'whitelist') {
                    value = value.split(' ');
                }

                // parse bools
                if (value === 'false') {
                    value = false;
                } else if (value === 'true') {
                    value = true;
                }

                attrs[this.camelCaseIfy(option)] = value;
            }

            return attrs;
        }, {});
    }

    /**
     * Transform a hyphen separated string to camel case
     * @param  {String} string
     * @return {String}
     */
    camelCaseIfy (string) {
        return string.split('-').map((word, index) => {
            return index ? word[0].toUpperCase() + word.slice(1) : word;
        }).join('');
    }

    /**
     * Create DropZone file Html string
     * @param {Object} file
     * @param {Object} options
     * @return {String}
     */
    createFileNode (file, options) {
        const desc = file.description ? `<p class="${options.nodeClasses.description}">${file.description}</p>` : '',
            name = file.name ? `<p class="${options.nodeClasses.name}">${file.name}</p>` : '',
            size = file.size ? `<p class="${options.nodeClasses.size}">${file.size}</p>` : '',
            type = file.type ? `<p class="${options.nodeClasses.type}">${file.type}</p>` : '';

        let thumb = `<div class="${options.nodeClasses.thumbnail}`;

        if (file.thumbnail) {
            // add a thumbnail if DropZone has returned one
            thumb += ` ${options.nodeClasses.thumbnail}--image" style="background-image: url(${file.thumbnail});"`;
        } else {
            // add icon class if we cannot get a file preview
            thumb += `"><i class="dropzone__file-icon icon icon-${this.mimeTyper.getIconClass(file.type)}"></i`;
        }

        thumb += '></div>';

        return `
            <div data-dropzone-file="${file.id}" class="${options.nodeClasses.file}">
                <div class="${options.nodeClasses.inner}">
                    <i class="${options.nodeClasses.close} icon icon-times-circle"></i>
                    ${thumb}
                    <div class="${options.nodeClasses.meta}">
                        ${options.fileNodeName ? name : ''}
                        ${options.fileNodeDesc ? desc : ''}
                        ${options.fileNodeSize ? size : ''}
                        ${options.fileNodeType ? type : ''}
                    </div>                
                </div>
            </div>`.replace(/>\s+</g, '><');
    }
}

module.exports = DropZoneComponentUtils;
