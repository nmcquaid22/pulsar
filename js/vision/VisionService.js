class VisionService {
    /**
     * @param visionRequestService {VisionRequestService}
     * @param visionSubmissionService {VisionSubmissionService}
     * @param visionTagService {VisionTagService}
     * @param visionDescriptionService {VisionDescriptionService}
     */
    constructor (
        visionRequestService,
        visionSubmissionService,
        visionTagService,
        visionDescriptionService
    ) {
        this.visionRequestService = visionRequestService
        this.visionSubmissionService = visionSubmissionService;
        this.visionTagService = visionTagService;
        this.visionDescriptionService = visionDescriptionService;
    }
}

module.exports = VisionService;
