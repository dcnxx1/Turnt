import {Capability} from 'react-native-track-player';

export const theme = {
  color: {
    white: '#FDFCFA',
    turner: '#FF005A',
    turnerPurpleBright: '#BF0060',
    turnerPurple: '#870066',
    turnerPurpleDark: '#5D005E',
    turnerDark: '#1B0031',
    gray: '#8E8E8E',
  },
};

export const onBoardingText: Readonly<IOnBoardProps[]> = [
  {
    id: 1,
    header: {
      text: 'Turnt',
      logo: true,
    },
    body: 'Jouw nieuwe favoriete artiesten binnen 30 seconden!',
    footer: '',
    image: true,
  },
  {
    id: 2,
    header: {
      text: 'Luister naar de beste 30 seconden van de Turn',
      logo: false,
    },
    body: 'Vind je het niks?',
    footer: 'Scroll door!',
    image: false,
  },
  {
    id: 3,
    header: {
      text: 'Voor artiesten',
      logo: false,
    },
    body: 'Bouw een fanbase op',
    footer: 'En krijg de publiciteit die je verdient!',
    image: false,
  },
];

export interface IOnBoardProps {
  id: number;
  header: {
    text: string;
    logo?: boolean;
  };
  body: string;
  footer?: string;
  image: boolean;
}

export const TURN_IMPRESSION_TIME = 30;

export const trackPlayerCapabilities = [
  Capability.Play,
  Capability.Pause,
  Capability.SkipToNext,
  Capability.SkipToPrevious,
  Capability.SeekTo,
];
