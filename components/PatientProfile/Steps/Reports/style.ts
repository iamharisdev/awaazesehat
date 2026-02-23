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
    fontSize: normalizeFont(16),
    color: colors.black.b30,
    fontFamily: "Medium",
    fontWeight: "500",
  },

  // Error State
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(pxToHp(240)),
  },

  errorText: {
    fontSize: normalizeFont(16),
    color: colors.red.r40,
    fontFamily: "Medium",
    fontWeight: "500",
  },

  // Header Text
  headerText: {
    fontSize: 14,
    color: colors.black.b40,
    marginBottom: Spacing.Medium,
    lineHeight: hp(pxToHp(20)),
  },

  // Empty State
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Spacing.XLarge,
    display: "flex",
  },

  emptyStateTitle: {
    fontSize: normalizeFont(18),
    fontWeight: "600",
    color: colors.black.b05,
    textAlign: "center",
    marginBottom: Spacing.Medium,
    fontFamily: "Bold",
  },

  emptyStateDescription: {
    fontSize: normalizeFont(14),
    color: colors.black.b40,
    textAlign: "center",
    marginBottom: Spacing.MediumLarge,
    paddingHorizontal: Spacing.Medium,
    lineHeight: hp(pxToHp(20)),
  },

  // Sections Container
  sectionsContainer: {
    marginTop: Spacing.Medium,
    marginBottom: Spacing.XLarge,
  },

  section: {
    marginBottom: Spacing.XLarge,
  },

  sectionTitle: {
    fontSize: 12,
    color: colors.black.b40,
    fontWeight: "500",
    fontFamily: "Medium",
    marginBottom: Spacing.SmallMedium,
   
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Reports Grid
  reportsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.Medium,
    justifyContent: "space-between",
  },

  reportCard: {
    flex: 1,
    minWidth: wp(45),
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.SmallMedium,
    borderWidth: 1,
    borderColor: colors.black.b80,
    borderRadius: 12,
    paddingHorizontal: Spacing.Medium,
    paddingVertical: Spacing.Medium,
    backgroundColor: colors.white.w1,
  },

  // Icon Container
  iconContainer: {
    width: wp(pxToWp(40)),
    height: hp(pxToHp(40)),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.green.g90,
  },

  pdfIcon: {
    fontSize: normalizeFont(24),
  },

  // Report Info
  reportInfo: {
    flex: 1,
    justifyContent: "center",
  },

  reportName: {
    fontSize: normalizeFont(14),
    fontWeight: "600",
    color: colors.black.b05,
    marginBottom: Spacing["2XSmall"],
    fontFamily: "Medium",
  },

  reportDate: {
    fontSize: normalizeFont(12),
    color: colors.black.b50,
    fontFamily: "Regular",
  },
});
