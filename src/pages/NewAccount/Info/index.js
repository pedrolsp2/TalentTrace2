import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, SafeAreaView, TouchableOpacity, Platform, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {  secundaryColor, TerColor, styles } from '../styles.js';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Info() {

  const [newData, setNewData] = useState(null);
  const [number, setNumber] = useState("")
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@talenttrace:dataUsers');
        setNewData(JSON.parse(userData));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleAddNumber = async () => {
    const updatedData = {
      ...newData,
      contato: number
    };
    try {
      await AsyncStorage.setItem('@talenttrace:dataUsers', JSON.stringify(updatedData));
      navigation.navigate("NewAccount")
    } catch (error) {
      console.log(error);
    }
  };
  const formatPhoneNumber = (input) => {
    let formattedNumber = input.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (formattedNumber.length > 0) {
      formattedNumber = '(' + formattedNumber;
    }
    if (formattedNumber.length > 3) {
      formattedNumber = formattedNumber.replace(/(\d{2})(\d)/, '$1) $2');
    }
    if (formattedNumber.length > 10) {
      formattedNumber = formattedNumber.replace(/(\d{5})(\d)/, '$1-$2');
    }
    if (formattedNumber.length > 15) {
      formattedNumber = formattedNumber.substr(0, 15);
    }

    return formattedNumber;
  };

  const handleNumberChange = (input) => {
    const formattedNumber = formatPhoneNumber(input);
    setNumber(formattedNumber);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.info}>
          <TouchableOpacity onPress={() => navigation.navigate('DescritionUser')}>
            <Ionicons
              name='chevron-back-outline'
              size={52}
              color={TerColor}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>Por fim</Text>
          <Text style={styles.Text}>Deixe seu numero para contato</Text>
        </View>
        <View style={styles.containerInputN}>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='logo-whatsapp' size={32} color={secundaryColor} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Ex: (34) 9 9632-5874'
                  value={number}
                  onChangeText={handleNumberChange}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.Button} onPress={handleAddNumber}>
            <Text style={styles.TextButton}>Finalizar</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

