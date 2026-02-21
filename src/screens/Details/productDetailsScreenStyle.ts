import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
  },

  imageWrapper: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  mainImage: {
    width: width * 0.8,
    height: 280,
    resizeMode: "contain",
  },

  thumbnailRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  thumbnailContainer: {
    backgroundColor: "#f3f4f6",
    padding: 6,
    borderRadius: 12,
    marginRight: 10,
  },

  thumbnail: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#111",
    letterSpacing: 0.4,
  },
  price: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    color: "#111",
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginTop: 8,
    color: "#111",
    letterSpacing: 0.4,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 14,
  },
  description: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#000000",
    lineHeight: 20,
  },
  readMore: {
    marginTop: 6,
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#111",
  },
  ratingLabel: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  ratingCount: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#666",
  },

  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  cartButton: {
    backgroundColor: "#000",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  cartText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});

export default styles;
