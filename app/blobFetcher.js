import RNFetchBlob from 'react-native-fetch-blob';

const fetchTypesArgs = {
  'upload': { progressEvent: 'uploadProgress', options: { interval: 50 } }, // 50 ms
  'download': { progressEvent: 'progress', options: { count: 10 } } // 10%
};

class BlobFetcher {
  constructor() {
    this.tasks = {};
  }

  wrap(filePath) {
    return RNFetchBlob.wrap(filePath);
  }

  async fetch({ fetchId, fetchType, method, url, headers, body, onProgress }) {
    const task = RNFetchBlob.fetch(method, url, headers, body);
    this.tasks[fetchId] = task;

    const fetchTypeArgs = fetchTypesArgs[fetchType];
    const response = await task[fetchTypeArgs.progressEvent](fetchTypeArgs.options, (progress, total) => onProgress(progress / total));

    // RNFetchBlob doesn't throw exception according to the response status code. this is a basic validation for 2xx.
    if (response.respInfo.status.toString()[0] !== '2') {
      throw response;
    } else {
      return response;
    }
  }

  cancel(fetchId) {
    const task = this.tasks[fetchId];
    if (task) {
      task.cancel();
    }
  }
}

export default new BlobFetcher();
