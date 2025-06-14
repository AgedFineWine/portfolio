import { createContext, useContext } from 'react';

interface MarkerContextType {
    markerHovered: boolean; // Is the marker being hovered?
    setMarkerHovered: (hovered: boolean) => void; // Function to set marker hovered state
    setMarkerCaption: (text: string) => void; // Function to set marker text
}

export const MarkerContext = createContext<MarkerContextType | null>(null);

export const useMarker = function() {
    const context = useContext(MarkerContext);

    if (!context) throw new Error('useMarker must be used within a MarkerProvider');

    return context;
}
