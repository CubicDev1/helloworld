import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FontAwesome6 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';

const TAB_ICONS: Record<string, { default: string; selected: string }> = {
  index: { default: "list-check", selected: "list-check" },
  planner: { default: "plus", selected: "plus" },
  insights: { default: "chart-simple", selected: "chart-simple" },
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={{
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? insets.bottom + 8 : 16,
        left: 20,
        right: 20,
        height: 68,
        flexDirection: 'row',
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.88)',
        borderRadius: 34,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        // Glassmorphism — frosted glass via backdrop blur + green-tinted shadow
        shadowColor: isDark ? '#000' : 'rgba(0,106,45,0.08)',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: isDark ? 0.5 : 1,
        shadowRadius: 32,
        elevation: 12,
        // Ghost border
        borderWidth: 1,
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const icons = TAB_ICONS[route.name] || { default: "circle", selected: "circle" };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        const activeColor = isDark ? "#6bff8f" : "#006a2d";
        const inactiveColor = isDark ? "#475569" : "#94a3b8";

        const label = route.name === 'index' ? 'LIST' : route.name.toUpperCase();

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.7}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 6,
              paddingHorizontal: 18,
              borderRadius: 28,
              backgroundColor: isFocused
                ? (isDark ? 'rgba(107,255,143,0.12)' : 'rgba(0,110,47,0.08)')
                : 'transparent',
            }}
          >
            <FontAwesome6
              name={isFocused ? icons.selected : icons.default}
              size={20}
              color={isFocused ? activeColor : inactiveColor}
            />
            {isFocused && (
              <View style={{ marginTop: 4 }}>
                <View
                  style={{
                    fontSize: 9,
                    fontWeight: '700',
                    letterSpacing: 1.2,
                    color: activeColor,
                  }}
                >
                  {/* Use a Text for the label */}
                </View>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
