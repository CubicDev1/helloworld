import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useColorScheme } from "nativewind";

const CompletedItems = () => {
  const { removeItem, togglePurchased, items } = useGroceryStore();
  const completedItems = items.filter((item) => item.purchased);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  if (!completedItems.length) return null;

  return (
    <View className="mt-4">
      <Text
        className="mb-3 px-1 text-muted-foreground"
        style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase" }}
      >
        Completed
      </Text>

      <View
        className="rounded-3xl bg-card p-4"
        style={{
          shadowColor: isDark ? "#000" : "rgba(0,106,45,0.05)",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isDark ? 0.3 : 1,
          shadowRadius: 16,
          elevation: 2,
        }}
      >
        {completedItems.map((item, index) => (
          <View
            key={item.id}
            className={`flex-row items-center justify-between py-3 ${
              index !== completedItems.length - 1 ? "" : ""
            }`}
            style={
              index !== completedItems.length - 1
                ? {
                    borderBottomWidth: 1,
                    borderBottomColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  }
                : {}
            }
          >
            <View className="flex-row items-center gap-3 flex-1">
              <Pressable
                onPress={() => togglePurchased(item.id)}
                className="h-6 w-6 items-center justify-center rounded-lg bg-primary"
              >
                <FontAwesome6 name="check" size={12} color="#ffffff" />
              </Pressable>
              <Text
                className="text-muted-foreground flex-1"
                style={{ fontSize: 15, textDecorationLine: "line-through" }}
              >
                {item.name}
              </Text>
            </View>

            <Pressable
              onPress={() => removeItem(item.id)}
              className="h-8 w-8 items-center justify-center rounded-xl"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              }}
            >
              <FontAwesome6 name="trash-can" size={12} color={isDark ? "#64748b" : "#94a3b8"} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CompletedItems;
