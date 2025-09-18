import { colors } from '@/utils/colors';
import { StyleSheet } from 'react-native';

export 
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
  },
  label: {
    fontSize: 12,
    color: colors.black.b40,
    fontFamily:"Regular"
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily:"Medium",
    marginTop: 4,
    color: colors.black.b05,
  },
});

