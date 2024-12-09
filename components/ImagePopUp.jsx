import React from "react";
import { Modal, View, Image, TouchableOpacity } from "react-native";

const ImagePopup = ({ visible, imageUrl, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        className="flex-1 justify-center items-center bg-primary bg-opacity-50"
        activeOpacity={1}
        onPressOut={onClose} // Close modal on pressing outside the image
      >
        <TouchableOpacity className="" activeOpacity={1} onPress={() => {}}>
          <Image
            source={{ uri: imageUrl }}
            className="h-[100%] w-80" // Adjust size as needed
            resizeMode="contain"

          />
        </TouchableOpacity>
        <TouchableOpacity 
          activeOpacity={1} 
          onPressOut={onClose} 
          className="absolute bottom-[25%] right-50"
        >
          <Image
            source={require("../assets/images/Cancel.png")} // Ensure the correct path
            className="w-10 h-10"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ImagePopup;
