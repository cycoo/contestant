import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
// import { AlertService } from "../../core";

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html'
})

export class FileUploadComponent {
    public showImagePreviewArea = true;
    private _hasImage: boolean = false;
    private _showDeleteImage: boolean = false;

    private _hasPdf: boolean = false;
    private _showDeletePdf: boolean = false;

    private _imageUploadComponent: boolean = true;
    private _pdfUploadComponent: boolean = false;
    private _imageUploadTitle: string = 'Upload Image';
    private _pdfUploadTitle: string = 'Upload PDF';

    private _imageFileName: string = '';
    private _pdfFileName: string = '';
    private _imageSrc: string = '';

    @Output() imageUploaded = new EventEmitter<File>();
    @Output() pdfUploaded = new EventEmitter<File>();

    @ViewChild('imageUploadInput')
    private imageUploadInput: ElementRef;
    @ViewChild('pdfUploadInput')
    private pdfUploadInput: ElementRef;

    //for excel 
    private _hasExcel: boolean = false;
    private _showDeleteExcel: boolean = false;
    private _excelUploadComponent: boolean = false;
    private _excelUploadTitle: string = 'Upload Excel';
    private _excelFileName: string = '';

    //for audio
     private _hasAudio: boolean = false;
    private _showDeleteAudio: boolean = false;
    private _audioUploadComponent: boolean = false;
    private _audioUploadTitle: string = 'Upload Audio';
    private _audioFileName: string = '';

    @Output() excelUploaded = new EventEmitter<File>();
    @ViewChild('excelUploadInput')
    private excelUploadInput: ElementRef;

     @Output() audioUploaded = new EventEmitter<File>();
    @ViewChild('audioUploadInput')
    private audioUploadInput: ElementRef;

    //for video
    private _hasVideo: boolean = false;
    private _showDeleteVideo: boolean = false;
    private _videoUploadComponent: boolean = false;
    private _videoUploadTitle: string = 'Upload Video';
    private _videoFileName: string = '';

    @Output() videoUploaded = new EventEmitter<File>();
    @ViewChild('videoUploadInput')
    private videoUploadInput: ElementRef;


    // constructor(private alertService: AlertService) {

    // }

    constructor() {

    }

    private handleImageUpload() {
        let imageFile: File = this.imageUploadInput.nativeElement.files[0];
        if (imageFile) {
            this._imageFileName = imageFile.name;

            let pattern = /image-*/;
            let reader = new FileReader();

            if (!imageFile.type.match(pattern)) {
                // this.alertService.alertWarning("Please upload an Image file.");
                this.resetImageComponent();
                return;
            }

             if (imageFile.size / 1024 / 1024 > 2) {
                //   this.alertService.alertWarning("Image size should not be greater than 2 mb.");
                  this.resetImageComponent();
                  return false;
                }

            reader.onload = this._loadPreview.bind(this);
            reader.readAsDataURL(imageFile);

            // console.log(imageFile);
            // console.log('_imageSrc', this._imageSrc);
            this.imageUploaded.emit(imageFile);
        }
    }

    private _loadPreview(event: ProgressEvent) {
        let readerResult: FileReader = event.target as FileReader;
        this.setImagePreview(readerResult.result);
        this._hasImage = true;
    }

    private setImagePreview(imageSrc: string): void {
        this._imageSrc = imageSrc;
    }

    private handlePdfUpload() {
        let pdfFile: File = this.pdfUploadInput.nativeElement.files[0];
        this._pdfFileName = pdfFile.name;

        let pattern = /pdf-*/;
        let reader = new FileReader();

        if (!pdfFile.type.match(pattern)) {
            // this.alertService.alertWarning('Please upload an PDF file.');
            this.resetPdfComponent();
            return;
        }
        this._hasPdf = true;

        this.pdfUploaded.emit(pdfFile);
    }
    private handleExcelUpload() {

        let excelFile: File = this.excelUploadInput.nativeElement.files[0];
        this._excelFileName = excelFile.name;

        let excelxlsxpattern="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

        // let pattern = "application/vnd.ms-excel";
        // let csvpattern = "application/csv";
        // let safariCsvPattern = "text/csv";
        // let reader = new FileReader();
        // if (!(excelFile.type.match(pattern) || excelFile.type.match(csvpattern) || excelFile.type.match(safariCsvPattern))) {
        //     this.alertService.alertWarning('Please upload csv file.');
        //     return;
        // }

        if (!(excelFile.type.match(excelxlsxpattern))) {
            // this.alertService.alertWarning('Please upload excel file.');
            this.resetExcelComponent();
            return;
        }
        this._hasExcel = true;

        this.excelUploaded.emit(excelFile);
    }

