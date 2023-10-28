import type { FightSummary, ServerResponse } from '../types';

type FightSummaryProps = {
  serverResponse: ServerResponse;
};

export const FightSummaryComponent = (props: FightSummaryProps) => {
  const fightSummary = props.serverResponse as unknown as FightSummary;

  if (!fightSummary) {
    //    console.log('Fight summary is null'); // Debug log
    return null; // or a loading state
  }

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
