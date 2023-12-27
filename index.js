import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {name as appName} from './app.json';
import PlaybackService from './trackplayer';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => PlaybackService);
