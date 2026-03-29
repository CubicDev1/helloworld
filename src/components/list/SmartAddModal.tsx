import React, { useState, useMemo } from "react";
import { Modal, KeyboardAvoidingView, View, Text, TextInput, Pressable, FlatList, Platform } from "react-native";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { useGroceryStore, GroceryCategory } from "@/store/grocery-store";
import { useHistoryStore } from "@/store/history-store";
import { getSmartCategory } from "@/lib/smart-category";

type SmartAddModalProps = {
  visible: boolean;
  onClose: () => void;
};

const SmartAddModal = ({ visible, onClose }: SmartAddModalProps) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addItem, isLoading } = useGroceryStore();
  const { history, addToHistory } = useHistoryStore();

  const suggestedCategory: GroceryCategory = useMemo(() => getSmartCategory(itemName), [itemName]);

  const suggestions = useMemo(() => {
    if (!itemName.trim()) return [];
    // Only return top 5 matches that aren't identical to exactly what they typed
    return history
      .filter((h) => h.toLowerCase().includes(itemName.trim().toLowerCase()) && h.toLowerCase() !== itemName.trim().toLowerCase())
      .slice(0, 5);
  }, [itemName, history]);

  const handleClose = () => {
    setItemName("");
    setQuantity(1);
    onClose();
  };

  const handleSubmit = async () => {
    if (!itemName.trim() || isLoading) return;
    await addItem({ name: itemName.trim(), category: suggestedCategory, quantity, priority: "medium" });
    addToHistory(itemName.trim());
    handleClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        className="flex-1 justify-end bg-black/50"
      >
        <Pressable className="flex-1" onPress={handleClose} />
        
        <View className="bg-card rounded-t-3xl p-6 shadow-lg">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xl font-bold text-foreground">Smart Add</Text>
            <Pressable onPress={handleClose} className="p-2 -mr-2">
              <FontAwesome6 name="xmark" size={20} color="#888" />
            </Pressable>
          </View>

          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <View className="mb-3 flex-row flex-wrap gap-2">
              {suggestions.map((suggestion, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => setItemName(suggestion)}
                  className="rounded-full bg-secondary/80 px-4 py-2"
                >
                  <Text className="text-sm font-medium text-secondary-foreground">{suggestion}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* Input Area */}
          <View className="flex-row items-center gap-2 mb-4">
            <View className="flex-1 h-14 rounded-2xl border border-border bg-background flex-row items-center px-4">
              <FontAwesome6 name="basket-shopping" size={16} color="#888" className="mr-2" />
              <TextInput
                value={itemName}
                onChangeText={setItemName}
                placeholder="E.g., Milk, Apples, Bread..."
                placeholderTextColor="#888"
                className="flex-1 ml-3 text-lg text-foreground h-full"
                autoFocus
                onSubmitEditing={handleSubmit}
              />
            </View>

            <View className="h-14 flex-row items-center rounded-2xl border border-border bg-secondary py-2 px-3">
              <Pressable onPress={() => setQuantity(Math.max(1, quantity - 1))} className="p-2">
                <FontAwesome6 name="minus" size={12} color="#5f6e66" />
              </Pressable>
              <Text className="mx-2 text-lg font-bold text-foreground w-6 text-center">{quantity}</Text>
              <Pressable onPress={() => setQuantity(quantity + 1)} className="p-2">
                <FontAwesome6 name="plus" size={12} color="#5f6e66" />
              </Pressable>
            </View>
          </View>

          {/* Category Preview & Submit */}
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center">
              <Text className="text-sm text-muted-foreground mr-2">Category:</Text>
              <View className="rounded-xl border border-border bg-background px-3 py-1">
                <Text className="text-xs font-semibold text-foreground uppercase">{suggestedCategory}</Text>
              </View>
            </View>

            <Pressable
              onPress={handleSubmit}
              disabled={!itemName.trim() || isLoading}
              className={`h-12 w-24 items-center justify-center rounded-xl bg-primary ${
                !itemName.trim() || isLoading ? "opacity-50" : "active:opacity-80"
              }`}
            >
              <Text className="font-bold text-primary-foreground">Add</Text>
            </Pressable>
          </View>

          {/* Safe area padding for newer iPhones without home button */}
          <View className="h-6" />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SmartAddModal;
