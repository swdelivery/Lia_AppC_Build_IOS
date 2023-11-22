import React from "react";
import Text from "@Components/Text";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SuggestionsProvidedProps } from "react-native-controlled-mentions";

const users = [
  {
    id: "1",
    name: "ChatGPT",
  },
];

const usersInfo = [
  {
    id: "1",
    avatar: "../../Icon/upload2.png",
    description: "Trò chuyện với AI",
    syntax: "@ChatGPT",
    userId: "1",
  },
];

type Props = SuggestionsProvidedProps & {
  //
};

export default function Suggestions({ keyword, onSelect }: Props) {
  if (keyword == null) {
    return null;
  }

  return (
    <ScrollView style={styles.suggestionsContainer}>
      {users
        .filter((one) =>
          one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
        )
        .map((one) => {
          let fnInfo = usersInfo.find((f) => f.userId == one.id);
          return (
            <TouchableOpacity
              key={one.id}
              onPress={() => onSelect(one)}
              style={{ padding: 12 }}
            >
              <View style={styles.suggestion}>
                <Text>{fnInfo.description}</Text>
                <Text style={styles.syntax}>{fnInfo.syntax}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  suggestionsContainer: {
    position: "absolute",
    // top: -100,
    bottom: 56,
    maxHeight: 200,
    width: "100%",
    backgroundColor: "white",
    zIndex: 1000,
    opacity: 0.95,
  },
  suggestion: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  syntax: {
    color: "blue",
    paddingLeft: 6,
  },
});
