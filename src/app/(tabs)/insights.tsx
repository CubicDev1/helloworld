import ClearCompletedButton from "@/components/insights/ClearCompletedButton";
import InsightsCategorySection from "@/components/insights/InsightsCategorySection";
import InsightsPrioritySection from "@/components/insights/InsightsPrioritySection";
import InsightsStatsSection from "@/components/insights/InsightsStatsSection";
import SentryFeedbackButton from "@/components/insights/SentryFeedbackButton";
import UserProfile from "@/components/insights/UserProfile";
import TabScreenBackground from "@/components/TabScreenBackground";
import { ScrollView, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const InsightsScreen = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <>
      <ScrollView
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 120 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TabScreenBackground />

        {/* Editorial Header matching the screenshots */}
        <View className="flex-row items-center justify-between mt-3 mb-2">
          <View className="flex-row items-center gap-3">
            <View
              className="h-10 w-10 rounded-2xl items-center justify-center"
              style={{
                backgroundColor: isDark ? "rgba(107,255,143,0.12)" : "rgba(0,110,47,0.08)",
              }}
            >
              <FontAwesome6 name="chart-line" size={16} color={isDark ? "#6bff8f" : "#006a2d"} />
            </View>
            <Text className="text-primary" style={{ fontSize: 22, fontWeight: "800" }}>
              Insights
            </Text>
          </View>
          <View
            className="h-10 w-10 rounded-full items-center justify-center"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
            }}
          >
            <FontAwesome6 name="gear" size={16} color={isDark ? "#64748b" : "#94a3b8"} />
          </View>
        </View>

        <UserProfile />
        <InsightsStatsSection />
        <InsightsCategorySection />
        <InsightsPrioritySection />
        <ClearCompletedButton />
      </ScrollView>

      <SentryFeedbackButton />
    </>
  );
};

export default InsightsScreen;
