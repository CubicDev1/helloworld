import React, { useState, useEffect, useMemo } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useGroceryStore, GroceryCategory, GroceryPriority } from '@/store/grocery-store';

type QuickAddModalProps = {
  visible: boolean;
  onClose: () => void;
};

const CATEGORIES: GroceryCategory[] = ["Produce", "Dairy", "Bakery", "Pantry", "Snacks"];
const PRIORITIES: GroceryPriority[] = ["low", "medium", "high"];

// Basic Smart Mappings
const smartCategorize = (text: string): GroceryCategory | null => {
  const t = text.toLowerCase();
  if (t.includes('milk') || t.includes('cheese') || t.includes('butter') || t.includes('yogurt')) return 'Dairy';
  if (t.includes('apple') || t.includes('banana') || t.includes('carrot') || t.includes('onion') || t.includes('fruit') || t.includes('lettuce') || t.includes('tomato')) return 'Produce';
  if (t.includes('bread') || t.includes('cake') || t.includes('croissant') || t.includes('pie') || t.includes('bagel')) return 'Bakery';
  if (t.includes('chip') || t.includes('cookie') || t.includes('candy') || t.includes('chocolate') || t.includes('popcorn') || t.includes('snack')) return 'Snacks';
  if (t.includes('pasta') || t.includes('rice') || t.includes('sauce') || t.includes('oil') || t.includes('flour') || t.includes('sugar') || t.includes('cereal')) return 'Pantry';
  return null;
};

export default function QuickAddModal({ visible, onClose }: QuickAddModalProps) {
  const { items, addItem, isLoading } = useGroceryStore();
  
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState<GroceryCategory>('Produce');
  const [priority, setPriority] = useState<GroceryPriority>('medium');
  
  const [slideAnim] = useState(new Animated.Value(300));

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        bounciness: 8,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(300);
      // reset form
      setName('');
      setQuantity(1);
      setCategory('Produce');
      setPriority('medium');
    }
  }, [visible]);

  // Extract unique previous item names for suggestions
  const previousItemNames = useMemo(() => {
    const names = items.map(i => i.name.trim());
    return Array.from(new Set(names));
  }, [items]);

  const suggestions = useMemo(() => {
    if (name.length < 1) return [];
    return previousItemNames
      .filter(n => n.toLowerCase().includes(name.toLowerCase()) && n.toLowerCase() !== name.toLowerCase())
      .slice(0, 3);
  }, [name, previousItemNames]);

  const handleNameChange = (text: string) => {
    setName(text);
    // Smart Category assignment
    const suggestedCategory = smartCategorize(text);
    if (suggestedCategory) {
      setCategory(suggestedCategory);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setName(suggestion);
    const suggestedCategory = smartCategorize(suggestion);
    if (suggestedCategory) {
      setCategory(suggestedCategory);
    }
  };

  const handleAdd = async () => {
    if (!name.trim()) return;
    await addItem({
      name: name.trim(),
      category,
      quantity,
      priority,
    });
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-end bg-black/60"
      >
        <TouchableOpacity 
          style={{ flex: 1 }} 
          activeOpacity={1} 
          onPress={onClose} 
        />
        
        <Animated.View 
          style={{ transform: [{ translateY: slideAnim }] }}
          className="bg-card rounded-t-3xl pt-2 pb-8 px-6 shadow-2xl"
        >
          {/* Handle */}
          <View className="w-12 h-1.5 bg-muted rounded-full self-center mb-6" />

          {/* Form Content */}
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xl font-bold text-foreground">Quick Add</Text>
            <TouchableOpacity onPress={onClose} className="w-8 h-8 items-center justify-center rounded-full bg-muted">
              <FontAwesome name="times" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Name Input */}
          <View className="mb-4 relative">
            <TextInput
              value={name}
              onChangeText={handleNameChange}
              placeholder="What do you need? (e.g. Milk)"
              placeholderTextColor="#888"
              autoFocus
              className="h-14 bg-background border border-border rounded-xl px-4 text-lg text-foreground font-medium"
            />
            
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <View className="absolute top-16 left-0 right-0 bg-secondary rounded-xl z-50 border border-border shadow-md overflow-hidden">
                {suggestions.map((sug, idx) => (
                  <TouchableOpacity 
                    key={idx} 
                    className={`py-3 px-4 ${idx !== suggestions.length -1 ? 'border-b border-border' : ''}`}
                    onPress={() => selectSuggestion(sug)}
                  >
                    <Text className="text-secondary-foreground font-medium">{sug}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Quantity Controls */}
          <View className="flex-row items-center justify-between mb-5 bg-background p-3 rounded-xl border border-border">
            <Text className="text-base font-semibold text-foreground">Quantity</Text>
            <View className="flex-row items-center">
              <TouchableOpacity 
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-secondary items-center justify-center active:bg-muted"
              >
                <FontAwesome name="minus" size={14} color="#555" />
              </TouchableOpacity>
              <Text className="mx-5 text-xl font-bold text-foreground">{quantity}</Text>
              <TouchableOpacity 
                onPress={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-primary items-center justify-center active:opacity-80"
              >
                <FontAwesome name="plus" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Category */}
          <Text className="text-sm font-semibold text-muted-foreground mb-2 ml-1">Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
            {CATEGORIES.map(cat => (
              <TouchableOpacity 
                key={cat}
                onPress={() => setCategory(cat)}
                className={`py-2 px-4 rounded-full mr-2 border ${category === cat ? 'bg-primary border-primary' : 'bg-background border-border'}`}
              >
                <Text className={`font-semibold ${category === cat ? 'text-primary-foreground' : 'text-foreground'}`}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Priority */}
          <Text className="text-sm font-semibold text-muted-foreground mb-2 ml-1">Priority</Text>
          <View className="flex-row mb-6">
            {PRIORITIES.map(pri => (
              <TouchableOpacity 
                key={pri}
                onPress={() => setPriority(pri)}
                className={`flex-1 py-2 items-center rounded-lg mx-1 border ${
                  priority === pri 
                    ? (pri === 'high' ? 'bg-destructive border-destructive' : pri === 'medium' ? 'bg-orange-500 border-orange-500' : 'bg-blue-500 border-blue-500') 
                    : 'bg-background border-border'
                }`}
              >
                <Text className={`font-bold uppercase text-xs tracking-wider ${priority === pri ? 'text-white' : 'text-foreground'}`}>
                  {pri}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Submit */}
          <TouchableOpacity 
            onPress={handleAdd}
            disabled={!name.trim() || isLoading}
            className={`h-14 rounded-2xl items-center justify-center flex-row ${!name.trim() || isLoading ? 'bg-muted' : 'bg-primary'}`}
          >
            {isLoading ? (
              <Text className="text-lg font-bold text-white">Adding...</Text>
            ) : (
              <>
                <FontAwesome name="plus" size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text className="text-lg font-bold text-white">Add Item</Text>
              </>
            )}
          </TouchableOpacity>
          
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
