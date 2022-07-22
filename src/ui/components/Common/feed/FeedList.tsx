// import React, {
//   forwardRef,
//   useEffect,
//   useImperativeHandle,
//   useRef,
//   useState,
// } from 'react';
// import {
//   ActivityIndicator,
//   FlatList,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   Platform,
//   RefreshControl,
//   StyleSheet,
//   View,
// } from 'react-native';
// import {IAppCoreService} from '../../../../services/core/app.core.service.interface';

// import {observer} from 'mobx-react';
// import {useAppInjection} from 'app/data/ioc/inversify.config';
// import {Colors} from 'app/assets/constants/colors/Colors';
// import {FlatListItemView} from 'app/ui/screens/flat/FlatListItemView';
// import {IFlatCalculator} from 'app/data/storage/flat/flat.calculator.model';
// import {FlatExploreCard} from 'app/ui/screens/flat/flat-card/FlatExploreCard';
// import {IFlat} from 'app/data/storage/flat/flat.model';

// export interface FeedListProps {
//   onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
//   refreshScrollPosition?: () => void;
//   dataState: IFlatCalculator[] | IFlat[];
//   type: 'flat' | 'list';
//   homeIndex: number;
//   onCardOpened?: () => void;
// }

// export interface FeedListRef {
//   scrollToIndex?: (index: number) => void;
//   scrollToStart?: () => void;
// }
// const EXPLORE_FILTER_VIEW_HEIGHT = 113;
// const EXPLORE_FILTER_VIEW_OFFSET = 16;

// const CONTENT_OFFSET =
//   EXPLORE_FILTER_VIEW_HEIGHT + EXPLORE_FILTER_VIEW_OFFSET + 5;
// export const FeedList = observer(
//   forwardRef((props: FeedListProps, ref) => {
//     const SEPARATOR_HEIGHT = 16;
//     const app: IAppCoreService = useAppInjection();

//     const listRef = useRef<FlatList>(null);
//     const [
//       onEndReachedCalledDuringMomentum,
//       setOnEndReachedCalledDuringMomentum,
//     ] = useState(false);

//     useEffect(() => {
//       props.refreshScrollPosition && props.refreshScrollPosition();
//       _initResources().then();
//     }, []);

//     useImperativeHandle(ref, () => ({
//       scrollToIndex(index: number) {
//         return _scrollToIndex(index);
//       },
//       scrollToStart() {
//         return _scrollToStart();
//       },
//     }));

//     const _initResources = async () => {};

//     const _loadMoreResources = async () => {};

//     const _refreshResources = async () => {};

//     const _scrollToIndex = (index: number) => {
//       listRef.current &&
//         listRef.current.scrollToIndex({index: index, animated: true});
//     };

//     const _scrollToStart = () => {
//       listRef.current &&
//         listRef.current.scrollToOffset({
//           offset: -CONTENT_OFFSET,
//           animated: true,
//         });
//     };

//     const _getData = () => {
//       return props.dataState || [];
//     };

//     const _renderItem = ({
//       item,
//       index,
//     }: {
//       item: IFlatCalculator | IFlat;
//       index: number;
//     }) => {
//       if (props.type === 'list') {
//         const flatCalculator = item as IFlatCalculator;
//         return <FlatListItemView item={flatCalculator} index={index} />;
//       } else {
//         const flat = item as IFlat;
//         return (
//           <FlatExploreCard
//             flat={flat}
//             index={index}
//             title={flat.title}
//             type={props.type}
//             homeIndex={props.homeIndex}
//             flatIndex={index}
//           />
//         );
//       }
//     };

//     const Loader = () => {
//       return <ActivityIndicator size="large" color="#00ff00" />;
//     };

//     const isLoading = () => {
//       return false;
//     };

//     const isRefreshing = () => {
//       return false;
//     };

//     const renderContent = () => {
//       return (
//         <FlatList
//           scrollEnabled={_scrollEnabled()}
//           scrollEventThrottle={16}
//           onScroll={props.onScroll}
//           ref={listRef}
//           nestedScrollEnabled
//           onEndReachedThreshold={0.1}
//           onMomentumScrollBegin={() =>
//             setOnEndReachedCalledDuringMomentum(false)
//           }
//           showsVerticalScrollIndicator={false}
//           data={_getData()}
//           renderItem={_renderItem}
//           ListHeaderComponent={() => null}
//           //   ItemSeparatorComponent={() => (
//           //     <View
//           //       style={{
//           //         height:
//           //           filter === ExploreFilterValue.OPPORTUNITIES
//           //             ? 0
//           //             : SEPARATOR_HEIGHT,
//           //       }}
//           //     />
//           //   )}
//           //ListFooterComponent={<FeedListFooter />}
//           onEndReached={_loadMoreResources}
//           refreshControl={
//             <RefreshControl
//               progressViewOffset={
//                 Platform.OS === 'ios' ? undefined : CONTENT_OFFSET / 2
//               }
//               tintColor={Colors._34527F}
//               colors={[Colors._34527F]}
//               refreshing={isRefreshing()}
//               onRefresh={_refreshResources}></RefreshControl>
//           }
//         />
//       );
//     };

//     const renderNoDataContainer = () => {
//       return null;
//     };

//     const _scrollEnabled = () => {
//       return true;
//     };

//     return (
//       <View style={style.container}>
//         {isLoading() ? <Loader /> : null}
//         {renderNoDataContainer()}
//         {renderContent()}
//       </View>
//     );
//   }),
// );

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loaderContainer: {
//     position: 'absolute',
//     zIndex: 1,
//     top: 129,
//     backgroundColor: Colors._FFFFFF,
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
//   },
// });
