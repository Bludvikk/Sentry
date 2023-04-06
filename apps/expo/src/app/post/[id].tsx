import { SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "../../utils/api";

const Post: React.FC = () => {
  const { id } = useSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.post.byId.useQuery({ id });

  if (!data) return <SplashScreen />;

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: data.locationCode }} />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-white">{data.grossSales}</Text>
        <Text className="py-4 text-white">{data.netSales}</Text>
        <Text className="py-4 text-white">{data.profitTotal}</Text>
        <Text className="py-4 text-white">{data.returnTotal}</Text>
        <Text className="py-4 text-white">{data.voidTotal}</Text>

      </View>
    </SafeAreaView>
  );
};

export default Post;
