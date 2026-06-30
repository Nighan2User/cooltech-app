import { useState } from "react";
import { Alert, Linking, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export default function HelpSupport() {
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I add products to my store?",
      answer: "Go to the Products tab and tap the '+' button. Fill in the product details, upload images, and set your rental pricing.",
    },
    {
      id: "2",
      question: "When will I receive my payouts?",
      answer: "Payouts are processed every Monday for the previous week's completed bookings. Funds typically arrive in 2-3 business days.",
    },
    {
      id: "3",
      question: "How do I handle rental returns?",
      answer: "When a customer returns equipment, mark the booking as completed in the Requests tab. Inspect the equipment and report any damage through the app.",
    },
    {
      id: "4",
      question: "What if a customer damages my equipment?",
      answer: "Report damage through the booking details screen. Our team will review and process insurance claims within 48 hours.",
    },
    {
      id: "5",
      question: "How can I improve my store rating?",
      answer: "Maintain equipment in good condition, respond quickly to inquiries, be flexible with pickup/return times, and provide excellent customer service.",
    },
  ];

  const contactOptions = [
    {
      icon: "mail-outline" as const,
      label: "Email Support",
      value: "vendor@cooltech.com",
      action: () => handleEmail(),
    },
    {
      icon: "call-outline" as const,
      label: "Phone Support",
      value: "+1 (800) 555-0123",
      action: () => handleCall(),
    },
    {
      icon: "chatbubble-outline" as const,
      label: "Live Chat",
      value: "Available 9 AM - 6 PM",
      action: () => handleChat(),
    },
  ];

  const handleEmail = () => {
    Linking.openURL("mailto:vendor@cooltech.com");
  };

  const handleCall = () => {
    Linking.openURL("tel:+18005550123");
  };

  const handleChat = () => {
    if (Platform.OS === "web") {
      alert("Opening live chat...");
    } else {
      Alert.alert("Live Chat", "Opening live chat...");
    }
  };

  const handleSubmitMessage = () => {
    if (!message.trim()) {
      if (Platform.OS === "web") {
        alert("Please enter a message");
      } else {
        Alert.alert("Error", "Please enter a message");
      }
      return;
    }

    if (Platform.OS === "web") {
      alert("Message sent! We'll respond within 24 hours.");
    } else {
      Alert.alert("Success", "Message sent! We'll respond within 24 hours.");
    }
    setMessage("");
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-3">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text className="flex-1 text-xl font-bold text-secondary">Help & Support</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Contact Options */}
        <Text className="mb-3 text-base font-semibold text-secondary">Contact Us</Text>
        
        {contactOptions.map((option, index) => (
          <Pressable
            key={option.label}
            onPress={option.action}
            className="mb-3 flex-row items-center rounded-2xl bg-white p-4 shadow-sm"
            style={{ elevation: 1 }}
          >
            <View className="h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Ionicons name={option.icon} size={22} color="#2563EB" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-base font-semibold text-secondary">{option.label}</Text>
              <Text className="text-sm text-muted">{option.value}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </Pressable>
        ))}

        {/* Send Message */}
        <View className="my-6 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          <Text className="mb-3 text-base font-semibold text-secondary">Send us a Message</Text>
          
          <TextInput
            value={message}
            onChangeText={setMessage}
            className="mb-3 min-h-[120px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-secondary"
            placeholder="Describe your issue or question..."
            multiline
            textAlignVertical="top"
          />

          <Pressable
            onPress={handleSubmitMessage}
            className="rounded-xl bg-primary py-3"
          >
            <Text className="text-center text-base font-semibold text-white">Send Message</Text>
          </Pressable>
        </View>

        {/* FAQs */}
        <Text className="mb-3 text-base font-semibold text-secondary">Frequently Asked Questions</Text>

        {faqs.map((faq) => (
          <Pressable
            key={faq.id}
            onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
            className="mb-3 rounded-2xl bg-white p-4 shadow-sm"
            style={{ elevation: 1 }}
          >
            <View className="flex-row items-start justify-between">
              <Text className="flex-1 pr-2 text-sm font-semibold text-secondary">{faq.question}</Text>
              <Ionicons
                name={expandedFAQ === faq.id ? "chevron-up" : "chevron-down"}
                size={20}
                color="#64748B"
              />
            </View>
            
            {expandedFAQ === faq.id && (
              <Text className="mt-2 text-sm leading-5 text-muted">{faq.answer}</Text>
            )}
          </Pressable>
        ))}

        {/* Help Center Link */}
        <Pressable
          className="mt-4 flex-row items-center justify-center rounded-2xl border border-slate-300 bg-white py-4"
          style={{ elevation: 1 }}
        >
          <Ionicons name="book-outline" size={20} color="#2563EB" />
          <Text className="ml-2 text-base font-semibold text-primary">Visit Help Center</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
