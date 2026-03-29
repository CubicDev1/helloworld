import React, { useState } from "react";
import { FlatList, Text, View, Pressable, Share } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

import PendingItemCard from "@/components/list/PendingItemCard";
import CompletedItems from "@/components/list/CompletedItems";
import ListHeroCard from "@/components/list/ListHeroCard";
import TabScreenBackground from "@/components/TabScreenBackground";
import SmartAddModal from "@/components/list/SmartAddModal";
import { useGroceryStore } from "@/store/grocery-store";

export default function ListScreen() {
  const { items } = useGroceryStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const pendingItems = items.filter((item) => !item.purchased);

  const handleShareList = async () => {
    if (pendingItems.length === 0) return;
    
    const formattedItems = pendingItems
      .map((item) => `☐ ${item.name} — ${item.quantity}`)
      .join("\n");
      
    const message = `🛒 Grocify Shopping List\n\n${formattedItems}\n\nShared via Grocify`;
    
    try {
      await Share.share({ message });
    } catch (error) {
      console.log("Error sharing list", error);
    }
  };

  return (
    <View className="flex-1">
      <FlatList
        className="flex-1 bg-background"
        data={pendingItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PendingItemCard item={item} />}
        contentContainerStyle={{ padding: 20, paddingBottom: 100, gap: 14 }}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={
          <View style={{ gap: 14, paddingTop: 20 }}>
            <TabScreenBackground />
            <ListHeroCard />
            <View className="flex-row items-center justify-between px-1">
              <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
                Shopping items
              </Text>
              
              <View className="flex-row items-center gap-4">
                <Text className="text-sm font-medium text-muted-foreground">
                  {pendingItems.length} active
                </Text>
                {pendingItems.length > 0 && (
                  <Pressable 
                    onPress={handleShareList}
                    className="h-8 w-8 items-center justify-center rounded-full bg-primary/10"
                  >
                    <FontAwesome6 name="share-nodes" size={14} color="#208AEF" />
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        }
        ListFooterComponent={<CompletedItems />}
      />

      <SmartAddModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />

      <Pressable
        onPress={() => setIsModalVisible(true)}
        className="absolute bottom-6 right-6 h-16 w-16 items-center justify-center rounded-full bg-primary shadow-xl"
        style={{ elevation: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4.65 }}
      >
        <FontAwesome6 name="plus" size={24} color="#FFF" />
      </Pressable>
    </View>
  );
}
