import { Injectable } from '@angular/core';

@Injectable()
export class ExportService {

    private exportApi: { doExport, 'EXPORT_OPTIONS' };

    constructor() {
        if (window.hasOwnProperty('exportApi')) {
            this.exportApi = window['exportApi'];
        }
    }

    public exportTo(data: any, dir?: string, type?: string) {
        if (this.exportApi) {
            this.exportApi.doExport(data, dir, type);
        } else {
            alert("Feature available only on Electron app.");
        }
    }

    public getExportOptions() {
        return this.exportApi.EXPORT_OPTIONS;
    }
}