import { useState } from "react";
import { Image } from "expo-image";
import { Pressable, Text, View, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { auth } from "@/lib/firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useColorScheme } from "nativewind";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function SignInScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    if (isSignUp && !name) {
      Alert.alert("Error", "Please enter your name.");
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName: name });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.log("💥 Error in auth:", error);
      Alert.alert("Authentication Error", error.message || "Failed to authenticate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <KeyboardAwareScrollView
        bottomOffset={40}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Brand Header */}
        <View
          className="px-6 pt-6 pb-8"
          style={{
            backgroundColor: isDark ? "#0f2818" : "#006a2d",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        >
          <Text
            style={{
              fontSize: 42,
              fontWeight: "900",
              color: isDark ? "#6bff8f" : "#ffffff",
              textAlign: "center",
              letterSpacing: -1,
            }}
          >
            Grocify
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: isDark ? "rgba(107,255,143,0.6)" : "rgba(255,255,255,0.75)",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Plan smarter. Shop happier.
          </Text>

          <View
            className="mt-6 self-center overflow-hidden rounded-3xl"
            style={{
              backgroundColor: isDark ? "rgba(107,255,143,0.08)" : "rgba(255,255,255,0.15)",
              padding: 12,
            }}
          >
            <Image
              source={require("../../../assets/images/auth.png")}
              style={{ width: 260, height: 180 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Form Area */}
        <View className="flex-1 px-6 pt-8 pb-6">
          {/* Badge */}
          <View
            className="self-center rounded-full px-4 py-1.5 mb-2"
            style={{
              backgroundColor: isDark ? "rgba(107,255,143,0.08)" : "rgba(0,110,47,0.06)",
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: "700",
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: isDark ? "#6bff8f" : "#006a2d",
              }}
            >
              {isSignUp ? "Create Account" : "Welcome Back"}
            </Text>
          </View>

          <Text className="text-center text-sm text-muted-foreground mb-6">
            {isSignUp
              ? "Join us to start your personalized grocery experience."
              : "Sign in to jump right into your personalized grocery experience."}
          </Text>

          {/* Input fields */}
          {isSignUp && (
            <View className="mb-4">
              <Text
                className="text-muted-foreground mb-2 ml-1"
                style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" }}
              >
                Full Name
              </Text>
              <TextInput
                placeholder="Your name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                placeholderTextColor={isDark ? "#4a5568" : "#a0aec0"}
                editable={!isLoading}
                className="h-14 rounded-2xl px-4 text-lg text-foreground"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  fontWeight: "500",
                }}
              />
            </View>
          )}

          <View className="mb-4">
            <Text
              className="text-muted-foreground mb-2 ml-1"
              style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" }}
            >
              Email
            </Text>
            <TextInput
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={isDark ? "#4a5568" : "#a0aec0"}
              editable={!isLoading}
              className="h-14 rounded-2xl px-4 text-lg text-foreground"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                fontWeight: "500",
              }}
            />
          </View>

          <View className="mb-6">
            <Text
              className="text-muted-foreground mb-2 ml-1"
              style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" }}
            >
              Password
            </Text>
            <TextInput
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor={isDark ? "#4a5568" : "#a0aec0"}
              editable={!isLoading}
              className="h-14 rounded-2xl px-4 text-lg text-foreground"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                fontWeight: "500",
              }}
            />
          </View>

          {/* Submit Button */}
          <Pressable
            className="rounded-2xl flex-row items-center justify-center gap-2"
            style={{
              height: 56,
              backgroundColor: isLoading
                ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)")
                : (isDark ? "#6bff8f" : "#006a2d"),
              shadowColor: isDark ? "rgba(107,255,143,0.3)" : "rgba(0,106,45,0.25)",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: !isLoading ? 1 : 0,
              shadowRadius: 20,
              elevation: !isLoading ? 6 : 0,
            }}
            disabled={isLoading}
            onPress={handleAuth}
          >
            <FontAwesome6
              name={isSignUp ? "user-plus" : "right-to-bracket"}
              size={16}
              color={isDark ? "#0f172a" : "#ffffff"}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: isDark ? "#0f172a" : "#ffffff",
              }}
            >
              {isLoading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
            </Text>
          </Pressable>

          {/* Toggle */}
          <View className="mt-5 flex-row justify-center">
            <Text className="text-sm text-muted-foreground mr-1">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </Text>
            <Pressable onPress={() => setIsSignUp(!isSignUp)} disabled={isLoading}>
              <Text className="text-sm text-primary" style={{ fontWeight: "700" }}>
                {isSignUp ? "Sign in" : "Sign up"}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
