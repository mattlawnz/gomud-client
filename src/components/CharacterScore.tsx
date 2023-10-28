import type { Score, ServerResponse } from '../types';

type ScoreComponentProps = {
  serverResponse: ServerResponse;
};

export const ScoreComponent = (props: ScoreComponentProps) => {
  const score = JSON.parse(props.serverResponse.message) as Score;

  return (
    <div style={{ textAlign: 'left', fontSize: '16px' }}>
      Level <strong>{score.level}</strong> ({score.experience} experience)
      <br />
      You are a <strong>{score.class}</strong> from the {score.race} race.
      <br />
      <strong>Attributes:</strong>
      <div>
        {score.attributes &&
          Object.entries(score.attributes)
            .map(([key, value]) => `${key}: ${value} `)
            .join(', ')}
      </div>
      <strong>Stats:</strong>
      <div>
        {score.stats &&
          Object.entries(score.stats)
            .map(([key, value]) => `${key}: ${value} `)
            .join(', ')}
      </div>
      <strong>Active Effects:</strong>
      {score.active_effects ? (
        <div>
          {score.active_effects.split('\n').map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      ) : (
        'N/A'
      )}
      <br />
      <strong>Item Effects:</strong>
      {score.item_effects ? (
        <div>
          {score.item_effects.split('\n').map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      ) : (
        'N/A'
      )}
    </div>
  );
};
