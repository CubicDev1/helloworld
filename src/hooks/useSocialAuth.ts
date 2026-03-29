import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_github" | "oauth_apple") => {
    if (loadingStrategy) return; // guard against concurrent flows

    setLoadingStrategy(strategy);

    try {
      Alert.alert("Notice", "Social auth requires native Firebase configuration.");
    } catch (error) {
      console.log("💥 Error in social auth:", error);
      Alert.alert("Error", "Failed to sign in. Please try again.");
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;
