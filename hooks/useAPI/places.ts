import { useQuery } from "@tanstack/react-query";
import placesApi from "@/api/places";
import { PlacesParams } from "@/api/places/places.type";

export function UseGetPlaces(params = { pageSize: 25 } as PlacesParams) {
    return useQuery({
        queryKey: ['places'],
        queryFn: () => placesApi.getPlaces(params),
    });
};
