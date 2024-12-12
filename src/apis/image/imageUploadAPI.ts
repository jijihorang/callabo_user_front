import axios from "axios";

const host = "/api2/images";

export const uploadS3Images = async (imageFiles: File[]): Promise<string[]> => {
    const formData = new FormData();
    imageFiles.forEach((file) => formData.append("imageFiles", file));

    try{
        const response = await axios.post<string[]>(`${host}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to upload image:", error);
        throw new Error("Unable to upload images. Please try again later.");
    }
}
