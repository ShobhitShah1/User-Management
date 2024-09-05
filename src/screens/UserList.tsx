import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {fetchUsers} from '../redux/userDataSlice';
import {COLORS} from '../theme/Theme';

const UserList = () => {
  const dispatch = useDispatch();
  const {users, loading, error, page} = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const loadMoreData = useCallback(() => {
    if (!loading) {
      dispatch(fetchUsers(page + 1));
    }
  }, [dispatch, loading, page]);

  return <View style={styles.container}></View>;
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
