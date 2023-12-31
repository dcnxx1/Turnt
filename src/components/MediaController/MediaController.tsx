import MediaControllerView from './components/MediaControllerView';

type MediaControllerProps = {
  tabHeight: number;
};

export default function MediaController({tabHeight}: MediaControllerProps) {
  return <MediaControllerView tabHeight={tabHeight} />;
}
