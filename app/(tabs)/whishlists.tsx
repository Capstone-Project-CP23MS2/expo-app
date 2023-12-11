import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import categories from "@/components/ExploreHeader/categories";

type Props = {};

const Page = (props: Props) => {
  return (
    <View>
      {/* TODO */}
      <Text>Page</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ columnGap: 16 }}
        horizontal
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
