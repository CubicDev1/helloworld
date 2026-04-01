import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";

export default function InsightsPrioritySection() {
  const { items } = useGroceryStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const highPriority = items.filter((item) => item.priority === "high" && !item.purchased).length;

  const isCleared = highPriority === 0;

  return (
    <View
      className="rounded-3xl p-5"
      style={{
        backgroundColor: isDark
          ? isCleared ? "rgba(107,255,143,0.06)" : "rgba(153,65,0,0.12)"
          : isCleared ? "rgba(0,110,47,0.04)" : "rgba(153,65,0,0.06)",
        shadowColor: isDark ? "#000" : "rgba(0,106,45,0.05)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.3 : 1,
        shadowRadius: 16,
        elevation: 2,
      }}
    >
      <View className="flex-row items-center gap-3 mb-3">
        <View
          className="h-10 w-10 rounded-2xl items-center justify-center"
          style={{
            backgroundColor: isCleared
              ? (isDark ? "rgba(107,255,143,0.15)" : "rgba(0,110,47,0.1)")
              : (isDark ? "rgba(255,150,50,0.2)" : "rgba(153,65,0,0.1)"),
          }}
        >
          <FontAwesome6
            name="circle-exclamation"
            size={18}
            color={isCleared ? (isDark ? "#6bff8f" : "#006a2d") : "#994100"}
          />
        </View>
        <View className="flex-1">
          <Text className="text-foreground" style={{ fontSize: 16, fontWeight: "700" }}>
            High priority remaining
          </Text>
          <Text className="text-muted-foreground" style={{ fontSize: 13 }}>
            {isCleared ? "All urgent items cleared!" : "Handle these first for a smoother trip."}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "800",
            color: isCleared ? (isDark ? "#6bff8f" : "#006a2d") : "#994100",
          }}
        >
          {highPriority}
        </Text>
      </View>
    </View>
  );
}
