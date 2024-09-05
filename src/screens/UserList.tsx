/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RenderUserList from '../components/RenderUserList';
import {AppDispatch, RootState} from '../redux/store';
import {fetchUsers, incrementPage} from '../redux/userDataSlice';
import {COLORS} from '../theme/Theme';

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {users, loading, error, page} = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, page]);

  const loadMoreData = useCallback(() => {
    if (!loading) {
      dispatch(incrementPage());
      dispatch(fetchUsers());
    }
  }, [dispatch, loading, page]);

  const listFooterComponent = () => {
    if (loading) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size={25} color={COLORS.black} />
          <Text style={styles.loadingPageText}>Loading Page: {page}</Text>
        </View>
      );
    }
    return null;
  };

  if (loading && page === 1) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color={COLORS.black} />
      </View>
    );
  }

  if (!loading && error) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <Text style={styles.errorText}>
          {String(error || 'Something went wrong')}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={listFooterComponent}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <RenderUserList item={item} />}
      />
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  errorText: {
    width: '90%',
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.black,
    textAlign: 'center',
  },
  footerContainer: {
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingPageText: {
    color: COLORS.black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
});
