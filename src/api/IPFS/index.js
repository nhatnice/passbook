import Axios from 'axios';
import { Config } from '@config';

export const IPFS = {
   uploadImage: async (file) => {
      const formData = new FormData();
      formData.append(
         "image",
         file,
         file.name
      );

      return await Axios.post(`https://api.imgur.com/3/image`, formData, {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Client-ID ${Config.IMGUR_CLIENT_ID}`
         }
      });
   }
}
