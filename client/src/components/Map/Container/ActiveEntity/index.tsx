import React from 'react';
import { animation } from 'src/components/GlobalStyle/theme';

export const ActiveEntity: React.FC<{ id: string }> = ({ id }) => {
  return (
    <style>{`
      path.leaflet-interactive.id_${id},
      .leaflet-marker-icon.id_${id} {
        animation: bounce 1s linear infinite alternate;
      }

      ${animation.bounce('opacity', '0', '1')}
    `}</style>
  );
};
