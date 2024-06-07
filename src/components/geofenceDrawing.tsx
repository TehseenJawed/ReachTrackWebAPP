import * as React from 'react';

import {
  DrawingManager as RactGoogleMapsDrawingManager,
  DrawingManagerProps,
} from '@react-google-maps/api';

export const DrawingManager = React.forwardRef<RactGoogleMapsDrawingManager, DrawingManagerProps>(
  (props, ref): JSX.Element => <RactGoogleMapsDrawingManager ref={ref} {...props} />
);

DrawingManager.displayName = 'DrawingManager';
