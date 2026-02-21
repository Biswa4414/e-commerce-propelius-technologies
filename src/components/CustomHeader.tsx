import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const CustomHeader: React.FC<Props> = ({ value, onChange }) => {
  const [listening, setListening] = useState(false);

  useSpeechRecognitionEvent("result", (event) => {
    const transcript = event.results?.[0]?.transcript;
    if (transcript) {
      onChange(transcript);
      ExpoSpeechRecognitionModule.stop();
    }
    setListening(false);
  });

  useSpeechRecognitionEvent("error", (event) => {
    console.error("Speech recognition error:", event.error);
    setListening(false);
  });

  useSpeechRecognitionEvent("end", () => {
    setListening(false);
  });

  const startListening = async () => {
    try {
      const result =
        await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        console.warn("Microphone permission not granted");
        return;
      }

      setListening(true);

      ExpoSpeechRecognitionModule.start({
        lang: "en-US",
        interimResults: false,
        continuous: false,
      });
    } catch (e) {
      console.error("Speech start error:", e);
      setListening(false);
    }
  };

  const stopListening = () => {
    ExpoSpeechRecognitionModule.stop();
    setListening(false);
  };

  return (
    <>
      <SafeAreaView edges={["top"]} style={styles.safeArea} />

      <View style={styles.container}>
        <TouchableOpacity>
          <AntDesign name="menu" size={23} color="#222" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#8B8B8B" />

          <TextInput
            placeholder="Search product"
            value={value}
            onChangeText={onChange}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            onPress={listening ? stopListening : startListening}
          >
            <Ionicons
              name={listening ? "mic" : "mic-outline"}
              size={20}
              color={listening ? "#ff4d4f" : "#555"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F4F4F4",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F4F4F4",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginLeft: 12,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
  },
});
