import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";

export default function InsightsStatsSection() {
  const { items } = useGroceryStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const totalItems = items.length;
  const completedItems = items.filter((item) => item.purchased).length;
  const pendingItems = totalItems - completedItems;
  const completionRate = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

  const cardShadow = {
    shadowColor: isDark ? "#000" : "rgba(0,106,45,0.06)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: isDark ? 0.35 : 1,
    shadowRadius: 20,
    elevation: 3,
  };

  return (
    <>
      {/* Total Items Hero Card — green tinted bg */}
      <View
        className="rounded-3xl p-5"
        style={{
          ...cardShadow,
          backgroundColor: isDark ? "rgba(107,255,143,0.08)" : "rgba(0,110,47,0.06)",
        }}
      >
        <Text
          className="text-primary"
          style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase" }}
        >
          Total Items
        </Text>
        <View className="flex-row items-end justify-between mt-3">
          <Text className="text-foreground" style={{ fontSize: 48, fontWeight: "800" }}>
            {totalItems}
          </Text>
          <View className="h-10 w-10 rounded-2xl bg-primary items-center justify-center mb-1">
            <FontAwesome6 name="basket-shopping" size={18} color="#fff" />
          </View>
        </View>
        <Text className="mt-1 text-sm text-muted-foreground">Across all lists</Text>
      </View>

      {/* Pending + Completed — Side by Side */}
      <View className="flex-row gap-3">
        <View className="flex-1 rounded-3xl bg-card p-5" style={cardShadow}>
          <View className="flex-row items-center gap-2 mb-3">
            <FontAwesome6 name="cart-shopping" size={13} color={isDark ? "#6bff8f" : "#006a2d"} />
            <Text
              className="text-primary"
              style={{ fontSize: 10, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" }}
            >
              Pending
            </Text>
          </View>
          <Text className="text-foreground" style={{ fontSize: 36, fontWeight: "800" }}>
            {pendingItems}
          </Text>
        </View>

        <View className="flex-1 rounded-3xl bg-card p-5" style={cardShadow}>
          <View className="flex-row items-center gap-2 mb-3">
            <FontAwesome6 name="circle-check" size={13} color={isDark ? "#6bff8f" : "#006a2d"} />
            <Text
              className="text-primary"
              style={{ fontSize: 10, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" }}
            >
              Completed
            </Text>
          </View>
          <Text className="text-foreground" style={{ fontSize: 36, fontWeight: "800" }}>
            {completedItems}
          </Text>
        </View>
      </View>

      {/* Completion Rate Card */}
      <View className="rounded-3xl bg-card p-5" style={cardShadow}>
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-foreground" style={{ fontSize: 16, fontWeight: "700" }}>
            Completion rate
          </Text>
          <Text className="text-primary" style={{ fontSize: 24, fontWeight: "800" }}>
            {completionRate}%
          </Text>
        </View>
        <Text className="text-sm text-muted-foreground mb-4">
          {completionRate === 0
            ? "You haven't checked off any items today. Time to shop!"
            : completionRate === 100
            ? "Amazing! All items completed! 🎉"
            : "Keep going, you're making great progress!"}
        </Text>
        <View className="h-2.5 rounded-full bg-secondary overflow-hidden">
          <View
            className="h-full rounded-full bg-primary"
            style={{ width: `${Math.max(completionRate, 2)}%` }}
          />
        </View>
      </View>
    </>
  );
}
