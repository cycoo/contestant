export class Contestant {
  id:number;
  contestant_id: any;
  firstname: string;
  lastname: string;
  dob: string;
  is_active: string;
  district_id: string;
  gender: string;
  photo_url: string;
  address:string;

  // image
  PhotoPreview:string;
  photo:File;
  ImageDeletedOnEdit:boolean=false;
}