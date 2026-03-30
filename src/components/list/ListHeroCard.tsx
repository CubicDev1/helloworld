import { useGroceryStore } from "@/store/grocery-store";
import { Text, View, TouchableOpacity, Share } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ListHeroCard = () => {
  const { items } = useGroceryStore();

  const completedCount = items.filter((item) => item.purchased).length;
  const pendingCount = items.length - completedCount;
  const completionRate = items.length ? Math.round((completedCount / items.length) * 100) : 0;

  const handleShare = async () => {
    if (items.length === 0) return;

    // Filter only active items if desired, but sharing the whole list is common
    const pendingItems = items.filter((item) => !item.purchased);
    
    // Format list cleanly
    const formattedItems = pendingItems
      .map((item) => `☐ ${item.name} — ${item.quantity}`)
      .join('\n');

    const message = `🛒 Grocify Shopping List\n\n${formattedItems}\n\nShared via Grocify`;

    try {
      await Share.share({
        message,
        title: 'Grocify Shopping List',
      });
    } catch (error) {
      console.error("Error sharing list:", error);
    }
  };

  return (
    <View className="rounded-3xl bg-primary p-5 relative">
      <View className="flex-row justify-between items-start">
        <View>
          <Text className="text-sm font-semibold uppercase tracking-[1px] text-primary-foreground/70">
            Today
          </Text>

          <Text className="mt-1 text-3xl font-extrabold text-primary-foreground">
            Your Grocery Board
          </Text>

          <Text className="mt-1 text-sm text-primary-foreground/80">
            {pendingCount} pending · {completedCount} completed
          </Text>
        </View>

        {/* Share Button placed neatly top-right of the card */}
        <TouchableOpacity 
          onPress={handleShare}
          className="bg-white/20 w-10 h-10 rounded-full justify-center items-center active:bg-white/40"
        >
          <FontAwesome name="share" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View className="mt-4 overflow-hidden rounded-full bg-white/50">
        <View className="h-2 rounded-full bg-secondary" style={{ width: `${completionRate}%` }} />
      </View>
    </View>
  );
};

export default ListHeroCard;
