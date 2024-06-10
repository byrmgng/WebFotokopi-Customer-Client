import { ListPaperSize } from "../paperSize/ListPaperType";
import { ListPaperType } from "../paperType/ListPaperType";
import { ListSheetsPerPage } from "../sheetsPerPage/ListSheetsPerPage";

export class GetPackage{
    packageID!:string
    packageName!:string;
    price!:string;
    duplexMode!:boolean;
    colorMode!:boolean;
    sheetsPerPage!:ListSheetsPerPage;
    paperSize!:ListPaperSize;
    paperType!:ListPaperType;
}