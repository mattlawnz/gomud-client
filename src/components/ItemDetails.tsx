import type { ItemDetails, ServerResponse } from '../types';

type ItemDetailsProps = {
  serverResponse: ServerResponse;
};

export const ItemDetailsComponent = (props: ItemDetailsProps) => {
  const itemDetails = props.serverResponse as unknown as ItemDetails;

  if (itemDetails) {
    return (
      <div>
        {/* Check each property before rendering */}
        {itemDetails.description && (
          <span style={{ color: 'textSecondary', marginBottom: '10px' }}>{itemDetails.description}</span>
        )}
        {itemDetails.armorDetails && <div>Armor Details: {itemDetails.armorDetails}</div>}
        {itemDetails.weaponDetails && <div>Weapon Details: {itemDetails.weaponDetails}</div>}
        {itemDetails.level && <div>Level: {itemDetails.level}</div>}
        {itemDetails.materials && itemDetails.materials.length > 0 && (
          <div>Materials: {itemDetails.materials.join(', ')}</div>
        )}
        {itemDetails.color && <div style={{ color: itemDetails.color }}>Rarity: {itemDetails.rarity}</div>}
        {itemDetails.score !== undefined && <div>Score: {itemDetails.score}</div>}

        <strong>Attributes:</strong>
        {itemDetails.attributeModifiers &&
          Object.entries(itemDetails.attributeModifiers).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
      </div>
    );
  }
  return null; // Return null or a placeholder component if itemDetails is not defined
};
