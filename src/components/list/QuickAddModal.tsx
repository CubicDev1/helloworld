import React, { useState, useEffect, useMemo } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useGroceryStore, GroceryCategory, GroceryPriority } from '@/store/grocery-store';
import { useColorScheme } from 'nativewind';

type QuickAddModalProps = {
  visible: boolean;
  onClose: () => void;
};

const CATEGORIES: GroceryCategory[] = ["Produce", "Dairy", "Bakery", "Pantry", "Snacks"];
const PRIORITIES: GroceryPriority[] = ["low", "medium", "high"];

const categoryIcons: Record<string, string> = {
  Produce: "leaf",
  Dairy: "droplet",
  Bakery: "bread-slice",
  Pantry: "jar",
  Snacks: "cookie-bite",
};

const smartCategorize = (text: string): GroceryCategory | null => {
  const t = text.toLowerCase();
  if (t.includes('milk') || t.includes('cheese') || t.includes('butter') || t.includes('yogurt')) return 'Dairy';
  if (t.includes('apple') || t.includes('banana') || t.includes('carrot') || t.includes('onion') || t.includes('fruit') || t.includes('lettuce') || t.includes('tomato')) return 'Produce';
  if (t.includes('bread') || t.includes('cake') || t.includes('croissant') || t.includes('pie') || t.includes('bagel')) return 'Bakery';
  if (t.includes('chip') || t.includes('cookie') || t.includes('candy') || t.includes('chocolate') || t.includes('popcorn') || t.includes('snack')) return 'Snacks';
  if (t.includes('pasta') || t.includes('rice') || t.includes('sauce') || t.includes('oil') || t.includes('flour') || t.includes('sugar') || t.includes('cereal')) return 'Pantry';
  return null;
};

