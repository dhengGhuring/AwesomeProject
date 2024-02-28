import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Tentukan tipe stack navigator
type RootStackParamList = {
  HomeScreen: undefined;
  SecondScreen: undefined;
  // ... tambahkan rute lain
};

// Tipe untuk prop navigation pada HomeScreen
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}
