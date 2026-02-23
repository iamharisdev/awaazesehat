# AI Coding Agent Instructions for Awaaz-e-Sehat App

## Project Overview
Awaaz-e-Sehat is a React Native healthcare app built with Expo SDK 53, targeting iOS/Android/Web. It manages patient health records, EMR data, and provides voice-based interactions for Urdu-speaking users.

## Architecture & Tech Stack
- **Framework**: React Native 0.79.5 with Expo Router for file-based navigation
- **State Management**: Redux Toolkit + RTK Query, persisted with AsyncStorage
- **Forms**: Formik + Yup validation schemas
- **Styling**: Custom responsive system (hp/wp/normalizeFont), structured color palette
- **Internationalization**: i18next with English/Urdu locales
- **Audio**: Expo AV for recording/playback, microphone permissions configured

## Key Patterns & Conventions

### Component Structure
- Components organized in `components/` with `index.tsx` and `style.ts` per component
- Export all components from `components/index.ts` for clean imports
- Example: `components/Button/index.tsx` + `components/Button/style.ts`

### Styling System
- Use responsive helpers: `hp(pxToHp(48))` for heights, `normalizeFont(15)` for fonts
- Color palette: `colors.green.g20` (green shades g90-g05), `colors.white.w1`, etc.
- Spacing: `Spacing.SmallMedium`, `Spacing.Medium2` from `utils/spacing.ts`
- Always use `StyleSheet.create()` in style.ts files

### State Management
- Auth slice: `token`, `name`, `statusBar` (persisted)
- Patient slice: patient-related state
- API calls via RTK Query with automatic Bearer token injection
- Base URL: `http://192.168.18.84:8000/` (dev environment)

### Navigation
- File-based routing: `(auth)/` group for login/signup, `(tabs)/` for main app
- Tabs: Home, Search, Patients, Activity (configured in `utils/Json.ts`)
- Authentication guards in `app/_layout.tsx` redirect based on token presence

### Forms & Validation
- Formik for form state, Yup schemas in `schemas/validations.ts`
- Patient forms: name, husbandName, cnic (13 digits), age, phone (10 digits), pregnancy weeks/days
- Helper: `removeCountryCode()` for phone number processing

### Assets & Media
- SVGs: Custom transformer configured in `metro.config.js`
- Fonts: Roboto variants loaded in `app/_layout.tsx`
- Audio: Expo AV for recording/playback with permissions

### API Integration
- RTK Query with custom interceptor logging requests/responses
- Tag types: `["auth", "patients", "emr", "visit", "labTest"]`
- Endpoints defined in `services/modules/` (extend base API)

### Internationalization
- Use `useTranslation()` hook, keys from `locales/en.json`/`locales/ur.json`
- Default language: English, stored in AsyncStorage

## Development Workflow
- Start: `npm start` (Expo dev server)
- Android: `npm run android`
- iOS: `npm run ios`
- Build: `expo build:android` / `expo build:ios`
- Dependencies: `npm install` (uses patch-package postinstall)

## Code Examples

### New Component
```tsx
// components/MyComponent/index.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

interface Props {
  title: string;
}

const MyComponent: React.FC<Props> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

export default MyComponent;
```

```ts
// components/MyComponent/style.ts
import { StyleSheet } from 'react-native';
import { colors } from '@/utils/colors';
import { hp, normalizeFont } from '@/utils/responsive';

export const styles = StyleSheet.create({
  container: {
    padding: hp(pxToHp(16)),
    backgroundColor: colors.white.w1,
  },
  text: {
    fontSize: normalizeFont(16),
    color: colors.black.b10,
    fontFamily: 'Medium',
  },
});
```

### Redux Slice
```ts
// features/mySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyState {
  value: string;
}

const initialState: MyState = { value: '' };

const mySlice = createSlice({
  name: 'my',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = mySlice.actions;
export default mySlice.reducer;
```

### API Endpoint
```ts
// services/modules/myApi.ts
import { api } from '../api';

export const myApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => 'endpoint',
      providesTags: ['myTag'],
    }),
  }),
});

export const { useGetDataQuery } = myApi;
```

### Form Validation
```ts
// schemas/validations.ts
import * as Yup from 'yup';

export const myFormValidation = Yup.object().shape({
  field: Yup.string().required('Field is required'),
});
```

## Key Files
- `app/_layout.tsx`: Root layout with providers and auth routing
- `store/index.ts`: Redux store configuration with persistence
- `services/api.ts`: RTK Query setup with auth headers
- `utils/colors.ts`: Color palette definitions
- `utils/responsive.ts`: Responsive design helpers
- `components/index.ts`: Component exports
- `locales/en.json`: Translation keys</content>
<parameter name="filePath">d:\Projects\awaazesehat-app\.github\copilot-instructions.md