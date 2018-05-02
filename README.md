# Video Recorder
This repository is for testing the development of [`Homeisapp/react-native-image-crop-picker`](https://github.com/Homeisapp/react-native-image-crop-picker).

## Requirements:
Extend react-native-image-crop-picker package to enable video recording as part of the package.
Add a video recording feature to the react-native-image-crop-picker package

The API and response whould be in the same structure as the library current supports, in addition to new properties for video recording.

## Suggested API
This is our suggestion for the API, any change to the following structure is welcome as long as it's discussed and approved by us in advance.
```javascript
import ImagePicker from 'Homeisapp/react-native-image-crop-picker';
```

Initiating the video recorder:
```javascript
ImagePicker.openCamera({
  mediaType: 'video',
  compressVideoPreset: 'MediumQuality',
  includeExif: true
})
```

### Request Object
| Property                                |                   Type                   |              Description                 |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- |
| includeExif                           |           bool (default false)           | Include image exif data in the response |
| compressVideoPreset (ios only)          |      string (default MediumQuality)      | Choose which preset will be used for video compression |
| mediaType                               |           string (default any)           | Accepted mediaType for image selection, can be one of: 'photo', 'video', or 'any' |

### Response Object
| Property                  |  Type  | Description                              |
| ------------------------- | :----: | :--------------------------------------- |
| path                      | string | Selected image location. This is null when the `writeTempFile` option is set to false. |
| localIdentifier(ios only) | string | Selected images' localidentifier, used for PHAsset searching |
| sourceURL(ios only)       | string | Selected images' source path, do not have write access |
| filename(ios only)        | string | Selected images' filename                |
| width                     | number | Selected image width                     |
| height                    | number | Selected image height                    |
| mime                      | string | Selected image MIME type (image/jpeg, image/png) |
| size                      | number | Selected image size in bytes             |
| exif                      | object | Extracted exif data from image. Response format is platform specific |
| creationDate (ios only)   | string | UNIX timestamp when image was created    |
| modificationDate          | string | UNIX timestamp when image was last modified |
