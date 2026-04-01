import { GroceryItem, useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useColorScheme } from "nativewind";

const priorityConfig = {
  low: {
    bg: "bg-priority-low",
    text: "text-priority-low-foreground",
    label: "LOW",
  },
  medium: {
    bg: "bg-priority-medium",
    text: "text-priority-medium-foreground",
    label: "MEDIUM",
  },
  high: {
    bg: "bg-priority-high",
    text: "text-priority-high-foreground",
    label: "HIGH PRIORITY",
  },
};

const PendingItemCard = ({ item }: { item: GroceryItem }) => {
  const { removeItem, updateQuantity, togglePurchased } = useGroceryStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const priority = priorityConfig[item.priority];

  return (
    <View
      className="rounded-3xl bg-card p-5"
      style={{
        shadowColor: isDark ? "#000" : "rgba(0,106,45,0.06)",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: isDark ? 0.35 : 1,
        shadowRadius: 20,
        elevation: 3,
      }}
    >
      <View className="flex-row items-start gap-3">
        {/* Checkbox */}
        <Pressable
          className="mt-1 h-6 w-6 items-center justify-center rounded-lg"
          style={{
            borderWidth: 2,
            borderColor: isDark ? "rgba(107,255,143,0.4)" : "rgba(0,110,47,0.3)",
          }}
          onPress={() => togglePurchased(item.id)}
        />

        <View className="flex-1">
          {/* Item name */}
          <Text
            className="text-lg text-foreground"
            style={{ fontWeight: "700" }}
          >
            {item.name}
          </Text>

          {/* Category + Priority pills */}
          <View className="mt-2 flex-row items-center gap-2 flex-wrap">
            <View className="rounded-full bg-secondary px-3 py-1">
              <Text
                className="text-secondary-foreground"
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                }}
              >
                {item.category}
              </Text>
            </View>
            <View className={`rounded-full px-3 py-1 ${priority.bg}`}>
              <Text
                className={priority.text}
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                }}
              >
                {priority.label}
              </Text>
            </View>
          </View>

          {/* Quantity stepper — carved "well" style */}
          <View className="mt-4 flex-row items-center justify-between">
            <View
              className="flex-row items-center rounded-2xl bg-muted"
              style={{ paddingVertical: 4, paddingHorizontal: 4 }}
            >
              <Pressable
                className="h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                }}
                onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              >
                <FontAwesome6
                  name="minus"
                  size={12}
                  color={isDark ? "#94a3b8" : "#64748b"}
                />
              </Pressable>

              <Text
                className="mx-4 text-foreground"
                style={{ fontSize: 18, fontWeight: "700", minWidth: 24, textAlign: "center" }}
              >
                {item.quantity}
              </Text>

              <Pressable
                className="h-9 w-9 items-center justify-center rounded-xl bg-primary"
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <FontAwesome6 name="plus" size={12} color="#fff" />
              </Pressable>
            </View>

            <Text
              className="text-muted-foreground"
              style={{ fontSize: 13, fontStyle: "italic" }}
            >
              Bundle of {item.quantity}
            </Text>
          </View>
        </View>

        {/* Delete button — subtle, ghost-style */}
        <Pressable
          className="h-9 w-9 items-center justify-center rounded-xl"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
          }}
          onPress={() => removeItem(item.id)}
        >
          <FontAwesome6
            name="trash-can"
            size={14}
            color={isDark ? "#64748b" : "#94a3b8"}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default PendingItemCard;
