import { TimeStamp } from "./GeneralModel";

export interface OfferDTO {
    postId: string; //Foreign key to Post
    price: number;
    itemCount: number;
}

export interface OfferItemResponse extends OfferDTO, TimeStamp {
    id: string;
    buyer: BuyerDTO;
}

export interface BuyerDTO {
    email: string;
    name: string;
    phone: string;
    userId: string;
}