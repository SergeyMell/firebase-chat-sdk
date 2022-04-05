export type FileID = string | number;

export interface IFile {
    id: number;
    createdAt: number;
    link: string;
    title: string;
    size: number;
    format: string;
}
