import apiClient from './apiClient';
import blobFetcher from './blobFetcher';

export const upload = async ({ entityType, filename, filePath, onProgress }) => {
  const uploadId = Date.now();

  const res = await apiClient.post('/uploads/gettoken', { entityType, filename });

  const { params, uploadEndpoint } = res.data.data;
  const formData = Object.keys(params).map((key) => ({ name: key, data: params[key] }));
  formData.push({ name: 'file', filename, data: blobFetcher.wrap(filePath) });

  await blobFetcher.fetch({
    fetchId: uploadId,
    fetchType: 'upload',
    method: 'POST',
    url: uploadEndpoint,
    body: formData,
    onProgress
  });

  const url = `${uploadEndpoint}/${params.key}`;

  return url;
}
