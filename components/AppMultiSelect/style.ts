import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    gap: 16,
    marginBottom: 8,
  },

  flex: {
    flex: 1,
  },

  label: {
    fontSize: 14,
    color: "#0D0D0D",
    marginBottom: 4,
  },

  dropdown: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  openDropdown: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  disabled: {
    opacity: 0.6,
  },

  placeholder: {
    fontSize: 14,
    color: "#707070",
  },

  chevron: {
    fontSize: 16,
    color: "#8A8A8A",
  },

  menu: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 200,
    backgroundColor: "#FFFFFF",
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },

  optionText: {
    fontSize: 16,
    color: "#000000",
  },

  addMore: {
    backgroundColor: "#F5FBF7",
  },

  addMoreText: {
    color: "#0B6E27",
    fontWeight: "500",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxSelected: {
    backgroundColor: "#0B6E27",
    borderColor: "#28B851",
  },

  check: {
    color: "#FFFFFF",
    fontSize: 12,
  },

  tagWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    flex: 1,
  },

  tag: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: "center",
  },

  tagText: {
    fontSize: 13,
    color: "#3D3D3D",
  },

  tagRemove: {
    marginLeft: 6,
    fontSize: 14,
    color: "#707070",
  },

  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
});
