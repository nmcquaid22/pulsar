const $ = require('jquery');

class VisionTagService {
    constructor () {

    }

    /**
     * Initiate
     * @param $tagRoot {jQuery}
     */
    init (
        $tagRoot
    ) {
        this.$root = $tagRoot;
    }

    /**
     * Create a jQuery object representing a tag
     * @param tag {{ name: string, confidence: number }}
     * @returns {jQuery}
     */
    buildTag (tag) {
        const $tag = $(`
            <span style="margin-right: .5rem; margin-bottom: .5rem;" class="label label--large" data-toggle="tooltips" title="${tag.confidence}">
                ${tag.name}
                <a data-action="remove" data-action-target="this" class="btn remove-button">
                    <i class="icon-remove-sign"><span class="hide">Remove</span></i>
                </a>
            </span>
        
        `);

        $tag.on('click', '[data-action="remove"]', function () {
            $(this).closest('.label').remove();
        });

        return $tag;
    }

    buildAddTagPlaceholder () {
        const component = this;
        const $placeholder = $(`
            <span style="margin-right: .5rem; margin-bottom: .5rem;" class="label label--large" data-toggle="tooltips">
                <input type="text" placeholder="Add tag" style="width: 4rem"/>
                <a data-action="remove" data-action-target="this" class="btn remove-button">
                    <i class="icon-remove-sign"><span class="hide">Remove</span></i>
                </a>
            </span>
        `);

        $placeholder.find('input').on('blur keydown', function (event) {
            const $this = $(this);
            const val = $this.val();

            if (event.type === 'keydown' && event.keyCode !== 13) {
                return;
            }

            if (val) {
                $this.parent().data('input-cache', $this);
                $this.parent().prepend(val);
                $this.remove();
                component.appendPlaceholder();
            }
        });

        $placeholder.on('click', '[data-action="remove"]', function () {
            $(this).closest('.label').remove();
        });

        return $placeholder;
    }

    /**
     * Append tags to tag root
     * @param tags {Array<{ name: string, confidence: number }>}
     */
    appendTags (tags) {
        this.$root.empty().append(tags.map(this.buildTag));
        this.appendPlaceholder();
    }

    appendPlaceholder () {
        this.$root.append(this.buildAddTagPlaceholder());
    }
}

module.exports = VisionTagService;

