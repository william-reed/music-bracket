import React from "react";

// TODO: give audio only a default
export interface YoutubeAudioPlayerProps {
  videoId: string,
  audioOnly: boolean,
}

interface YoutubeAudioPlayerState {
  id: number,
  isPlaying: boolean,
}

/**
 * Loading store.ts of youtube iframe api
 */
enum LoadingState {
  NOT_STARTED,
  QUEUING,
  DONE,
}

const PLAYER_WIDTH = 355;
const PLAYER_HEIGHT = 200;

/**
 * YouTube audio only player
 */
export class YouTubePlayer extends React.Component<YoutubeAudioPlayerProps, YoutubeAudioPlayerState> {
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
      id: YouTubePlayer.number++,
      isPlaying: false,
    };
  }

  componentDidMount() {
    switch (YouTubePlayer.loadingState) {
      case LoadingState.NOT_STARTED: {
        YouTubePlayer.loadingState = LoadingState.QUEUING;

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        (window as any).onYouTubeIframeAPIReady = this.youtubeReady;

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
        break;
      }
      case LoadingState.QUEUING: {
        YouTubePlayer.loadingQueue.push(this.loadVideo);
        break;
      }
      case LoadingState.DONE: {
        this.loadVideo();
        break;
      }
    }
  };

  youtubeReady = () => {
    YouTubePlayer.loadingState = LoadingState.DONE;

    // drain the queue
    YouTubePlayer.loadingQueue.forEach((load) => load());
    YouTubePlayer.loadingQueue = [];

    // load my video
    this.loadVideo();
  };

  loadVideo = () => {
    // the Player object is created uniquely based on the id
    let width, height;

    if (this.props.audioOnly) {
      width = '0';
      height = '0';
    } else {
      width = `${PLAYER_WIDTH}`;
      height = `${PLAYER_HEIGHT}`;
    }

    this.player = new (window as any).YT.Player(`youtube-player-${this.state.id}`, {
      videoId: this.props.videoId,
      width: width,
      height: height,
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  };

  onPlayerReady = (event: any) => {
    this.playerReady = true;

    if (this.props.audioOnly) {
      this.player.setPlaybackQuality("small");
    }

    // change video start to halfway through as music videos usually have junk at the start
    this.player.seekTo(this.player.getDuration() / 2);
    this.player.pauseVideo();
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
        {this.props.audioOnly &&
        <button onClick={this.playPauseClicked}>{this.state.isPlaying ? "Pause" : "Play"}</button>
        }
        <div id={`youtube-player-${this.state.id}`}/>
      </div>
    );
  };
}
