import DropZoneValidatorDispatcher from '../../../js/DropZone/DropZoneValidatorDispatcher';
import DropZoneValidationUtils from '../../../js/DropZone/DropZoneValidationUtils';
import DropZoneErrors from '../../../js/DropZone/DropZoneErrors';

describe('DropZoneValidatorDispatcher', () => {
    let dropZoneValidatorDispatcher;
    let validResponse = { valid: true, text: '' };
    let dropZoneErrorStub;
    let dropZoneUtilStub;

    beforeEach(() => {
        const whitelist = ['image/png'];
        const maxFiles = 1;
        const maxSize = 1;

        dropZoneErrorStub = sinon.createStubInstance(DropZoneErrors);
        dropZoneErrorStub.getFileValidationError.returns('error');

        dropZoneUtilStub = sinon.createStubInstance(DropZoneValidationUtils);

        dropZoneValidatorDispatcher = new DropZoneValidatorDispatcher(
            dropZoneUtilStub,
            dropZoneErrorStub,
            whitelist,
            maxFiles,
            maxSize
        );
    });

    describe('validate()', () => {
        it('should return a valid object if we cannot determine the length of the files', () => {
            expect(dropZoneValidatorDispatcher.validate([], 1, 0)).to.deep.equal(validResponse);
        });

        describe('unknown', () => {
            it('should return an invalid object if the file type is an empty string', () => {
                expect(dropZoneValidatorDispatcher.validate([{ type: '' }], 1, 0)).to.equal('error');
                expect(dropZoneErrorStub.getFileValidationError.calledWith('UNKNOWN')).to.be.true;
            });

        });

        describe('whitelist', () => {
            it('should return an invalid object if the file is not on the whitelist', () => {
                expect(dropZoneValidatorDispatcher.validate([{ type: 'foo' }], 1, 0)).to.equal('error');
                expect(dropZoneErrorStub.getFileValidationError.calledWith('WHITELIST')).to.be.true;
            });

            it('should return a valid object if the file is on the whitelist', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneUtilStub.validateCount.returns(true);
                dropZoneUtilStub.validateSize.returns(true);
                expect(dropZoneValidatorDispatcher.validate([{ type: 'image/png' }], 1, 1)).to.deep.equal(validResponse);
            });
        });

        describe('max files', () => {
            it('should return an invalid object if we have reached the max files limit', () => {
                dropZoneUtilStub.validateType.returns(true);
                expect(dropZoneValidatorDispatcher.validate([{ type: 'image/png' }], 0, 0)).to.equal('error');
                expect(dropZoneErrorStub.getFileValidationError.calledWith('MAX_FILES')).to.be.true;
            });

            it('should return a valid object if we have not reached the max files limit', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneUtilStub.validateCount.returns(true);
                dropZoneUtilStub.validateSize.returns(true);
                expect(dropZoneValidatorDispatcher.validate([{ type: 'image/png' }], 0, 0)).to.deep.equal(validResponse);
            });
        });

        describe('max size', () => {
            it('should return an invalid object if we have reached the max size limit', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneUtilStub.validateCount.returns(true);
                expect(dropZoneValidatorDispatcher.validate([{ type: 'image/png', size: 10 }], 0, 0)).to.equal('error');
                expect(dropZoneErrorStub.getFileValidationError.calledWith('MAX_SIZE')).to.be.true;
            });

            it('should return an invalid object if we have reached the max size limit', () => {
                dropZoneUtilStub.validateType.returns(true);
                dropZoneUtilStub.validateCount.returns(true);
                dropZoneUtilStub.validateSize.returns(true);
                expect(dropZoneValidatorDispatcher.validate([{ type: 'image/png', size: 10 }], 0, 0)).to.deep.equal(validResponse);
            });
        });
    });
});