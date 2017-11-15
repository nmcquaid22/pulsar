import $ from 'jquery';

class VisionRequestService {
    /**
     * @param baseUrl {string}
     * @param subscriptionKey {string}
     */
    constructor (
        baseUrl,
        subscriptionKey
    ) {
        this.baseUrl = baseUrl;
        this.subscriptionKey = subscriptionKey;
    }

    /**
     * Build API request URL
     * @param features {string[]}
     */
    buildRequestUrl (
        features = ['Tags']
    ) {
        return `${this.baseUrl}?visualFeatures=${features.join(',')}&subscription-key=${this.subscriptionKey}`;
    }

    /**
     * Send a XHR request
     * @param formData {FormData}
     * @param url {string}
     * @returns {Promise<Object>}
     */
    sendRequest (formData, url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: 'POST',
                contentType: 'application/octet-stream',
                data: formData.get('image'),
                processData: false
            }).done(response => {
                resolve(response);
            }).fail(error => {
                reject(error.message);
            });
        });
    }
}

module.exports = VisionRequestService;
