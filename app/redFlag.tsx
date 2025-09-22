import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppHeader, KeyboardAvoidingWrapper, SymptomItem } from '@/components'
import { Icons } from '@/assets/svgs'
import { useTranslation } from 'react-i18next'
import { Symptoms } from '@/utils/Json'
import { styles } from '@/styles/redFlagStyle'

const RedFlag = () => {
  const {t} = useTranslation()
  return (
    <KeyboardAvoidingWrapper>
      <AppHeader title={t("Patient red flags")} leftIcon={<Icons.left />} />
          <View style={styles.subContainer}>
     
          {Symptoms.map((item, index) => (
            <SymptomItem
              key={index.toString()}
              {...item}
              showConnector={index !== Symptoms.length - 1}
              rowStyle={styles.rowStyle}
            />
          ))}
        </View>
      </KeyboardAvoidingWrapper>
  )
}

export default RedFlag

