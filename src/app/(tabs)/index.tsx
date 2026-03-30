import PendingItemCard from "@/components/list/PendingItemCard";
import { useGroceryStore } from "@/store/grocery-store";
import { FlatList, Text, View, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  const pendingItems = items.filter((item) => !item.purchased);

  const bottomPosition = Platform.OS === 'ios' ? insets.bottom + 90 : 100;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        className="flex-1 bg-background"
        data={pendingItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PendingItemCard item={item} />}
        contentContainerStyle={{ padding: 20, gap: 14, paddingBottom: 160 }}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={
          <View style={{ gap: 14, paddingTop: 20 }}>
            <TabScreenBackground />
            <ListHeroCard />
            <View className="flex-row items-center justify-between px-1">
              <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
                Shopping items
              </Text>
              <Text className="text-sm text-muted-foreground">{pendingItems.length} active</Text>
            </View>
          </View>
        }
        ListFooterComponent={<CompletedItems />}
      />

      {/* Secondary FAB (Voice Smart Add) */}
      <TouchableOpacity 
        style={{
          position: "absolute",
          bottom: bottomPosition + 76,
          right: 24,
          width: 52,
          height: 52,
          borderRadius: 26,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 8,
        }}
        className="bg-card dark:bg-card border border-border"
        activeOpacity={0.8}
        onPress={() => setVoiceVisible(true)}
      >
        <FontAwesome name="microphone" size={22} className="text-foreground" color="#10b981" />
      </TouchableOpacity>

      {/* Primary FAB (Quick Add) */}
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
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.35,
          shadowRadius: 8,
          elevation: 10,
        }}
        className="bg-primary dark:bg-primary"
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <QuickAddModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <VoiceAddModal visible={voiceVisible} onClose={() => setVoiceVisible(false)} />
    </View>
  );
}