export default function QuickAddModal({ visible, onClose }: QuickAddModalProps) {
  const { items, addItem, isLoading } = useGroceryStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState<GroceryCategory>('Produce');
  const [priority, setPriority] = useState<GroceryPriority>('medium');

  const [slideAnim] = useState(new Animated.Value(300));

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        bounciness: 8,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(300);
      setName('');
      setQuantity(1);
      setCategory('Produce');
      setPriority('medium');
    }
  }, [visible]);

  const previousItemNames = useMemo(() => {
    const names = items.map(i => i.name.trim());
    return Array.from(new Set(names));
  }, [items]);

  const suggestions = useMemo(() => {
    if (name.length < 1) return [];
    return previousItemNames
      .filter(n => n.toLowerCase().includes(name.toLowerCase()) && n.toLowerCase() !== name.toLowerCase())
      .slice(0, 3);
  }, [name, previousItemNames]);

  const handleNameChange = (text: string) => {
    setName(text);
    const suggestedCategory = smartCategorize(text);
    if (suggestedCategory) setCategory(suggestedCategory);
  };

  const selectSuggestion = (suggestion: string) => {
    setName(suggestion);
    const suggestedCategory = smartCategorize(suggestion);
    if (suggestedCategory) setCategory(suggestedCategory);
  };

  const handleAdd = async () => {
    if (!name.trim()) return;
    await addItem({ name: name.trim(), category, quantity, priority });
    onClose();
  };

  const priorityColors = {
    low: { bg: isDark ? "rgba(107,255,143,0.12)" : "rgba(0,110,47,0.08)", border: isDark ? "rgba(107,255,143,0.3)" : "rgba(0,110,47,0.2)", text: isDark ? "#6bff8f" : "#006a2d" },
    medium: { bg: isDark ? "rgba(255,150,50,0.12)" : "rgba(153,65,0,0.06)", border: isDark ? "rgba(255,150,50,0.3)" : "rgba(153,65,0,0.2)", text: isDark ? "#ffa94d" : "#994100" },
    high: { bg: isDark ? "rgba(255,80,80,0.12)" : "rgba(200,50,50,0.06)", border: isDark ? "rgba(255,80,80,0.3)" : "rgba(200,50,50,0.2)", text: isDark ? "#ff6b6b" : "#c83232" },
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-end"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />

        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            backgroundColor: isDark ? "#1a2332" : "#ffffff",
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingTop: 12,
            paddingBottom: 40,
            paddingHorizontal: 24,
          }}
        >
          {/* Handle */}
          <View className="w-10 h-1 bg-muted rounded-full self-center mb-8" />

          {/* Header */}
          <View className="flex-row items-center justify-between mb-2">
            <View>
              <Text className="text-foreground" style={{ fontSize: 24, fontWeight: "800" }}>
                Quick Add Item
              </Text>
              <Text className="text-muted-foreground mt-1" style={{ fontSize: 14 }}>
                Add a new essential to your weekly harvest.
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="w-9 h-9 items-center justify-center rounded-full"
              style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }}
            >
              <FontAwesome6 name="xmark" size={14} color={isDark ? "#94a3b8" : "#64748b"} />
            </TouchableOpacity>
          </View>

          {/* Item Name Label */}
          <Text className="text-muted-foreground mt-5 mb-2 ml-1" style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" }}>
            Item Name
          </Text>

          {/* Name Input — Soft UI carved field */}
          <View className="relative">
            <TextInput
              value={name}
              onChangeText={handleNameChange}
              placeholder="Ex: Organic Blueberries"
              placeholderTextColor={isDark ? "#4a5568" : "#a0aec0"}
              autoFocus
              className="h-14 rounded-2xl px-4 text-lg text-foreground"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                fontWeight: "500",
              }}
            />

            {suggestions.length > 0 && (
              <View
                className="absolute top-16 left-0 right-0 rounded-2xl overflow-hidden z-50"
                style={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.15,
                  shadowRadius: 20,
                  elevation: 8,
                }}
              >
                {suggestions.map((sug, idx) => (
                  <TouchableOpacity
                    key={idx}
                    className="py-3 px-4"
                    style={idx !== suggestions.length - 1 ? { borderBottomWidth: 1, borderBottomColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" } : {}}
                    onPress={() => selectSuggestion(sug)}
                  >
                    <Text className="text-foreground" style={{ fontSize: 15, fontWeight: "500" }}>{sug}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Quantity */}
          <View className="flex-row items-center justify-between mt-6">
            <View className="flex-row items-center gap-2">
              <FontAwesome6 name="layer-group" size={14} color={isDark ? "#6bff8f" : "#006a2d"} />
              <Text className="text-foreground" style={{ fontSize: 16, fontWeight: "600" }}>Quantity</Text>
            </View>
            <View className="flex-row items-center rounded-2xl bg-muted" style={{ padding: 4 }}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }}
              >
                <FontAwesome6 name="minus" size={12} color={isDark ? "#94a3b8" : "#64748b"} />
              </TouchableOpacity>
              <Text className="mx-5 text-foreground" style={{ fontSize: 20, fontWeight: "700" }}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                className="w-10 h-10 items-center justify-center rounded-xl bg-primary"
              >
                <FontAwesome6 name="plus" size={12} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Category */}
          <Text className="text-muted-foreground mt-6 mb-2 ml-1" style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" }}>
            Category
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map(cat => {
              const isSelected = category === cat;
              const icon = categoryIcons[cat] ?? "tag";
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  className="mr-2 flex-row items-center gap-1.5 rounded-full"
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    backgroundColor: isSelected
                      ? (isDark ? "#6bff8f" : "#006a2d")
                      : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"),
                  }}
                >
                  <FontAwesome6
                    name={icon as any}
                    size={12}
                    color={isSelected ? (isDark ? "#0f172a" : "#ffffff") : (isDark ? "#94a3b8" : "#64748b")}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: isSelected ? (isDark ? "#0f172a" : "#ffffff") : (isDark ? "#94a3b8" : "#64748b"),
                    }}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Priority */}
          <Text className="text-muted-foreground mt-6 mb-2 ml-1" style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" }}>
            Priority
          </Text>
          <View className="flex-row gap-2">
            {PRIORITIES.map(pri => {
              const isSelected = priority === pri;
              const config = priorityColors[pri];
              return (
                <TouchableOpacity
                  key={pri}
                  onPress={() => setPriority(pri)}
                  className="flex-1 py-3 items-center rounded-2xl flex-row justify-center gap-1.5"
                  style={{
                    backgroundColor: isSelected ? config.bg : (isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"),
                    borderWidth: isSelected ? 1.5 : 1,
                    borderColor: isSelected ? config.border : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"),
                  }}
                >
                  <View className="w-2 h-2 rounded-full" style={{ backgroundColor: config.text }} />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "700",
                      color: isSelected ? config.text : (isDark ? "#64748b" : "#94a3b8"),
                      textTransform: "capitalize",
                    }}
                  >
                    {pri}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleAdd}
            disabled={!name.trim() || isLoading}
            className="mt-8 rounded-2xl flex-row items-center justify-center gap-2"
            style={{
              height: 56,
              backgroundColor: !name.trim() || isLoading
                ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)")
                : (isDark ? "#6bff8f" : "#006a2d"),
              shadowColor: isDark ? "rgba(107,255,143,0.3)" : "rgba(0,106,45,0.25)",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: name.trim() && !isLoading ? 1 : 0,
              shadowRadius: 20,
              elevation: name.trim() && !isLoading ? 6 : 0,
            }}
          >
            {isLoading ? (
              <Text style={{ fontSize: 16, fontWeight: "700", color: isDark ? "#0f172a" : "#ffffff" }}>
                Adding...
              </Text>
            ) : (
              <>
                <FontAwesome6 name="cart-plus" size={16} color={isDark ? "#0f172a" : "#ffffff"} />
                <Text style={{ fontSize: 16, fontWeight: "700", color: isDark ? "#0f172a" : "#ffffff" }}>
                  Add Item
                </Text>
              </>
            )}
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
