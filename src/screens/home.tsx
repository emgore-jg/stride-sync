import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserTokenContext, fetchPlaylists, fetchProfile } from '../api';
import { calcBPM } from '../calculations';
import {
  Card,
  NumberInput,
  Playlist,
  RunDetailsBlock,
  StrideDetailsBlock,
  SubmitButton,
} from '../components';
import { SpotifyPlaylists, SpotifyProfile } from '../types/SpotifyAPI';

function Home() {
  const navigate = useNavigate();
  const { accessToken } = useContext(UserTokenContext);
  const [profile, setProfile] = useState<SpotifyProfile>();
  const [playlists, setPlaylists] = useState<SpotifyPlaylists>();

  const [pace, setPace] = useState<number>(0);
  const [stride, setStride] = useState<number>(0);
  const [bpm, setBPM] = useState<number>(-1);
  const [bpmOverride, setBPMOverride] = useState<number>(-1);

  useEffect(() => {
    async function fetchData() {
      if (accessToken) {
        try {
          const userProfile = await fetchProfile(accessToken);
          const userPlaylists = await fetchPlaylists(accessToken);
          setProfile(userProfile);
          setPlaylists(userPlaylists);
        } catch (error) {
          // Handle errors from the API call, e.g., token expired or invalid
          console.error('Error fetching user data:', error);
        }
      } else {
        navigate('/');
      }
    }

    fetchData();
  }, [accessToken]);

  if (!profile || !playlists) {
    return <div>Loading...</div>;
  }

  const handleStrideChange = (value: number) => {
    setStride(value);
  };

  const handlePaceChange = (value: number) => {
    setPace(value);
  };

  function calcStrideSync() {
    console.log('----------------------------------------------------');
    console.log('button clicked');
    console.log('recorded pace: ', pace, 'seconds per mile');
    console.log('recorded pace: ', pace / 60, 'minutes per mile');
    console.log('recorded stride: ', stride, ' inches');
    const calcBpm = calcBPM(pace, stride);
    console.log('calculated BPM: ', calcBpm, ' steps per minute');
    setBPM(calcBpm);
    setBPMOverride(calcBpm);
  }

  const handleOverride = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let valueNum = parseFloat(value);
    if (isFinite(valueNum)) setBPMOverride(valueNum);
    else setBPMOverride(bpm);
  };

  function exportPlaylist() {
    console.log('---------------export-----------------');
    console.log('BPM override is: ', bpmOverride);
    console.log('Calc bpm is: ', bpm);
  }

  return (
    <div className="m-auto flex h-screen w-3/4 flex-col items-center p-8">
      <h1>Spotify StrideSync- {profile.display_name}</h1>
      <div className="flex w-full gap-8 overflow-hidden px-4">
        <Card className="flex w-1/2">
          <h2>Select Playlist</h2>
          <div className="flex w-full flex-col gap-4 overflow-y-auto">
            {playlists?.items?.map((playlist) => (
              <Playlist
                key={playlist.id}
                name={playlist.name}
                imageURL={playlist.images[0].url}
                numTracks={playlist.tracks.total}
              />
            ))}
          </div>
        </Card>
        <div className="flex w-1/2 flex-col items-center gap-4">
          <RunDetailsBlock paceValue={handlePaceChange} />
          <StrideDetailsBlock strideValue={handleStrideChange} />
          <SubmitButton onClick={() => calcStrideSync()}>
            Calculate BPM
          </SubmitButton>
          {bpm !== -1 && isFinite(bpm) && (
            <div className="flex w-full flex-col items-center rounded-lg border-[1px] border-primary p-2">
              <h3>Your Calculated BPM is {bpm}</h3>
              <div className="flex items-center gap-4">
                <label>Override Calculated BPM</label>
                <NumberInput
                  placeholder={bpmOverride.toString()}
                  onChange={handleOverride}
                />
              </div>
              <SubmitButton onClick={() => exportPlaylist()}>
                Export Playlist
              </SubmitButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
