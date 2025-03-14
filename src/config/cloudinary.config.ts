import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    cloudinary.config({
      cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    });

    return cloudinary;
  },
  inject: [ConfigService],
};

export const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      const allowedFormats = ['jpeg', 'jpg', 'png'];
      const fileExtension = file.mimetype.split('/')[1]; // Extrae la extensión del mimetype
  
      // Si la extensión no es válida, usa 'png' por defecto
      const format = allowedFormats.includes(fileExtension) ? fileExtension : 'png';
  
      return {
        folder: 'uploads',
        format, 
        public_id: Date.now().toString(),
      };
    },
  });
  
