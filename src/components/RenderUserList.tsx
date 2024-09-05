import React, {memo, useCallback} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../theme/Theme';
import {User} from '../types/interfaces';
import {useNavigation} from '@react-navigation/native';

const RenderUserList = ({item}: {item: User}) => {
  const {picture, name, email, phone, dob} = item;
  const navigation = useNavigation();

  const onPressCard = useCallback(() => {
    navigation.navigate('UserDetail', {userData: item});
  }, [item, navigation]);

  return (
    <Pressable onPress={onPressCard} style={styles.container}>
      <Image source={{uri: picture.medium}} style={styles.profileImage} />
      <View style={styles.userDetailView}>
        <Text style={styles.name}>
          {name?.first} {name?.last}
        </Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.phone}>{phone}</Text>
        <Text style={styles.dob}>Age: {dob?.age}</Text>
      </View>
    </Pressable>
  );
};

export default memo(RenderUserList);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userDetailView: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 16,
  },
  email: {
    color: COLORS.black,
  },
  phone: {
    color: COLORS.gray,
    fontWeight: '500',
  },
  dob: {
    color: COLORS.gray,
    fontWeight: '500',
  },
});
