import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useGroceryStore, GroceryCategory } from '@/store/grocery-store';
import { useColorScheme } from 'nativewind';

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
  if (t.includes('apple') || t.includes('banana') || t.includes('carrot') || t.includes('onion') || t.includes('fruit')) return 'Produce';
  if (t.includes('bread') || t.includes('cake') || t.includes('croissant') || t.includes('pie')) return 'Bakery';
  if (t.includes('chip') || t.includes('cookie') || t.includes('candy') || t.includes('snack')) return 'Snacks';
  return 'Pantry';
};

export default function VoiceAddModal({ visible, onClose }: VoiceAddModalProps) {
  const { addItem, isLoading } = useGroceryStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const [text, setText] = useState('');

  useEffect(() => {
    if (!visible) setText('');
  }, [visible]);

  const handleProcess = async () => {
    if (!text.trim()) return;
    const itemsToAdd = parseVoiceInput(text);
    if (itemsToAdd.length === 0) {
      Alert.alert("Didn't catch that", "Try saying something like 'Milk 2, Bread 1'");
      return;
    }
    try {
      await Promise.all(
        itemsToAdd.map(item =>
          addItem({
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            quantity: item.quantity,
            category: smartCategorize(item.name),
            priority: 'medium'
          })
        )
      );
      Alert.alert("Success!", `Added ${itemsToAdd.length} items to your list.`);
      onClose();
    } catch (e) {
      Alert.alert("Error", "Could not process voice add.");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-end"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />

        <View className="bg-card rounded-t-[32px] pt-4 pb-12 px-6 items-center">
          <View className="w-10 h-1 bg-muted rounded-full mb-10" />

          <View
            className="w-24 h-24 rounded-full items-center justify-center mb-6"
            style={{
              backgroundColor: isDark ? "rgba(107,255,143,0.1)" : "rgba(0,110,47,0.06)",
            }}
          >
            <FontAwesome6 name="microphone" size={40} color={isDark ? "#6bff8f" : "#006a2d"} />
          </View>

          <Text className="text-foreground mb-2 text-center" style={{ fontSize: 22, fontWeight: "800" }}>
            Smart Voice Notes
          </Text>
          <Text className="text-muted-foreground text-center mb-8 px-4" style={{ fontSize: 14, lineHeight: 21 }}>
            Tap the microphone on your keyboard and say:{"\n"}
            <Text style={{ fontWeight: "700", color: isDark ? "#6bff8f" : "#006a2d" }}>
              "Milk 2, Bread 1, Eggs"
            </Text>
          </Text>

          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Dictate here..."
            placeholderTextColor={isDark ? "#4a5568" : "#a0aec0"}
            multiline
            autoFocus
            className="w-full rounded-2xl px-4 py-3 text-lg text-foreground mb-5"
            style={{
              height: 100,
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              fontWeight: "500",
              textAlignVertical: "top",
            }}
          />

          <TouchableOpacity
            onPress={handleProcess}
            disabled={!text.trim() || isLoading}
            className="w-full rounded-2xl items-center justify-center flex-row gap-2"
            style={{
              height: 56,
              backgroundColor: !text.trim() || isLoading
                ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)")
                : (isDark ? "#6bff8f" : "#006a2d"),
              shadowColor: isDark ? "rgba(107,255,143,0.3)" : "rgba(0,106,45,0.25)",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: text.trim() && !isLoading ? 1 : 0,
              shadowRadius: 20,
              elevation: text.trim() && !isLoading ? 6 : 0,
            }}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: "700", color: isDark ? "#0f172a" : "#ffffff" }}>
                Processing...
              </Text>
            ) : (
              <Text style={{ fontSize: 16, fontWeight: "700", color: isDark ? "#0f172a" : "#ffffff" }}>
                Process Voice Command
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
