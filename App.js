import Video from 'react-native-video';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import ImageCropPicker from './app/ImagePicker';
import { upload } from './app/ImageUploader';

export default class App extends React.Component {
  state = {
    medias: [],
    url: null,
    progress: null
  }

  render() {
    const { medias, progress, url } = this.state;
    const { width: screenWidth } = Dimensions.get('window');
    const itemWidth = screenWidth / 2;
    const itemHeight = itemWidth * 4 / 3;
    const itemStyle = { width: itemWidth, height: itemHeight };

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => this.handleOpenPicker({ mediaType: 'photo' })}>
          <Text style={styles.buttonText}>Add Image from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.handleOpenCamera({ mediaType: 'photo' })}>
          <Text style={styles.buttonText}>Add Image from Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.handleOpenPicker({ mediaType: 'video' })}>
          <Text style={styles.buttonText}>Add Video from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.handleOpenCamera({ mediaType: 'video' })}>
          <Text style={styles.buttonText}>Add Video from Camera</Text>
        </TouchableOpacity>

        <View style={styles.mediasWrapper}>
          {medias.map((media, index) => {
            switch (media.mediaType) {
              case 'photo':
                return (
                  <View style={styles.imagesRow}>
                    <View>
                      <Text>Local</Text>
                      <Image source={{ uri: media.localUri }} style={itemStyle} />
                    </View>
                    <View>
                      <Text>
                        {url
                          ? <Text>From URL</Text>
                          : <Text>{Math.round(progress * 100)}%</Text>
                        }
                      </Text>
                      {!!url && <Image source={{ uri: url }} style={itemStyle} />}
                    </View>
                  </View>
                );
              case 'video':
                return (
                  <View style={styles.imagesRow}>
                    <Video
                      source={{
                        uri: media.localUri,
                        mainVer: 1,
                        patchVer: 0
                      }}
                      rate={1.0}
                      volume={1.0}
                      muted={false}
                      paused={false}
                      resizeMode="contain"
                      style={itemStyle}
                    />
                    {!!url && <Video
                      source={{
                        uri: media.localUri,
                        mainVer: 1,
                        patchVer: 0
                      }}
                      rate={1.0}
                      volume={1.0}
                      muted={false}
                      paused={false}
                      resizeMode="contain"
                      style={itemStyle}
                    />}
                  </View>
                );
              default:
                return null;
            }
          })}
        </View>
      </View>
    );
  }

  handleOpenCamera = async ({ mediaType }) => {
    const medias = await ImageCropPicker.openCamera({ mediaType });
    medias && this.setState({ medias });

    const url = await upload({
      entityType: 'user',
      filename: medias[0].filename,
      filePath: medias[0].localUri,
      onProgress: this.handleProgress
    });
    this.setState({ url });
  }

  handleOpenPicker = async ({ mediaType }) => {
    const medias = await ImageCropPicker.openPicker({ mediaType });
    medias && this.setState({ medias });

    const url = await upload({
      entityType: 'user',
      filename: medias[0].filename,
      filePath: medias[0].localUri,
      onProgress: this.handleProgress
    });
    this.setState({ url, progress: null });
  }

  handleProgress = (val) => this.setState({ progress: val });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 30
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 20
  },
  mediasWrapper: {
    paddingHorizontal: 15,
    flex: 1
  },
  imagesRow: {
    flexDirection: 'row'
  }
});
