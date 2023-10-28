import type { Damage, ServerResponse } from '../types';

type DamageDetailsProps = {
  serverResponse: ServerResponse;
};

export const DamageDetailsComponent = (props: DamageDetailsProps) => {
  let damageData: Damage | null = null;
  try {
    damageData = JSON.parse(props.serverResponse.message);
  } catch (error) {
    console.error('Failed to parse damage data:', error);
  }

  if (damageData) {
    let line = damageData.isSkill
      ? `${damageData.sourceName} uses ${damageData.name} on ${damageData.targetName} for ${damageData.amount} ${damageData.type} damage`
      : `${damageData.sourceName} ${damageData.name} ${damageData.targetName} for ${damageData.amount} damage`;

    // Handle critical hit
    if (damageData.critical) {
      line = `[CRITICAL HIT] ${line}`;
    }

    const start = line.split(damageData.name)[0];
    const middle = line.split(damageData.name)[1].split(damageData.amount.toString())[0];
    const end = line.split(damageData.amount.toString())[1];

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: damageData.critical ? 'bold' : 'normal',
          margin: 0,
          padding: 0,
        }}
        className={damageData.visualEffect === 'ice' ? 'icy-theme' : ''}
      >
        <div style={{ width: '50%', textAlign: damageData.isSourceChar ? 'right' : 'left', margin: 0, padding: 0 }}>
          {/* Only render if isSourceChar is true */}
          {damageData.isSourceChar && (
            <>
              {damageData.icon && (
                <img
                  src={damageData.icon}
                  alt="damage icon"
                  style={{ marginRight: '8px', verticalAlign: 'middle', height: '1em' }}
                />
              )}
              {start}
              <span style={{ color: damageData.color || 'inherit' }}>{damageData.name}</span>
              {middle}
              <span style={{ color: damageData.color || 'inherit' }}>{damageData.amount}</span>
              {end}
            </>
          )}
        </div>
        <div style={{ width: '50%', textAlign: !damageData.isSourceChar ? 'left' : 'right', margin: 0, padding: 0 }}>
          {/* Only render if isSourceChar is false */}
          {!damageData.isSourceChar && (
            <>
              {damageData.icon && (
                <img
                  src={damageData.icon}
                  alt="damage icon"
                  style={{ marginRight: '8px', verticalAlign: 'middle', height: '1em' }}
                />
              )}
              {start}
              <span style={{ color: damageData.color || 'inherit' }}>{damageData.name}</span>
              {middle}
              <span style={{ color: damageData.color || 'inherit' }}>{damageData.amount}</span>
              {end}
            </>
          )}
        </div>
      </div>
    );
  }
  return null; // Return null or a placeholder component if damageData is not defined
};
