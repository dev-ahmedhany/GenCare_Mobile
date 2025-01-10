import ExpoVideo from 'expo-video';

interface VideoPlayerProps {
  source: { uri: string } | number;
  style?: any;
}

export function VideoPlayer({ source, style }: VideoPlayerProps) {
  return (
    <ExpoVideo
      source={source}
      shouldPlay={true}
      isLooping={true}
      isMuted={true}
      resizeMode="cover"
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        style
      ]}
    />
  );
} 