import React from "react";

export interface YoutubeAudioPlayerProps {
  videoId: string
}

interface YoutubeAudioPlayerState {
  id: number
}

/**
 * Loading state of youtube iframe api
 */
enum LoadingState {
  NOT_STARTED,
  QUEUING,
  DONE,
}

/**
 * YouTube audio only player
 */
export class YoutubeAudioPlayer extends React.Component<YoutubeAudioPlayerProps, YoutubeAudioPlayerState> {
  // each needs a unique id
  private static number = 0;
  private static loadingState = LoadingState.NOT_STARTED;
  // queue up callbacks while the initial player loads the api
  private static loadingQueue: (() => void)[] = [];
  // iframe / vid player
  private player: any;

  constructor(props: YoutubeAudioPlayerProps) {
    super(props);

    this.state = {
      id: YoutubeAudioPlayer.number++,
    };
  }

  componentDidMount() {
    switch (YoutubeAudioPlayer.loadingState) {
      case LoadingState.NOT_STARTED: {
        YoutubeAudioPlayer.loadingState = LoadingState.QUEUING;

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        (window as any).onYouTubeIframeAPIReady = this.youtubeReady;

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
        break;
      }
      case LoadingState.QUEUING: {
        YoutubeAudioPlayer.loadingQueue.push(this.loadVideo);
        break;
      }
      case LoadingState.DONE: {
        this.loadVideo();
        break;
      }
    }
  };

  youtubeReady = () => {
    YoutubeAudioPlayer.loadingState = LoadingState.DONE;

    // drain the queue
    YoutubeAudioPlayer.loadingQueue.forEach((load) => load());
    YoutubeAudioPlayer.loadingQueue = [];

    // load my video
    this.loadVideo();
  };

  loadVideo = () => {
    // the Player object is created uniquely based on the id
    this.player = new (window as any).YT.Player(`youtube-player-${this.state.id}`, {
      videoId: this.props.videoId,
      events: {
        onReady: this.onPlayerReady,
      },
    });
  };

  onPlayerReady = (event: any) => {
    // event.target.playVideo();
  };

  render() {
    return (
      <div id={`youtube-player-${this.state.id}`}/>
    );
  };
}
