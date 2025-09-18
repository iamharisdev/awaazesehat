import { colors } from '@/utils/colors';
import { StyleSheet } from 'react-native';

export 
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  tab: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  active: {
    borderBottomWidth: 2,
    borderColor: colors.black.b20,
  },
  activeStyle: {
    color: colors.black.b05,
    fontWeight: "500",
    fontFamily: "Medium",
  },
  label: {
    fontSize: 14,
    fontFamily: "Regular",
    color: colors.black.b40,
  },
});
