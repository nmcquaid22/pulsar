const VisionTagService = require('../../../../js/vision/VisionTagService');

describe('VisionTagService', () => {
    let visionTagService;

    beforeEach(() => {
        visionTagService = new VisionTagService();
    });

    describe('buildTag', () => {
        it('should return a jQuery object representing a tag', () => {
            const $tag = visionTagService.buildTag({ name: 'test_tag', confidence: 666 });

            expect($tag.attr('title')).to.equal('666');
            expect($tag[0].childNodes[0].textContent.trim()).to.equal('test_tag');
        });
    });

    describe('appendTags', () => {
        let $root;

        beforeEach(() => {
            $root = $('<div><pre>Some existing content</pre></div>');
            visionTagService.init($root);
        });

        it('should append a set of tags to the tag root', () => {
            const tags = [
                { name: 'tag_one', confidence: 666 },
                { name: 'tag_two', confidence: 666 }
            ];

            visionTagService.appendTags(tags);

            expect($root.children()).to.have.length.of(2);
            $root.children().each((index, element) => {
                expect(element.childNodes[0].textContent.trim()).to.equal(tags[index].name);
            });
        });
    });
})