     private handleVideoUpload() {

        let videoFile: File = this.videoUploadInput.nativeElement.files[0];
        this._videoFileName = videoFile.name;

        let pattern = "video/*";
        let reader = new FileReader();


        if (!videoFile.type.match(pattern)) {
            // this.alertService.alertWarning('Please upload an video file.');
            this.resetVideoComponent();
            return;
        }else if(videoFile.size/1024/1024>5){
            //  this.alertService.alertWarning('File should not be greater than 5 mb.');
             this.resetVideoComponent();
            return;
        }
       
        this._hasVideo = true;

        this.videoUploaded.emit(videoFile);
    }

     private handleAudioUpload() {

        let audioFile: File = this.audioUploadInput.nativeElement.files[0];
        this._audioFileName = audioFile.name;

        let pattern = "audio/*";
        let reader = new FileReader();


        if (!audioFile.type.match(pattern)) {
            // this.alertService.alertWarning('Please upload an audio file.');
            this.resetAudioComponent();
            return;
        }else if(audioFile.size/1024/1024>5){
            //  this.alertService.alertWarning('File should not be greater than 5 mb.');
             this.resetAudioComponent();
            return;
        }
       
        this._hasAudio = true;

        this.audioUploaded.emit(audioFile);
    }



    private deleteImage() {
        this.resetImageComponent();
    }

    private deletePdf() {
        this.resetPdfComponent();
    }
    private deleteExcel() {
        this.resetExcelComponent();
    }

     private deleteVideo() {
        this.resetVideoComponent();
    }
     private deleteAudio() {
        this.resetAudioComponent();
    }

    private toggleDeleteImage(): void {
        this._showDeleteImage = !this._showDeleteImage;
    }

    private toggleDeletePdf(): void {
        this._showDeletePdf = !this._showDeletePdf;
    }

    private toggleDeleteExcel(): void {
        this._showDeleteExcel = !this._showDeleteExcel;
    }
     private toggleDeleteVideo(): void {
        this._showDeleteVideo = !this._showDeleteVideo;
    }
     private toggleDeleteAudio(): void {
        this._showDeleteAudio = !this._showDeleteAudio;
    }

    showImageComponent(title: string) {
        this._imageUploadComponent = true;
        // this._imageUploadTitle = title;
    }

    showPdfComponent(title: string) {
        this._pdfUploadComponent = true;
        this._pdfUploadTitle = title;
    }

    showExcelComponent(title: string) {
        this._excelUploadComponent = true;
        this._excelUploadTitle = title;
    }
    showVideoComponent(title: string) {
        this._videoUploadComponent = true;
        this._videoUploadTitle = title;
    }
    showAudioComponent(title: string) {
        this._audioUploadComponent = true;
        this._audioUploadTitle = title;
    }


    initDataImage(fileName: string, imageSrc: string) {
        this._imageFileName = fileName;
        this._imageSrc = imageSrc;
        this._hasImage = true;
    }

    initDataPdf(fileName: string) {
        this._pdfFileName = fileName;
        this._hasPdf = true;
    }
    initDataExcel(fileName: string) {
        this._excelFileName = fileName;
        this._hasExcel = true;
    }
    initDataVideo(fileName: string) {
        this._videoFileName = fileName;
        this._hasVideo = true;
    }
     initDataAudio(fileName: string) {
        this._audioFileName = fileName;
        this._hasAudio = true;
    }


    resetImageComponent() {
        this.imageUploadInput.nativeElement.value = '';
        this.imageUploaded.emit(null);
        this._imageSrc = null;
        this._hasImage = false;
        this._showDeleteImage = false;
    }

    resetPdfComponent() {
        this.pdfUploadInput.nativeElement.value = '';
        this.pdfUploaded.emit(null);
        this._hasPdf = false;
        this._showDeletePdf = false;
    }

    resetExcelComponent() {
        this.excelUploadInput.nativeElement.value = '';
        this.excelUploaded.emit(null);
        this._hasExcel = false;
        this._showDeleteExcel = false;
    }

    resetVideoComponent() {
        this.videoUploadInput.nativeElement.value = '';
        this.videoUploaded.emit(null);
        this._hasVideo = false;
        this._showDeleteVideo = false;
    }
     resetAudioComponent() {
        this.audioUploadInput.nativeElement.value = '';
        this.audioUploaded.emit(null);
        this._hasAudio = false;
        this._showDeleteAudio = false;
    }
}
