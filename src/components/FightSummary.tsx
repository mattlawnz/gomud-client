import type { FightSummary } from '../types';
import type { SecondaryView } from './Room';

// type FightSummaryProps = {
//   serverResponse: ServerResponse;
// };

type FightSummaryProps = {
  // itemId: number | null;
  // // eslint-disable-next-line no-unused-vars
  // sendJsonMessage: (message: ClientCommand) => void;
  fightSummaryData: FightSummary | null;
  sendCommand: (_command: string, _secondaryView: SecondaryView) => void;
};

// export const ItemDetailsComponent = ({ itemDetailsData: itemDetails }: ItemDetailsProps) => {
//   if (!itemDetails) {
//     return <Typography>No item details available.</Typography>;
//   }

//   const formatAttribute = (value: number) => (value >= 0 ? `+${value}` : `${value}`);

export const FightSummaryComponent = ({ fightSummaryData: fightSummary }: FightSummaryProps) => {
  if (!fightSummary) {
    return <div>No fight summary available.</div>;
  }
  // const fightSummary = props.serverResponse as unknown as FightSummary;

  // if (!fightSummary) {
  //   //    console.log('Fight summary is null'); // Debug log
  //   return null; // or a loading state
  // }

  return (
    <div style={{ textAlign: 'left' }}>
      <strong>Fight Summary:</strong>
      <div>
        {fightSummary.participants.map((participant, idx) => (
          <div key={idx}>
            <strong>Name:</strong> {participant.name}
            <br />
            <strong>Damage:</strong> {participant.damage}
            <br />
            <strong>DPS:</strong> {participant.dps}
            <br />
            <strong>Side:</strong> {participant.side}
            <br />
            <strong>Is Alive:</strong> {participant.isAlive ? 'Yes' : 'No'}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};
