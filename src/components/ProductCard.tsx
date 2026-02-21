import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Product } from "../types/product";

interface Props {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
  const [liked, setLiked] = useState(false);

  const brand = product.title.split(" ")[0];

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
      testID={`product-${product.id}`}
    >
      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => setLiked(!liked)}
        activeOpacity={0.7}
      >
        <Entypo
          name={liked ? "heart" : "heart-outlined"}
          size={26}
          color={liked ? "#ff4d4f" : "#000000"}
        />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>

      <Text style={styles.brand}>{brand}</Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
        {product.description}
      </Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 14,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  title: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    color: "#000",
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#000000",
    marginTop: 7,
    letterSpacing: 0.4,
  },
  likeButton: {
    position: "absolute",
    top: 3,
    right: 10,
    backgroundColor: "#f9fafb",
    padding: 6,
  },

  imageContainer: {
    height: 120,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  image: {
    height: 100,
    width: "80%",
    resizeMode: "contain",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  ratingText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#666",
    marginLeft: 4,
  },
  brand: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#000000",
    marginTop: 8,
  },
  description: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#7C7A7A",
    marginTop: 4,
    lineHeight: 18,
  },
});
