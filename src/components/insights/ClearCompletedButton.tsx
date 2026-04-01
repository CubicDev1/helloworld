import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useColorScheme } from "nativewind";

export default function ClearCompletedButton() {
  const { clearPurchased } = useGroceryStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Pressable
      className="rounded-2xl py-4 flex-row items-center justify-center gap-2"
      style={{
        backgroundColor: isDark ? "#6bff8f" : "#006a2d",
        shadowColor: isDark ? "rgba(107,255,143,0.3)" : "rgba(0,106,45,0.25)",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 6,
      }}
      onPress={clearPurchased}
    >
      <FontAwesome6 name="broom" size={15} color={isDark ? "#0f172a" : "#ffffff"} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: isDark ? "#0f172a" : "#ffffff",
        }}
      >
        Clear completed items
      </Text>
    </Pressable>
  );
}
