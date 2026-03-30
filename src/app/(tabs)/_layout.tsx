import { useGroceryStore } from "@/store/grocery-store";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { CustomTabBar } from "@/components/CustomTabBar";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { loadItems } = useGroceryStore();

  useEffect(() => {
    if (isSignedIn) {
      loadItems();
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs 
      tabBar={(props) => <CustomTabBar {...props} />} 
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'List' }} />
      <Tabs.Screen name="planner" options={{ title: 'Planner' }} />
      <Tabs.Screen name="insights" options={{ title: 'Insights' }} />
    </Tabs>
  );
}
