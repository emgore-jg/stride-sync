import { Card } from '../components/Card';
import { RunDetailsBlock } from '../components/RunDetailsBlock';
import { StrideDetailsBlock } from '../components/StrideDetailsBlock';
import { SubmitButton } from '../components/SubmitButton';

function Home() {
  return (
    <div className="flex w-3/4 m-auto justify-center flex-col items-center">
      <h1 className="text-3xl font-bold my-8">Spotify StrideSync</h1>
      <div className="flex w-full gap-8 px-4">
        <Card addClass="w-1/2">
          <h2>Select Playlist</h2>
          {/* TODO: create playlist display component */}
          {/* map all playlists to this component */}
        </Card>
        <div className="w-1/2 flex flex-col items-center gap-4">
          {/* selections */}
          <RunDetailsBlock />
          <StrideDetailsBlock />
          <SubmitButton>Sync My Stride</SubmitButton>
        </div>
      </div>
    </div>
  );
}

export default Home;