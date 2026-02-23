import { colors } from "@/utils/colors";
import { hp, normalizeFont, pxToHp, pxToWp, wp } from "@/utils/responsive";
import { Spacing } from "@/utils/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white.w1,
   
    minHeight: hp(pxToHp(100)),
  },

  // Loading State
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white.w1 + "B3", // semi-transparent white
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
  },

  spinner: {
    marginBottom: Spacing.MediumLarge,
  },

  loadingText: {
    fontSize: 16,
    color: colors.black.b30,
    fontFamily: "Medium",
    fontWeight: "500",
  },

  // Empty State
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
    display: "flex",
  },

  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black.b05,
    textAlign: "center",
    marginBottom: Spacing.Medium,
    fontFamily: "Bold",
  },

  emptyStateDescription: {
    fontSize: 14,
    color: colors.black.b40,
    textAlign: "center",
    marginBottom: Spacing.MediumLarge,
    lineHeight: hp(pxToHp(20)),
  },

  // Header Text
  headerText: {
    fontSize: 14,
    color: colors.black.b40,
  marginBottom: Spacing.MediumLarge,
    lineHeight: hp(pxToHp(20)),
  },

  // Notes List Container
  notesListContainer: {
    gap: Spacing.XLarge,
    marginBottom: Spacing.XLarge,
  },

  // Note Section
  noteSection: {
    marginBottom: Spacing.Large,
  },

  noteSectionTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.black.b40,
    fontFamily: "Medium",
    marginBottom: Spacing.SmallMedium,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Note Card
  noteCard: {
    borderWidth: 1,
    borderColor: colors.black.b90,
    borderRadius: 12,
    backgroundColor: colors.white.w1,
    paddingHorizontal: Spacing.Medium,
    paddingVertical: Spacing.Medium,
  },

  // Note Text
  noteText: {
    fontSize: 14,
    color: colors.black.b10,
    lineHeight: hp(pxToHp(22)),
    fontFamily: "Regular",
  },

  noteTextWithSpacing: {
    marginBottom: Spacing.Medium,
  },
});
