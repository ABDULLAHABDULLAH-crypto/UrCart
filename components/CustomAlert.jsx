import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}  // For Android back button
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="m-4 bg-white p-5 rounded-lg shadow-lg max-w-xs">
          <Text className="text-lg text-center mb-4">{message}</Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-blue-500 py-2 rounded-full"
          >
            <Text className="text-white text-center font-bold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;