import type { Score, ServerResponse } from '../types';

type ScoreComponentProps = {
  serverResponse: ServerResponse;
};

export const ScoreComponent = (props: ScoreComponentProps) => {
  // Check if the server response and message field are defined and valid
  if (!props.serverResponse || typeof props.serverResponse.message !== 'string') {
    return <div>Loading score information...</div>;
  }
  // const score = JSON.parse(props.serverResponse.message) as Score;
  let score;
  try {
    score = JSON.parse(props.serverResponse.message) as Score;
  } catch (e) {
    console.error('Error parsing score JSON:', e);
    return <div>Error loading score information.</div>;
  }

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
