import { ProfileUser } from "./AuthModel";
import { TimeStamp } from "./GeneralModel";

export interface CityDTO {
    id: string;
    name: string;
}

export interface RegionDTO {
    id: string;
    city: CityDTO; //Foreign key to City
    name: string;
}

export interface LocationDTO {
    id: string;
    name: string;
    url: string;
    addressDescription: string;
    region: RegionDTO; //Foreign key to Region
}

export interface PostDto {
    userId: string; //Foreign key to user
    locationId: string; //Foreign key to Location
    minPrice: number;
    itemCount: number;
    startDateTime: Date;
    endDateTime: Date;
    sportType: string;
}

export interface PostItemResponse extends PostDto, TimeStamp  {
    id: string;
    minPrice: number;
    status: string;
    location: LocationDTO;
    seller: ProfileUser;
    offerCount: number;
    maxOfferPrice: number;
    isBoosted: boolean;
}