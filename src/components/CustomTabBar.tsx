import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      style={{
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? insets.bottom + 10 : 20,
        left: 20,
        right: 20,
        height: 64,
        flexDirection: 'row',
        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.9)',
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 1,
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

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
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = "";
        let isFA6 = false;
        
        if (route.name === 'index') {
          iconName = isFocused ? "list-alt" : "list-ul";
        } else if (route.name === 'planner') {
          iconName = isFocused ? "plus-circle" : "plus";
        } else if (route.name === 'insights') {
          iconName = "chart-simple";
          isFA6 = true;
        }

        const tintColor = isFocused 
          ? (isDark ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)")
          : (isDark ? "#94a3b8" : "#64748b");

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className={`items-center justify-center p-2 rounded-full h-12 w-16 ${isFocused ? 'bg-primary/10 dark:bg-primary/20' : ''}`}
            activeOpacity={0.7}
          >
            {isFA6 ? (
              <FontAwesome6 name={iconName as any} size={22} color={tintColor} />
            ) : (
              <FontAwesome name={iconName as any} size={24} color={tintColor} />
            )}
            {isFocused && (
              <View 
                style={{ 
                  width: 4, 
                  height: 4, 
                  borderRadius: 2, 
                  backgroundColor: tintColor, 
                  position: 'absolute', 
                  bottom: 2 
                }} 
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
