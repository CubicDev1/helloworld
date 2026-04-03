import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { GroceryCategory, GroceryPriority, useGroceryStore } from "@/store/grocery-store";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import TabScreenBackground from "@/components/TabScreenBackground";

const CATEGORIES: GroceryCategory[] = ["Produce", "Dairy", "Bakery", "Pantry", "Snacks"];
const PRIORITIES: GroceryPriority[] = ["low", "medium", "high"];

type BulkItem = {
  id: string;
  name: string;
  quantity: number;
  category: GroceryCategory;
  priority: GroceryPriority;
};

const categoryIcons: Record<string, string> = {
  Produce: "leaf",
  Dairy: "droplet",
  Bakery: "bread-slice",
  Pantry: "jar",
  Snacks: "cookie-bite",
};

const smartCategorize = (text: string): GroceryCategory => {
  const t = text.toLowerCase();
  if (t.includes('milk') || t.includes('cheese') || t.includes('butter') || t.includes('yogurt') || t.includes('egg')) return 'Dairy';
  if (t.includes('apple') || t.includes('banana') || t.includes('carrot') || t.includes('onion') || t.includes('fruit') || t.includes('tomato')) return 'Produce';
  if (t.includes('bread') || t.includes('cake') || t.includes('croissant') || t.includes('pie')) return 'Bakery';
  if (t.includes('chip') || t.includes('cookie') || t.includes('candy') || t.includes('chocolate') || t.includes('snack')) return 'Snacks';
  return 'Pantry';
};

