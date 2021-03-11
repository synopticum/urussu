import React from 'react';
import theme from 'src/features/GlobalStyle/theme';

export const ActiveEntity: React.FC<{ id: string }> = ({ id }) => {
  return (
    <style>{`
      path.leaflet-interactive.id_${id},
      .leaflet-marker-icon.id_${id} {
        animation: bounce 1s linear infinite alternate;
      }

      ${theme.animations.bounce('opacity', '0', '1')}
    `}</style>
  );
};
