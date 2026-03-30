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

export default function ListScreen() {
  const { items } = useGroceryStore();
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const pendingItems = items.filter((item) => !item.purchased);

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

      {/* FAB (Floating Add Button) */}
      <TouchableOpacity 
        style={{
          position: "absolute",
          bottom: Platform.OS === 'ios' ? insets.bottom + 90 : 100,
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
    </View>
  );
}
