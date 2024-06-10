import { GetOrderDetailsItem } from "./getOrderDetailsItem";

export class GetOrderDetails{
    orderID!:string
    companyName!:string;
    orderStatus!:string;
    price!:string;
    createdDate!:string;
    deliveryDate!:string;
    orderItems!:GetOrderDetailsItem[];
}