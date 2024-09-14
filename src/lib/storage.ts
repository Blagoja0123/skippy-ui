import { storage } from "@/config/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"


export const uploadFile = async (file: File | undefined, folder: string) => {
    try {
        if (!file) {
            throw new Error('No file provided');
        }
        
        const date = new Date(Date.now());
        const name = file.name.split(".").pop();
        const filename = `${folder}${date.getTime()}.${name}`;
        const storageRef = ref(storage, filename);
        
        const res = await uploadBytes(storageRef, file);


        return res.metadata.fullPath;
    } catch (error) {
        console.error(error);
    }
}

export const getFile = async (path: string) => {
    try {
      const fileRef = ref(storage, path);
      return getDownloadURL(fileRef);
    } catch (error) {
      console.error(error);
    }
  };