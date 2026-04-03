import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Platform, Alert, Animated, PermissionsAndroid } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useGroceryStore, GroceryCategory } from '@/store/grocery-store';
import { useColorScheme } from 'nativewind';
import * as Speech from 'expo-speech';

type VoiceAddModalProps = {
  visible: boolean;
  onClose: () => void;
};

const parseVoiceInput = (text: string) => {
  const cleanText = text.toLowerCase().replace(/add /g, '').replace(/,/g, ' ');
  const words = cleanText.split(/\s+/).filter(w => w.trim() !== '' && w !== 'and');
  const parsedItems: { name: string; quantity: number }[] = [];
  let currentName = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const isNumber = !isNaN(Number(word));
    if (isNumber) {
      if (currentName) {
        parsedItems.push({ name: currentName.trim(), quantity: Number(word) });
        currentName = "";
      }
    } else {
      if (!currentName && i > 0 && !isNaN(Number(words[i-1]))) {
        parsedItems.push({ name: word, quantity: Number(words[i-1]) });
      } else {
        currentName += " " + word;
      }
    }
  }
  if (currentName) parsedItems.push({ name: currentName.trim(), quantity: 1 });
  return parsedItems.filter(p => !!p.name);
};

const smartCategorize = (text: string): GroceryCategory => {
  const t = text.toLowerCase();
  if (t.includes('milk') || t.includes('cheese') || t.includes('butter') || t.includes('yogurt') || t.includes('egg')) return 'Dairy';
  if (t.includes('apple') || t.includes('banana') || t.includes('carrot') || t.includes('onion') || t.includes('fruit') || t.includes('tomato') || t.includes('lettuce')) return 'Produce';
  if (t.includes('bread') || t.includes('cake') || t.includes('croissant') || t.includes('pie') || t.includes('bagel')) return 'Bakery';
  if (t.includes('chip') || t.includes('cookie') || t.includes('candy') || t.includes('snack') || t.includes('chocolate')) return 'Snacks';
  return 'Pantry';
};

type ListenState = 'idle' | 'listening' | 'processing' | 'done';

