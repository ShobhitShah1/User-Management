import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {COLORS} from '../theme/Theme';
import {RouteProp, useRoute} from '@react-navigation/native';
import {User} from '../types/interfaces';

type UserCardData = {
  params: {
    userData: User;
  };
};

const UserDetail = () => {
  const {params} = useRoute<RouteProp<UserCardData, 'params'>>();
  const userData = useMemo(() => params?.userData, [params]);

  const {
    picture,
    name,
    email,
    phone,
    cell,
    dob,
    location,
    id,
    gender,
    registered,
    login,
    nat,
  } = userData || {};

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.scrollViewContain}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          style={styles.profileImage}
          source={{uri: picture?.large}}
        />
        <Text style={styles.name}>
          {name?.title} {name?.first} {name?.last}
        </Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Username:</Text> {login?.username}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Phone:</Text> {phone}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Cell:</Text> {cell}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Date of Birth:</Text>{' '}
          {new Date(dob?.date).toDateString()},{' '}
          {new Date(dob?.date).toTimeString()} (Age: {dob?.age})
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Location:</Text> {location?.street.name}{' '}
          {location?.street.number}, {location?.city}, {location?.state},{' '}
          {location?.country}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Postcode:</Text> {location?.postcode}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>
            <Text style={styles.boldText}>Timezone:</Text>
          </Text>{' '}
          {location?.timezone.description}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Gender:</Text> {gender}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Nationality:</Text> {nat}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.boldText}>Registered:</Text>{' '}
          {new Date(registered?.date).toDateString()} (Age: {registered?.age})
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewContain: {
    margin: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  email: {
    fontSize: 18,
    color: COLORS.gray,
    marginBottom: 16,
  },
  details: {
    marginTop: 5,
  },
  detailText: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 8,
    lineHeight: 28,
  },
  boldText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});

export default UserDetail;
