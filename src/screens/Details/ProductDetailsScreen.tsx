import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Product } from "../../types/product";
import styles from "./productDetailsScreenStyle";

type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { product: Product };
};

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params;
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const capitalizeFirstLetter = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="#111" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Entypo
              name={liked ? "heart" : "heart-outlined"}
              size={26}
              color={liked ? "#ff4d4f" : "#000000"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: product.image }} style={styles.mainImage} />
          </View>

          <View style={styles.thumbnailRow}>
            {[1, 2, 3, 4].map((item) => (
              <View key={item} style={styles.thumbnailContainer}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.thumbnail}
                />
              </View>
            ))}
          </View>

          <View style={styles.brandRow}>
            <Text style={styles.brand}>
              {capitalizeFirstLetter(product.category)}
            </Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>

          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.separator} />

          <Text
            numberOfLines={expanded ? undefined : 4}
            style={styles.description}
          >
            {product.description}
          </Text>

          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.readMore}>
              {expanded ? "Read less" : "Read more"}
            </Text>
          </TouchableOpacity>
          <View style={styles.separator} />

          <View>
            <Text style={styles.ratingLabel}>Rating</Text>

            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={
                    star <= Math.round(product.rating.rate)
                      ? "star"
                      : "star-outline"
                  }
                  size={18}
                  color="#f5b50a"
                />
              ))}

              <Text style={styles.ratingCount}>({product.rating.count})</Text>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
