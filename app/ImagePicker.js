import NewImagePicker from 'react-native-image-crop-picker';
import { Alert } from 'react-native';

const errorCodes = {
  USER_CANCELLED: 'E_PICKER_CANCELLED',
  NO_PHOTO_LIBRARY_PERMISSIONS: 'E_PERMISSION_MISSING'
};

class ImageCropPicker {
  static openPicker({ mediaType }) {
    return new Promise((resolve, reject) => {
      NewImagePicker.openPicker({
        mediaType: mediaType || 'any',
        compressImageQuality: 0.8,
        compressImageMaxWidth: 2048,
        compressImageMaxHeight: 2048,
      })
        .then((images) => {
          if (Array.isArray(images)) {
            const medias = images.map((media) => ({ localUri: media.path, mediaType, filename: this._getFileName(media.path) }));
            resolve(medias);
          } else {
            resolve([{ localUri: images.path, mediaType, filename: this._getFileName(images.path) }]);
          }
        })
        .catch((err) => {
          switch (err.code) {
            case errorCodes.USER_CANCELLED:
              resolve();
              break;
            case errorCodes.NO_PHOTO_LIBRARY_PERMISSIONS:
              Alert.alert(I18n.t('image_picker.permission_error.header'), I18n.t('image_picker.permission_error.body'), [{ text: I18n.t('image_picker.permission_error.button') }]);
              resolve();
              break;
            default:
              reject(err);
          }
        });
    });
  }

  static openCamera({ mediaType }) {
    return new Promise((resolve, reject) => {
      NewImagePicker.openCamera({
        mediaType: mapMediaTypes[mediaType],
        width: 300,
        height: 400,
      })
        .then(({ path }) => {
          resolve({ localUri: path, mediaType, filename: this._getFileName(path) });
        })
        .catch((err) => {
          switch (err.code) {
            case errorCodes.USER_CANCELLED:
              resolve();
              break;
            case errorCodes.NO_PHOTO_LIBRARY_PERMISSIONS:
              Alert.alert(I18n.t('image_picker.permission_error.header'), I18n.t('image_picker.permission_error.body'), [{ text: I18n.t('image_picker.permission_error.button') }]);
              resolve();
              break;
            default:
              reject(err);
          }
        });
    });
  }

  static _getFileName(path) {
      return path.split('/').pop();
  }
}

export default ImageCropPicker;
