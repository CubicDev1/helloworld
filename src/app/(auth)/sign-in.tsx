import { useState } from "react";
import { Image } from "expo-image";
import { Pressable, Text, View, TextInput, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "@/lib/firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignInScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <SafeAreaView className="flex-1 bg-primary dark:bg-secondary" edges={["top"]}>
      {/* decorative elements */}
      <View className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-primary/80 dark:bg-background/40" />
      <View className="absolute right-[-74px] top-40 h-72 w-72 rounded-full bg-primary/70 dark:bg-background/35" />

      <View className="px-6 pt-4">
        <Text className="text-center text-5xl font-extrabold tracking-tight text-primary-foreground uppercase font-mono dark:text-foreground">
          Grocify
        </Text>

        <Text className="mt-1 text-center text-[14px] text-primary-foreground/80 dark:text-foreground/75">
          Plan smarter. Shop happier.
        </Text>

        <View className="mt-6 rounded-[30px] border border-white/20 bg-white/10 p-3 mb-2">
          <Image
            source={require("../../../assets/images/auth.png")}
            style={{ width: "100%", height: 230 }}
            contentFit="contain"
          />
        </View>
      </View>

      <View className="mt-4 flex-1 rounded-t-[36px] bg-card px-6 pb-2 pt-6">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="self-center rounded-full bg-secondary px-3 py-1">
            <Text className="text-xs font-semibold uppercase tracking-[1px] text-secondary-foreground">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </Text>
          </View>

          <Text className="mt-2 text-center text-sm leading-6 text-muted-foreground">
            {isSignUp 
              ? "Join us to start your personalized grocery experience."
              : "Sign in to jump right into your personalized grocery experience."}
          </Text>

          <View className="mt-6">
            {isSignUp && (
              <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                className="mb-3 h-14 rounded-2xl border border-border bg-background px-4 text-lg text-foreground"
                placeholderTextColor="#888"
                editable={!isLoading}
              />
            )}

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="mb-3 h-14 rounded-2xl border border-border bg-background px-4 text-lg text-foreground"
              placeholderTextColor="#888"
              editable={!isLoading}
            />

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              className="mb-6 h-14 rounded-2xl border border-border bg-background px-4 text-lg text-foreground"
              placeholderTextColor="#888"
              editable={!isLoading}
            />

            <Pressable
              className={`h-14 flex-row items-center justify-center rounded-2xl border border-foreground bg-foreground px-4 active:opacity-90 ${
                isLoading ? "opacity-70" : ""
              }`}
              disabled={isLoading}
              onPress={handleAuth}
            >
              <Text className="text-lg font-bold text-background">
                {isLoading ? "Please wait..." : (isSignUp ? "Sign Up" : "Sign In")}
              </Text>
            </Pressable>
          </View>

          <View className="mt-4 flex-row justify-center pb-8">
            <Text className="text-sm text-muted-foreground mr-1">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </Text>
            <Pressable onPress={() => setIsSignUp(!isSignUp)} disabled={isLoading}>
              <Text className="text-sm font-bold text-foreground">
                {isSignUp ? "Sign in" : "Sign up"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
