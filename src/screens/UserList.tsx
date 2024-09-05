/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RenderUserList from '../components/RenderUserList';
import {AppDispatch, RootState} from '../redux/store';
import {fetchUsers, incrementPage, resetUsers} from '../redux/userDataSlice';
import {COLORS} from '../theme/Theme';

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);

  const {users, loading, error, page} = useSelector(
    (state: RootState) => state.users,
  );

  // Calling data on page load
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, page]);

  // Just to make sure refreshing is false when data is loaded
  useEffect(() => {
    if (refreshing && !loading) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  // Increment page and fetch data
  const loadMoreData = useCallback(() => {
    if (!loading) {
      dispatch(incrementPage());
      dispatch(fetchUsers());
    }
  }, [dispatch, loading]);

  // Refresh data (it will reset page with page 1 and fetch data again)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(resetUsers());
    dispatch(fetchUsers());
  }, [dispatch]);

  // When more data is loading then show loader in bottom
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

  // When there is no data show loader in full screen (this loader will show only first time data load)
  if (loading && page === 1 && !refreshing) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color={COLORS.black} />
      </View>
    );
  }

  // Make sure data is not loading and render error if has any
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
