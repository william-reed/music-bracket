import React from "react";

export interface YoutubeAudioPlayerProps {
  videoId: string,
}

interface YoutubeAudioPlayerState {
  id: number,
  isPlaying: boolean,
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
  private playerReady = false;

  constructor(props: YoutubeAudioPlayerProps) {
    super(props);

    this.state = {
      id: YoutubeAudioPlayer.number++,
      isPlaying: false,
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
      height: '0',
      width: '0',
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  };

  onPlayerReady = (event: any) => {
    this.playerReady = true;
    this.player.setPlaybackQuality("small");
  };

  onPlayerStateChange = (event: any) => {
    let state: number = event.data;

    if (state === 1) {
      this.setState({isPlaying: true});
    } else {
      this.setState({isPlaying: false});
    }
  };

  playPauseClicked = () => {
    if (!this.playerReady) {
      console.log("player not ready yet");
      return;
    }

    if (this.state.isPlaying) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.playPauseClicked}>{this.state.isPlaying ? "Pause" : "Play"}</button>
        <div id={`youtube-player-${this.state.id}`}/>
      </div>
    );
  };
}
