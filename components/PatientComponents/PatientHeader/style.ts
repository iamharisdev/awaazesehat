import { colors } from '@/utils/colors';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily:"Medium",
    color: colors.black.b05,
  },
  sub: {
    fontSize: 14,
    color: colors.black.b40,
    fontFamily:"Regular",
    marginTop: 2,
  },
});
