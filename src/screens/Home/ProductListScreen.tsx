import React, { useMemo, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useProducts } from "../../hooks/useProductHooks";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../types/product";
import CustomHeader from "../../components/CustomHeader";
import { Ionicons, Feather } from "@expo/vector-icons";

type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { product: Product };
};

type Props = NativeStackScreenProps<RootStackParamList, "ProductList">;

const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const { products, loading, refreshing, isOffline, onRefresh } = useProducts();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <>
      <CustomHeader value={search} onChange={setSearch} />
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <View>
            <Text style={styles.title}>Products</Text>
            <Text style={styles.subtitle}>
              {filtered.length} products found
            </Text>
          </View>

          <View style={styles.iconRow}>
            <Ionicons name="swap-vertical-outline" size={22} color="#000000" />
            <Feather
              name="filter"
              size={22}
              color="#000000"
              style={{ marginLeft: 14 }}
            />
          </View>
        </View>
        {isOffline && (
          <View style={styles.offlineBanner}>
            <Text style={styles.offlineText}>You are offline</Text>
          </View>
        )}
        <FlatList
          data={filtered}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate("ProductDetails", { product: item })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    // borderWidth: 1,
    paddingHorizontal: 6,
  },

  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
    paddingHorizontal: 13,
  },

  title: {
    fontSize: 34,
    fontFamily: "Inter_600SemiBold",
    color: "#000000",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#000000",
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  offlineBanner: {
    backgroundColor: "#fde68a",
    padding: 10,
    alignItems: "center",
  },
  offlineText: {
    color: "#92400e",
    fontFamily: "Inter_500Medium",
  },
});
