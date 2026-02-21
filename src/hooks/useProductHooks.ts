import { useEffect, useState, useCallback, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { getProducts } from "../service/productService";
import { Product } from "../types/product";

const STORAGE_KEY = "PRODUCTS_CACHE";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  // Use a ref so fetchFromAPI always sees the latest products count
  // without needing to be in its dependency array
  const productsRef = useRef<Product[]>([]);

  const loadFromCache = async () => {
    try {
      const cached = await AsyncStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed: Product[] = JSON.parse(cached);
        setProducts(parsed);
        productsRef.current = parsed;
      }
    } catch {
      // Cache read failed silently — app will fall back to API or empty state
    }
  };

  const fetchFromAPI = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      productsRef.current = data;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setError(null);
    } catch {
      // Only show error if there's nothing cached to display
      if (productsRef.current.length === 0) {
        setError(
          "Unable to fetch data. Please check your connection and try again.",
        );
      }
    }
  };

  const initialize = async () => {
    setLoading(true);

    try {
      const netState = await NetInfo.fetch();
      // Use !== true to safely handle null/undefined/"unknown" on real devices
      const offline = netState.isConnected !== true;
      setIsOffline(offline);

      await loadFromCache();

      if (!offline) {
        await fetchFromAPI();
      }
    } catch {
      setError("Something went wrong during initialization.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    try {
      const netState = await NetInfo.fetch();
      const offline = netState.isConnected !== true;

      if (offline) {
        setIsOffline(true);
        return;
      }

      setIsOffline(false);
      setRefreshing(true);
      await fetchFromAPI();
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // Use !== true to safely handle null/string values on Android real devices
      const offline = state.isConnected !== true;
      setIsOffline(offline);
    });

    initialize();

    return () => unsubscribe();
  }, []);

  return {
    products,
    loading,
    refreshing,
    error,
    isOffline,
    onRefresh,
  };
};
