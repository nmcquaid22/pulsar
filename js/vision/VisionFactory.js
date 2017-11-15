const VisionRequestService = require('./VisionRequestService');
const VisionSubmissionService = require('./VisionSubmissionService');
const VisionService = require('./VisionService');
const VisionTagService = require('./VisionTagService');
const VisionDescriptionService = require('./VisionDescriptionService');

/**
 * Create an instance of the VisionService
 * @param apiBaseUrl
 * @param subscriptionKey
 */
function createVisionService (
    apiBaseUrl,
    subscriptionKey
) {
    const visionRequestService = new VisionRequestService(apiBaseUrl, subscriptionKey);
    const visionSubmissionService = new VisionSubmissionService();
    const visionService = new VisionTagService();
    const visionDescriptionService = new VisionDescriptionService();

    return new VisionService(
        visionRequestService,
        visionSubmissionService,
        visionService,
        visionDescriptionService
    );
}

module.exports = createVisionService;
