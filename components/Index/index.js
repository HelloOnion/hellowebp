import { useState } from 'react';
import styles from './Pages.module.css';
import DragDropZone from '../DragDropZone';
import AdvancedOptions from '../AdvancedOptions';
import FileList from '../FileList';

export default function Index({ navigateToPage }) {
  const [files, setFiles] = useState([]);
  const [conversionOptions, setConversionOptions] = useState({
    quality: 80,
    resizeMode: 'none',
    width: null,
    height: null,
    rotation: '0',
    flipHorizontal: false,
    flipVertical: false,
    maintainAspectRatio: true,
    lossless: false,
  });
  const [convertedFiles, setConvertedFiles] = useState([]);

  const handleFilesSelected = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  const handleConvert = async () => {
    const converted = [];
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const webpBlob = await convertToWebP(file, conversionOptions);
        converted.push({
          original: file,
          converted: webpBlob,
          name: file.name.replace(/\.[^/.]+$/, '.webp')
        });
      }
    }
    setConvertedFiles(converted);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>WebP Converter</h1>
        <p className={styles.description}>convert your images to webp using this browser-based conversion tool!</p>
        <DragDropZone onFilesSelected={handleFilesSelected} files={files} />
        <AdvancedOptions 
          options={conversionOptions} 
          onChange={setConversionOptions}
        />
        <FileList 
          files={files} 
          convertedFiles={convertedFiles}
        />
        <button 
          className={styles.convertButton}
          onClick={handleConvert}
          disabled={files.length === 0}
        >
          Convert to WebP
        </button>
      </main>
    </div>
  );
}

async function convertToWebP(file, options) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      if (options.resizeMode !== 'none' && (options.width || options.height)) {
        const targetWidth = options.width || img.width;
        const targetHeight = options.height || img.height;
        
        if (options.maintainAspectRatio) {
          const ratio = img.width / img.height;
          
          switch (options.resizeMode) {
            case 'fit':
              if (targetWidth / targetHeight > ratio) {
                height = targetHeight;
                width = height * ratio;
              } else {
                width = targetWidth;
                height = width / ratio;
              }
              break;
            case 'fill':
              if (targetWidth / targetHeight > ratio) {
                width = targetWidth;
                height = width / ratio;
              } else {
                height = targetHeight;
                width = height * ratio;
              }
              break;
            case 'exact':
              width = targetWidth;
              height = targetHeight;
              break;
          }
        } else {
          width = targetWidth;
          height = targetHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      
      // Apply transformations
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      
      // Apply rotation
      ctx.rotate((Number(options.rotation) * Math.PI) / 180);
      
      // Apply flips
      const scaleX = options.flipHorizontal ? -1 : 1;
      const scaleY = options.flipVertical ? -1 : 1;
      ctx.scale(scaleX, scaleY);
      
      ctx.drawImage(img, -width/2, -height/2, width, height);
      ctx.restore();
      
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/webp', {
        quality: options.quality / 100,
        lossless: options.lossless
      });
    };
    img.src = URL.createObjectURL(file);
  });
}
