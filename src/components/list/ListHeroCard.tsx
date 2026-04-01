import { useGroceryStore } from "@/store/grocery-store";
import { Text, View, TouchableOpacity, Share } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const ListHeroCard = () => {
  const { items } = useGroceryStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const completedCount = items.filter((item) => item.purchased).length;
  const pendingCount = items.length - completedCount;
  const completionRate = items.length ? Math.round((completedCount / items.length) * 100) : 0;

  const handleShare = async () => {
    if (items.length === 0) return;
    const pendingItems = items.filter((item) => !item.purchased);
    const formattedItems = pendingItems
      .map((item) => `☐ ${item.name} — ${item.quantity}`)
      .join('\n');
    const message = `🛒 Grocify Shopping List\n\n${formattedItems}\n\nShared via Grocify`;
    try {
      await Share.share(
        { message, title: 'Grocify Shopping List' },
        { dialogTitle: 'Share Grocify List via...' }
      );
    } catch (error) {
      console.error("Error sharing list:", error);
    }
  };

  return (
    <View>
      {/* Hero Title Area */}
      <View className="mb-6">
        <Text
          className="text-4xl text-foreground"
          style={{ fontWeight: "800", letterSpacing: -0.5 }}
        >
          Your Grocery Board
        </Text>
        <Text className="mt-1.5 text-base text-muted-foreground">
          {pendingCount} pending · {completedCount} completed
        </Text>
      </View>

      {/* Stock Progress Card — No borders, tonal shift only */}
      <View
        className="rounded-3xl bg-card p-5"
        style={{
          shadowColor: isDark ? "#000" : "rgba(0,106,45,0.08)",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDark ? 0.4 : 1,
          shadowRadius: 24,
          elevation: 4,
        }}
      >
        <View className="flex-row items-center justify-between mb-3">
          <Text
            className="text-xs text-muted-foreground"
            style={{ letterSpacing: 1.2, textTransform: "uppercase", fontWeight: "600" }}
          >
            Stock Progress
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-2xl text-primary" style={{ fontWeight: "700" }}>
              {completionRate}%
            </Text>
            {/* Share button */}
            <TouchableOpacity
              onPress={handleShare}
              className="w-9 h-9 rounded-full items-center justify-center"
              style={{
                backgroundColor: isDark ? "rgba(107,255,143,0.12)" : "rgba(0,106,45,0.08)",
              }}
              activeOpacity={0.7}
            >
              <FontAwesome6
                name="share-nodes"
                size={14}
                color={isDark ? "#6bff8f" : "#006a2d"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="h-2.5 rounded-full bg-secondary overflow-hidden">
          <View
            className="h-full rounded-full bg-primary"
            style={{ width: `${Math.max(completionRate, 2)}%` }}
          />
        </View>
      </View>
    </View>
  );
};

export default ListHeroCard;
