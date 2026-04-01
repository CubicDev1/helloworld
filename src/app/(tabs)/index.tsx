import PendingItemCard from "@/components/list/PendingItemCard";
import { useGroceryStore } from "@/store/grocery-store";
import { FlatList, Text, View, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";

import CompletedItems from "@/components/list/CompletedItems";
import ListHeroCard from "@/components/list/ListHeroCard";
import TabScreenBackground from "@/components/TabScreenBackground";
import QuickAddModal from "@/components/list/QuickAddModal";
import VoiceAddModal from "@/components/list/VoiceAddModal";

export default function ListScreen() {
  const { items } = useGroceryStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [voiceVisible, setVoiceVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const pendingItems = items.filter((item) => !item.purchased);
  const bottomPosition = Platform.OS === 'ios' ? insets.bottom + 90 : 100;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        className="flex-1 bg-background"
        data={pendingItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PendingItemCard item={item} />}
        contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 180 }}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={
          <View style={{ gap: 20, paddingTop: 16 }}>
            <TabScreenBackground />
            <ListHeroCard />
            {/* Section label — editorial magazine style */}
            <View className="flex-row items-center justify-between px-1 mt-2">
              <Text
                className="text-muted-foreground"
                style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase" }}
              >
                Shopping Items
              </Text>
              <FontAwesome6
                name="sliders"
                size={14}
                color={isDark ? "#475569" : "#94a3b8"}
              />
            </View>
          </View>
        }
        ListFooterComponent={<CompletedItems />}
      />

      {/* Voice Mic FAB — ghost style */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: bottomPosition + 76,
          right: 24,
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)",
          shadowColor: isDark ? "#000" : "rgba(0,106,45,0.1)",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDark ? 0.4 : 1,
          shadowRadius: 16,
          elevation: 6,
          borderWidth: 1,
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
        }}
        activeOpacity={0.8}
        onPress={() => setVoiceVisible(true)}
      >
        <FontAwesome6 name="microphone" size={18} color={isDark ? "#6bff8f" : "#006a2d"} />
      </TouchableOpacity>

      {/* Primary Plus FAB — deep green with green-tinted shadow */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: bottomPosition,
          right: 20,
          width: 64,
          height: 64,
          borderRadius: 32,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDark ? "#6bff8f" : "#006a2d",
          shadowColor: isDark ? "rgba(107,255,143,0.35)" : "rgba(0,106,45,0.3)",
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 1,
          shadowRadius: 24,
          elevation: 10,
        }}
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome6 name="plus" size={24} color={isDark ? "#0f172a" : "#ffffff"} />
      </TouchableOpacity>

      <QuickAddModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <VoiceAddModal visible={voiceVisible} onClose={() => setVoiceVisible(false)} />
    </View>
  );
}
