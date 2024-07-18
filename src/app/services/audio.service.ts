import { Injectable } from '@angular/core';
import { Howl} from "howler";
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';


@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public returnpath : string = '';

  constructor( private fileChooser: FileChooser, private filepath : FilePath,  private file : File, private plt : Platform) { }

  
  async seleccionarAudio(){
    
    if(this.plt.is('android')){
    
      const selectedFile : string = await this.fileChooser.open();
        const resolvedPath = await this.filepath.resolveNativePath(selectedFile);
        const fileEntry = await this.file.resolveLocalFilesystemUrl(resolvedPath) as any;
        fileEntry.file((fileInfo)=>{
            console.log('File Info ', fileInfo);
            this.returnpath = fileInfo.localURL;
            console.log('Return path ' + this.returnpath);


            //sample response file mime type size etc you can use it as per your requirement
            // end: 3028
            // lastModified: 1610953273000
            // lastModifiedDate: 1610953273000
            // localURL: "cdvfile://localhost/sdcard/Download/sample.pdf"
            // name: "sample.pdf"
            // size: 3028
            // start: 0
            // type: "application/pdf"
        })
      
    }else{
      /*
        //For ios device 
        const selectedFile : string = await  this.filePicker.pickFile() ;
        const fileEntry = await this.file.resolveLocalFilesystemUrl('file:///'+selectedFile) as any;
        fileEntry.file((fileInfo)=>{
             console.log('File Info ', fileInfo);
        })
        */
    }
}

  

  
}

