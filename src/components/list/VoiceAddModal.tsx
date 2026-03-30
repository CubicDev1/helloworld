import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useGroceryStore, GroceryCategory } from '@/store/grocery-store';

type VoiceAddModalProps = {
  visible: boolean;
  onClose: () => void;
};

// Very simple NLP extraction for groceries
const parseVoiceInput = (text: string) => {
  // Remove formatting and lower
  const cleanText = text.toLowerCase().replace(/add /g, '').replace(/,/g, ' ');
  const words = cleanText.split(/\s+/).filter(w => w.trim() !== '' && w !== 'and');
  
  const parsedItems: { name: string; quantity: number }[] = [];
  
  let currentName = "";
  let currentQuantity = 1;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const isNumber = !isNaN(Number(word));

    if (isNumber) {
      if (currentName) {
        parsedItems.push({ name: currentName.trim(), quantity: Number(word) });
        currentName = "";
        currentQuantity = 1; // reset default
      }
    } else {
      if (!currentName && i > 0 && !isNaN(Number(words[i-1]))) {
        // e.g. "2 milk" -> the number came before the item
        parsedItems.push({ name: word, quantity: Number(words[i-1]) });
      } else {
         // Part of the name
         currentName += " " + word;
      }
    }
  }
  
  // if trail left
  if (currentName) {
    parsedItems.push({ name: currentName.trim(), quantity: 1 });
  }

  // Deduplicate and clean
  return parsedItems.filter(p => !!p.name);
};

// Smart Category mapping helper
const smartCategorize = (text: string): GroceryCategory => {
  const t = text.toLowerCase();
  if (t.includes('milk') || t.includes('cheese') || t.includes('butter') || t.includes('yogurt') || t.includes('egg')) return 'Dairy';
  if (t.includes('apple') || t.includes('banana') || t.includes('carrot') || t.includes('onion') || t.includes('fruit')) return 'Produce';
  if (t.includes('bread') || t.includes('cake') || t.includes('croissant') || t.includes('pie')) return 'Bakery';
  if (t.includes('chip') || t.includes('cookie') || t.includes('candy') || t.includes('snack')) return 'Snacks';
  return 'Pantry'; // default fallback
};

export default function VoiceAddModal({ visible, onClose }: VoiceAddModalProps) {
  const { addItem, isLoading } = useGroceryStore();
  const [text, setText] = useState('');

  useEffect(() => {
    if (!visible) setText('');
  }, [visible]);

  const handleProcess = async () => {
    if (!text.trim()) return;

    const itemsToAdd = parseVoiceInput(text);
    
    if (itemsToAdd.length === 0) {
      Alert.alert("Didn't catch that", "Try saying something like 'Add milk 2, bread 1'");
      return;
    }

    try {
      // Add sequentially
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
      console.log(e);
      Alert.alert("Error", "Could not process voice add.");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-black/70 justify-end">
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
        
        <View className="bg-card rounded-t-[36px] pt-4 pb-12 px-6 shadow-2xl items-center">
          <View className="w-12 h-1.5 bg-muted rounded-full mb-8" />
          
          <View className="bg-primary/20 w-24 h-24 rounded-full items-center justify-center mb-6">
            <FontAwesome name="microphone" size={48} color="hsl(142 70% 54%)" />
          </View>
          
          <Text className="text-xl font-bold text-foreground mb-2 text-center">Smart Voice Notes</Text>
          <Text className="text-muted-foreground text-center mb-8 px-4">
            Tap the Microphone on your keyboard and say: 
            {"\n"}"Milk 2, Bread 1, Eggs"
          </Text>

          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Dictate here..."
            placeholderTextColor="#888"
            multiline
            autoFocus
            className="w-full h-24 bg-background border border-border rounded-xl px-4 py-3 text-lg text-foreground mb-4"
          />

          <TouchableOpacity 
            onPress={handleProcess}
            disabled={!text.trim() || isLoading}
            className={`w-full h-14 rounded-2xl items-center justify-center flex-row ${!text.trim() || isLoading ? 'bg-muted' : 'bg-primary'}`}
          >
            {isLoading ? (
              <Text className="text-lg font-bold text-white">Processing...</Text>
            ) : (
              <Text className="text-lg font-bold text-white mb-0.5">Process Voice Command</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
