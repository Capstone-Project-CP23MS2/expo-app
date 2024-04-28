import { useQuery } from "@tanstack/react-query";
import placesApi from "@/api/places";
import { PlacesMapParams, PlacesParams } from "@/api/places/places.type";

export function UseGetPlaces(params = { pageSize: 25 } as PlacesParams) {
    return useQuery({
        queryKey: ['places'],
        queryFn: () => placesApi.getPlaces(params),
    });
};

export function UseGetPlacesMap(params = {} as PlacesMapParams) {
    return useQuery({
        queryKey: ['places'],
        queryFn: () => placesApi.getPlacesMap(params),
    });
};
