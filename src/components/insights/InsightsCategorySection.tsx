import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";

const categoryIcons: Record<string, string> = {
  Produce: "leaf",
  Dairy: "droplet",
  Bakery: "bread-slice",
  Pantry: "jar",
  Snacks: "cookie-bite",
};

const categoryColors: Record<string, string> = {
  Produce: "#22c55e",
  Dairy: "#38bdf8",
  Bakery: "#f59e0b",
  Pantry: "#a78bfa",
  Snacks: "#f472b6",
};

export default function InsightsCategorySection() {
  const { items } = useGroceryStore();
  const total = items.length;
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const categories = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});
  const categoryEntries = Object.entries(categories).sort((a, b) => b[1] - a[1]);

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
      <Text
        className="text-muted-foreground mb-4"
        style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase" }}
      >
        Items by Category
      </Text>

      {categoryEntries.map(([category, count]) => {
        const widthPercent = total ? Math.max(12, Math.round((count / total) * 100)) : 12;
        const color = categoryColors[category] ?? "#22c55e";
        const icon = categoryIcons[category] ?? "tag";
        return (
          <View key={category} className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <View
                  className="h-7 w-7 rounded-lg items-center justify-center"
                  style={{ backgroundColor: color + "20" }}
                >
                  <FontAwesome6 name={icon as any} size={12} color={color} />
                </View>
                <Text className="text-foreground" style={{ fontSize: 15, fontWeight: "600" }}>
                  {category}
                </Text>
              </View>
              <Text className="text-muted-foreground" style={{ fontSize: 14, fontWeight: "500" }}>
                {count} {count === 1 ? "item" : "items"}
              </Text>
            </View>
            <View className="h-2 rounded-full bg-secondary overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: color,
                }}
              />
            </View>
          </View>
        );
      })}

      {categoryEntries.length === 0 && (
        <View className="rounded-2xl bg-muted px-4 py-4">
          <Text className="text-sm text-muted-foreground text-center">
            Add items to reveal your category mix.
          </Text>
        </View>
      )}
    </View>
  );
}
