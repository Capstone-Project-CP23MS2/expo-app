import { useLocation } from '@/hooks/useLocation';
import { createContext, useContext, useMemo } from 'react';
import { LocationObject } from 'expo-location';

type Props = {
  readonly children: React.ReactNode;
};

type LocationContext = {
  location: LocationObject | null;
  isLoading: boolean;
  error: Error | null;
};

const LocationContext = createContext<LocationContext>({} as LocationContext);
export const useLocationContext = () => useContext(LocationContext);

export default function LocationProvider({ children }: Props) {
  const { location, error, isLoading } = useLocation();

  const value = useMemo(
    () => ({
      location,
      isLoading,
      error,
    }),
    [location],
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}