const PlannerScreen = () => {
  const { items, addBulkItems } = useGroceryStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [bulkItems, setBulkItems] = useState<BulkItem[]>([
    { id: `row-${Date.now()}`, name: "", quantity: 1, category: "Produce", priority: "medium" },
  ]);
  const [isAdding, setIsAdding] = useState(false);

  const pendingCount = items.filter((item) => !item.purchased).length;
  const highPriorityCount = items.filter(
    (item) => !item.purchased && item.priority === "high",
  ).length;
  const totalQuantity = items
    .filter((item) => !item.purchased)
    .reduce((sum, item) => sum + item.quantity, 0);

  const cardShadow = {
    shadowColor: isDark ? "#000" : "rgba(0,106,45,0.06)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: isDark ? 0.35 : 1,
    shadowRadius: 20,
    elevation: 3,
  };

  const addRow = () => {
    setBulkItems(prev => [...prev, {
      id: `row-${Date.now()}-${Math.random()}`,
      name: "",
      quantity: 1,
      category: "Produce",
      priority: "medium",
    }]);
  };

  const removeRow = (id: string) => {
    if (bulkItems.length <= 1) return;
    setBulkItems(prev => prev.filter(item => item.id !== id));
  };

  const updateRow = (id: string, field: keyof BulkItem, value: any) => {
    setBulkItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      // Smart categorize when name changes
      if (field === 'name' && typeof value === 'string') {
        updated.category = smartCategorize(value);
      }
      return updated;
    }));
  };

  const validItems = bulkItems.filter(item => item.name.trim().length > 0);

  const handleBulkAdd = async () => {
    if (validItems.length === 0) {
      Alert.alert("No items", "Add at least one item name to continue.");
      return;
    }

    setIsAdding(true);
    try {
      await addBulkItems(validItems.map(item => ({
        name: item.name.trim(),
        category: item.category,
        quantity: item.quantity,
        priority: item.priority,
      })));
      Alert.alert("Success! 🎉", `Added ${validItems.length} items to your grocery list.`);
      // Reset
      setBulkItems([{ id: `row-${Date.now()}`, name: "", quantity: 1, category: "Produce", priority: "medium" }]);
    } catch (e) {
      Alert.alert("Error", "Failed to add items.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={100}
      contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 140 }}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <TabScreenBackground />

      {/* Header */}
      <View className="flex-row items-center justify-between mt-3 mb-2">
        <View className="flex-row items-center gap-3">
          <View
            className="h-10 w-10 rounded-2xl items-center justify-center"
            style={{ backgroundColor: isDark ? "rgba(107,255,143,0.12)" : "rgba(0,110,47,0.08)" }}
          >
            <FontAwesome6 name="wand-magic-sparkles" size={16} color={isDark ? "#6bff8f" : "#006a2d"} />
          </View>
          <Text className="text-primary" style={{ fontSize: 22, fontWeight: "800" }}>
            Planner
          </Text>
        </View>
      </View>

      {/* Stats Row */}
      <View className="flex-row gap-3">
        {[
          { label: "Pending", value: pendingCount, icon: "cart-shopping" },
          { label: "High ⚡", value: highPriorityCount, icon: "bolt" },
          { label: "Units", value: totalQuantity, icon: "boxes-stacked" },
        ].map((stat) => (
          <View
            key={stat.label}
            className="flex-1 rounded-2xl bg-card p-4 items-center"
            style={cardShadow}
          >
            <FontAwesome6 name={stat.icon as any} size={16} color={isDark ? "#6bff8f" : "#006a2d"} />
            <Text className="text-foreground mt-2" style={{ fontSize: 24, fontWeight: "800" }}>
              {stat.value}
            </Text>
            <Text className="text-muted-foreground mt-1" style={{ fontSize: 10, fontWeight: "600", letterSpacing: 0.8, textTransform: "uppercase" }}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Bulk Add Section */}
      <View>
        <Text
          className="text-muted-foreground mb-3 px-1"
          style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase" }}
        >
          Bulk Add Items
        </Text>

        {bulkItems.map((row, index) => (
          <View
            key={row.id}
            className="rounded-3xl bg-card p-5 mb-3"
            style={cardShadow}
          >
            {/* Row Header */}
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <View
                  className="w-7 h-7 rounded-lg items-center justify-center"
                  style={{ backgroundColor: isDark ? "rgba(107,255,143,0.12)" : "rgba(0,110,47,0.08)" }}
                >
                  <Text style={{ fontSize: 12, fontWeight: "800", color: isDark ? "#6bff8f" : "#006a2d" }}>
                    {index + 1}
                  </Text>
                </View>
                <Text className="text-foreground" style={{ fontSize: 14, fontWeight: "600" }}>
                  Item {index + 1}
                </Text>
              </View>

              {bulkItems.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeRow(row.id)}
                  className="w-8 h-8 rounded-xl items-center justify-center"
                  style={{ backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}
                >
                  <FontAwesome6 name="xmark" size={12} color={isDark ? "#64748b" : "#94a3b8"} />
                </TouchableOpacity>
              )}
            </View>

            {/* Name Input */}
            <TextInput
              value={row.name}
              onChangeText={(text) => updateRow(row.id, 'name', text)}
              placeholder="Item name (e.g. Organic Milk)"
              placeholderTextColor={isDark ? "#4a5568" : "#a0aec0"}
              className="h-12 rounded-xl px-4 text-base text-foreground mb-3"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                fontWeight: "500",
              }}
            />

            {/* Quantity + Category inline */}
            <View className="flex-row items-center gap-3 mb-3">
              {/* Quantity */}
              <View
                className="flex-row items-center rounded-xl"
                style={{ backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)", padding: 3 }}
              >
                <TouchableOpacity
                  onPress={() => updateRow(row.id, 'quantity', Math.max(1, row.quantity - 1))}
                  className="w-8 h-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }}
                >
                  <FontAwesome6 name="minus" size={10} color={isDark ? "#94a3b8" : "#64748b"} />
                </TouchableOpacity>
                <Text className="mx-3 text-foreground" style={{ fontSize: 16, fontWeight: "700", minWidth: 20, textAlign: "center" }}>
                  {row.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => updateRow(row.id, 'quantity', row.quantity + 1)}
                  className="w-8 h-8 items-center justify-center rounded-lg bg-primary"
                >
                  <FontAwesome6 name="plus" size={10} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Category chips - scrollable */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1">
                {CATEGORIES.map(cat => {
                  const isSelected = row.category === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => updateRow(row.id, 'category', cat)}
                      className="mr-1.5 flex-row items-center gap-1 rounded-full"
                      style={{
                        paddingVertical: 6,
                        paddingHorizontal: 10,
                        backgroundColor: isSelected
                          ? (isDark ? "#6bff8f" : "#006a2d")
                          : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"),
                      }}
                    >
                      <FontAwesome6
                        name={categoryIcons[cat] as any}
                        size={9}
                        color={isSelected ? (isDark ? "#0f172a" : "#ffffff") : (isDark ? "#94a3b8" : "#64748b")}
                      />
                      <Text
                        style={{
                          fontSize: 11,
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
            </View>

            {/* Priority chips */}
            <View className="flex-row gap-2">
              {PRIORITIES.map(pri => {
                const isSelected = row.priority === pri;
                const priColors = {
                  low: isDark ? "#6bff8f" : "#006a2d",
                  medium: isDark ? "#ffa94d" : "#994100",
                  high: isDark ? "#ff6b6b" : "#c83232",
                };
                return (
                  <TouchableOpacity
                    key={pri}
                    onPress={() => updateRow(row.id, 'priority', pri)}
                    className="flex-1 py-2 items-center rounded-xl flex-row justify-center gap-1.5"
                    style={{
                      backgroundColor: isSelected
                        ? (isDark ? "rgba(107,255,143,0.08)" : "rgba(0,0,0,0.04)")
                        : (isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.015)"),
                      borderWidth: isSelected ? 1.5 : 1,
                      borderColor: isSelected
                        ? priColors[pri] + "40"
                        : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
                    }}
                  >
                    <View className="w-2 h-2 rounded-full" style={{ backgroundColor: priColors[pri] }} />
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color: isSelected ? priColors[pri] : (isDark ? "#64748b" : "#94a3b8"),
                        textTransform: "capitalize",
                      }}
                    >
                      {pri}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Add Another Row */}
        <TouchableOpacity
          onPress={addRow}
          className="rounded-2xl flex-row items-center justify-center gap-2 py-4 mb-4"
          style={{
            borderWidth: 1.5,
            borderStyle: "dashed",
            borderColor: isDark ? "rgba(107,255,143,0.25)" : "rgba(0,110,47,0.15)",
            backgroundColor: isDark ? "rgba(107,255,143,0.04)" : "rgba(0,110,47,0.02)",
          }}
        >
          <FontAwesome6 name="plus" size={14} color={isDark ? "#6bff8f" : "#006a2d"} />
          <Text style={{ fontSize: 14, fontWeight: "600", color: isDark ? "#6bff8f" : "#006a2d" }}>
            Add Another Item
          </Text>
        </TouchableOpacity>

        {/* Submit All */}
        <TouchableOpacity
          onPress={handleBulkAdd}
          disabled={validItems.length === 0 || isAdding}
          className="rounded-2xl flex-row items-center justify-center gap-2"
          style={{
            height: 56,
            backgroundColor: validItems.length === 0 || isAdding
              ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)")
              : (isDark ? "#6bff8f" : "#006a2d"),
            shadowColor: isDark ? "rgba(107,255,143,0.3)" : "rgba(0,106,45,0.25)",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: validItems.length > 0 && !isAdding ? 1 : 0,
            shadowRadius: 20,
            elevation: validItems.length > 0 && !isAdding ? 6 : 0,
          }}
        >
          <FontAwesome6
            name="basket-shopping"
            size={16}
            color={validItems.length === 0 || isAdding ? (isDark ? "#64748b" : "#94a3b8") : (isDark ? "#0f172a" : "#ffffff")}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: validItems.length === 0 || isAdding ? (isDark ? "#64748b" : "#94a3b8") : (isDark ? "#0f172a" : "#ffffff"),
            }}
          >
            {isAdding ? "Adding..." : `Add ${validItems.length} Item${validItems.length !== 1 ? 's' : ''} to List`}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PlannerScreen;
