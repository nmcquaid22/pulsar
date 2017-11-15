const VisionDescriptionService = require('../../../../js/vision/VisionDescriptionService');

describe('VisionDescriptionService', () => {
    let visionDescriptionService;

    beforeEach(() => {
        visionDescriptionService = new VisionDescriptionService();
    });

    describe('insertDescription', () => {
        let $textarea;

        beforeEach(() => {
            $textarea = $('<textarea></textarea>');
            visionDescriptionService.init($textarea);
        });

        it('should update the textarea with the most confident caption', () => {
            const description = {
                captions: [
                    {text: 'test_caption_one', confidence: 0.23456789},
                    {text: 'test_caption_two', confidence: 0.12345678}
                ]
            }

            visionDescriptionService.insertDescription(description);

            expect($textarea.val()).to.equal('test_caption_one');
        });
    });
});
