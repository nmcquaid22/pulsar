class VisionDescriptionService {
    /**
     * Initiate
     * @param $textarea {jQuery}
     */
    init ($textarea) {
        this.$textarea = $textarea;
    }

    /**
     * Update $textarea value to most confident caption
     * @param captions {Array<{ text: string, confidence: number }>}
     */
    insertDescription ({ captions }) {
        const mostConfidentCaption = captions
            .sort((a, b) => a.confidence - b.confidence)
            .pop();

        this.$textarea.val(mostConfidentCaption.text);
    }
}

module.exports = VisionDescriptionService;