export default function VoiceAddModal({ visible, onClose }: VoiceAddModalProps) {
  const { addItem, isLoading } = useGroceryStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [state, setState] = useState<ListenState>('idle');
  const [transcript, setTranscript] = useState('');
  const [parsedItems, setParsedItems] = useState<{ name: string; quantity: number }[]>([]);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!visible) {
      setState('idle');
      setTranscript('');
      setParsedItems([]);
    }
  }, [visible]);

  // Pulse animation for listening state
  useEffect(() => {
    if (state === 'listening') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [state]);

  const startListening = async () => {
    // Since expo-speech is TTS only, we'll use a prompt approach
    // that's compatible with the built APK
    setState('listening');
    
    // Show instructions
    Alert.prompt(
      "🎤 Voice Input",
      'Speak your grocery items like:\n"Milk 2, Bread 1, Eggs 12"\n\nType what you said (or use your keyboard\'s microphone button):',
      [
        { text: "Cancel", style: "cancel", onPress: () => setState('idle') },
        {
          text: "Add Items",
          onPress: (text: string | undefined) => {
            if (text && text.trim()) {
              processTranscript(text.trim());
            } else {
              setState('idle');
            }
          },
        },
      ],
      "plain-text",
      "",
      "default"
    );
  };

  // For Android which doesn't support Alert.prompt
  const [inputText, setInputText] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleMicPress = () => {
    if (Platform.OS === 'ios') {
      startListening();
    } else {
      // Android: show inline input area
      setShowInput(true);
      setState('listening');
    }
  };

  const processTranscript = async (text: string) => {
    setState('processing');
    setTranscript(text);
    const items = parseVoiceInput(text);
    setParsedItems(items);

    if (items.length === 0) {
      Alert.alert("Didn't catch that", "Try something like: 'Milk 2, Bread 1, Eggs'");
      setState('idle');
      return;
    }

    setState('done');
  };

  const confirmAdd = async () => {
    try {
      for (const item of parsedItems) {
        await addItem({
          name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          quantity: item.quantity,
          category: smartCategorize(item.name),
          priority: 'medium'
        });
      }
      Alert.alert("Added! ✅", `${parsedItems.length} item${parsedItems.length > 1 ? 's' : ''} added to your list.`);
      onClose();
    } catch (e) {
      Alert.alert("Error", "Could not add items.");
    }
  };

  const micColor = isDark ? "#6bff8f" : "#006a2d";
  const micBg = isDark ? "rgba(107,255,143,0.1)" : "rgba(0,110,47,0.06)";

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />

        <View
          className="rounded-t-[32px] pt-4 pb-12 px-6 items-center"
          style={{ backgroundColor: isDark ? "#1a2332" : "#ffffff" }}
        >
          <View className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }} />

          {/* Mic Button */}
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }],
              marginBottom: 24,
            }}
          >
            <TouchableOpacity
              onPress={handleMicPress}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: state === 'listening' ? micColor : micBg,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: micColor,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: state === 'listening' ? 0.5 : 0.15,
                shadowRadius: 24,
                elevation: state === 'listening' ? 10 : 4,
              }}
              activeOpacity={0.8}
            >
              <FontAwesome6
                name="microphone"
                size={40}
                color={state === 'listening' ? (isDark ? "#0f172a" : "#ffffff") : micColor}
              />
            </TouchableOpacity>
          </Animated.View>

          {/* State-based content */}
          {state === 'idle' && (
            <>
              <Text className="text-foreground mb-2 text-center" style={{ fontSize: 22, fontWeight: "800" }}>
                Voice Add
              </Text>
              <Text className="text-muted-foreground text-center px-4" style={{ fontSize: 14, lineHeight: 21 }}>
                Tap the microphone and say your grocery items.{"\n"}
                Example:{" "}
                <Text style={{ fontWeight: "700", color: micColor }}>
                  "Milk 2, Bread 1, Eggs"
                </Text>
              </Text>
            </>
          )}

          {state === 'listening' && (
            <>
              <Text className="text-foreground mb-2 text-center" style={{ fontSize: 22, fontWeight: "800" }}>
                Listening...
              </Text>
              <Text className="text-muted-foreground text-center px-4" style={{ fontSize: 14, lineHeight: 21 }}>
                {Platform.OS === 'android'
                  ? "Use your keyboard's 🎙️ mic button to dictate, then tap 'Process'"
                  : "Speak your items now..."}
              </Text>
            </>
          )}

          {/* Android inline text input for voice */}
          {Platform.OS === 'android' && showInput && (
            <View className="w-full mt-4">
              <View
                className="rounded-2xl px-4 py-3 mb-4"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  minHeight: 80,
                }}
              >
                <Text
                  className="text-muted-foreground mb-2"
                  style={{ fontSize: 10, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" }}
                >
                  Use mic 🎙️ on your keyboard
                </Text>
                <View className="flex-row items-center">
                  <FontAwesome6 name="microphone" size={14} color={micColor} />
                  <View className="flex-1 ml-3">
                    {/* We use a regular text input but encourage the mic button */}
                    <Text
                      style={{
                        fontSize: 13,
                        color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
                        fontStyle: "italic",
                      }}
                    >
                      Tap the input below, then tap 🎙️ on keyboard
                    </Text>
                  </View>
                </View>
              </View>
              
              {/* Actual text input that keyboard mic can use */}
              <View
                className="rounded-2xl overflow-hidden mb-4"
                style={{ backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}
              >
                <View className="px-4 py-3">
                  <Text
                    className="text-muted-foreground mb-1"
                    style={{ fontSize: 10, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" }}
                  >
                    Dictate or type items
                  </Text>
                  {React.createElement(
                    require('react-native').TextInput,
                    {
                      value: inputText,
                      onChangeText: setInputText,
                      placeholder: "Milk 2, Bread 1, Eggs 12",
                      placeholderTextColor: isDark ? "#4a5568" : "#a0aec0",
                      multiline: true,
                      autoFocus: true,
                      style: {
                        fontSize: 16,
                        color: isDark ? "#e2e8f0" : "#1e293b",
                        fontWeight: "500",
                        minHeight: 60,
                        textAlignVertical: "top" as const,
                      },
                    }
                  )}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  if (inputText.trim()) {
                    processTranscript(inputText.trim());
                    setShowInput(false);
                  }
                }}
                disabled={!inputText.trim()}
                className="w-full rounded-2xl items-center justify-center flex-row gap-2"
                style={{
                  height: 52,
                  backgroundColor: !inputText.trim()
                    ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)")
                    : (isDark ? "#6bff8f" : "#006a2d"),
                }}
              >
                <FontAwesome6
                  name="wand-magic-sparkles"
                  size={14}
                  color={!inputText.trim() ? (isDark ? "#64748b" : "#94a3b8") : (isDark ? "#0f172a" : "#ffffff")}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: !inputText.trim() ? (isDark ? "#64748b" : "#94a3b8") : (isDark ? "#0f172a" : "#ffffff"),
                  }}
                >
                  Process Items
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {state === 'done' && (
            <View className="w-full mt-2">
              <Text className="text-foreground mb-4 text-center" style={{ fontSize: 18, fontWeight: "700" }}>
                {parsedItems.length} item{parsedItems.length > 1 ? 's' : ''} found
              </Text>
              
              {/* Preview parsed items */}
              <View
                className="rounded-2xl p-4 mb-6"
                style={{ backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)" }}
              >
                {parsedItems.map((item, idx) => (
                  <View
                    key={idx}
                    className="flex-row items-center justify-between py-2"
                    style={idx !== parsedItems.length - 1 ? {
                      borderBottomWidth: 1,
                      borderBottomColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    } : {}}
                  >
                    <View className="flex-row items-center gap-2">
                      <FontAwesome6 name="check" size={12} color={micColor} />
                      <Text className="text-foreground" style={{ fontSize: 15, fontWeight: "600" }}>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </Text>
                    </View>
                    <View
                      className="rounded-full px-3 py-1"
                      style={{ backgroundColor: isDark ? "rgba(107,255,143,0.12)" : "rgba(0,110,47,0.08)" }}
                    >
                      <Text style={{ fontSize: 13, fontWeight: "700", color: micColor }}>
                        ×{item.quantity}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => { setState('idle'); setParsedItems([]); setTranscript(''); setInputText(''); }}
                  className="flex-1 rounded-2xl items-center justify-center"
                  style={{
                    height: 52,
                    backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  }}
                >
                  <Text className="text-muted-foreground" style={{ fontSize: 15, fontWeight: "600" }}>
                    Try Again
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={confirmAdd}
                  className="flex-1 rounded-2xl items-center justify-center flex-row gap-2"
                  style={{
                    height: 52,
                    backgroundColor: isDark ? "#6bff8f" : "#006a2d",
                    shadowColor: isDark ? "rgba(107,255,143,0.3)" : "rgba(0,106,45,0.25)",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 1,
                    shadowRadius: 20,
                    elevation: 6,
                  }}
                >
                  <FontAwesome6 name="cart-plus" size={14} color={isDark ? "#0f172a" : "#ffffff"} />
                  <Text style={{ fontSize: 15, fontWeight: "700", color: isDark ? "#0f172a" : "#ffffff" }}>
                    Add All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
