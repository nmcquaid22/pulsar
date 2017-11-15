const VisionRequestService = require('../../../../js/vision/VisionRequestService');
const $ = require('jquery');

require("babel-polyfill");

describe('VisionRequestService', () => {
    const base = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze';
    const key = 'foo';
    let visionRequestService;
    let ajaxResponseStub;
    let FormDataStub;

    beforeEach(() => {
        ajaxResponseStub = sinon.stub();
        visionRequestService = new VisionRequestService(base, key);

        // stub ajax with a successful stub
        sinon.stub($, 'ajax', () => $.Deferred().resolve(ajaxResponseStub()));
        // stub formData
        FormDataStub = () => ({ get: sinon.stub() });
        window.FormData = FormDataStub;
    });

    afterEach(() => {
        $.ajax.restore();
    });

    describe('buildRequesUrl', () => {
        it('should build a request URL with features and API key', () => {
            expect(visionRequestService.buildRequestUrl(['Tags', 'Description'])).to.equal(
                'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Tags,Description&subscription-key=foo'
            )
        });
    });

    describe('sendRequest', () => {
        it('should send an XHR request and invoke the done callback', (done) => {
            const data = new FormDataStub();

            data.get.returns('test_file');
            ajaxResponseStub.returns({ "json": "test" });

            visionRequestService.sendRequest(data, 'foo').then(parsedResponse => {
                expect(parsedResponse).to.deep.equal({ json: 'test' });
                done();
            });
        });
    });
});
