import ImageCropPicker from './ImagePicker';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class App extends React.Component {
  state = {
    medias: []
  }
  render() {
    const { medias } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => ImageCropPicker.openPicker({ mediaType: 'photo' })}>
          <Text style={styles.buttonText}>Add Image from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ImageCropPicker.openCamera({ mediaType: 'photo' })}>
          <Text style={styles.buttonText}>Add Image from Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ImageCropPicker.openPicker({ mediaType: 'video' })}>
          <Text style={styles.buttonText}>Add Video from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => ImageCropPicker.openCamera({ mediaType: 'video' })}>
          <Text style={styles.buttonText}>Add Video from Camera</Text>
        </TouchableOpacity>

        <View style={styles.mediasWrapper}>
          {medias.map((media, index) => {
            <Image source={{ uri: media.localUri }} style={styles.image} />
          })}
        </View>
      </View>
    );
  }

  handleOpenCamera = async ({ mediaType }) => {
    ImageCropPicker.openCamera({ mediaType })
      .then(medias => this.setState({ medias }))
      .catch(err => Alert(err));
  }

  handleOpenPicker = async ({ mediaType }) => {
    ImageCropPicker.openPicker({ mediaType })
    .then(medias => this.setState({ medias }))
    .catch(err => Alert(err));
  }
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
    paddingHorizontal: 15
  },
  image: {
    width: 300,
    height: 400
  }
});
