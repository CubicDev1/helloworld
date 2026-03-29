import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

const SSOCallbackScreen = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return <Redirect href={"/(auth)/sign-in"} />;
};

export default SSOCallbackScreen;
