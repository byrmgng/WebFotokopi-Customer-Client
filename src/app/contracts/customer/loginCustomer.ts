
import { BaseResponse } from "../BaseResponse";
import { Token } from "../token/token";

export class LoginCustomer extends BaseResponse{
    token!:Token;
}