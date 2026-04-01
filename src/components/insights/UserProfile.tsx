import { useClerk, useUser } from "@/providers/AuthProvider";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useColorScheme } from "nativewind";

const UserProfile = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const email = user?.primaryEmailAddress?.emailAddress;
  const displayName = user?.fullName || email?.split("@")[0];

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
      <View className="flex-row items-center gap-4">
        {/* Avatar */}
        <View
          className="h-14 w-14 rounded-2xl items-center justify-center"
          style={{
            backgroundColor: isDark ? "rgba(107,255,143,0.12)" : "rgba(0,110,47,0.08)",
          }}
        >
          <FontAwesome6
            name="user"
            size={22}
            color={isDark ? "#6bff8f" : "#006a2d"}
          />
        </View>

        <View className="flex-1">
          <Text className="text-foreground" style={{ fontSize: 18, fontWeight: "700" }}>
            {displayName}
          </Text>
          <Text className="text-muted-foreground mt-0.5" style={{ fontSize: 13 }}>
            {email}
          </Text>
        </View>

        {/* Verified badge */}
        <View
          className="h-10 w-10 rounded-full items-center justify-center"
          style={{
            backgroundColor: isDark ? "rgba(107,255,143,0.12)" : "rgba(0,110,47,0.08)",
          }}
        >
          <FontAwesome6
            name="shield-halved"
            size={16}
            color={isDark ? "#6bff8f" : "#006a2d"}
          />
        </View>
      </View>

      {/* Logout */}
      <Pressable
        onPress={() => signOut()}
        className="mt-4 flex-row items-center justify-center gap-2 rounded-2xl py-3"
        style={{
          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
        }}
      >
        <FontAwesome6
          name="right-from-bracket"
          size={13}
          color={isDark ? "#94a3b8" : "#64748b"}
        />
        <Text
          className="text-muted-foreground"
          style={{ fontSize: 14, fontWeight: "600" }}
        >
          Sign out
        </Text>
      </Pressable>
    </View>
  );
};

export default UserProfile;
