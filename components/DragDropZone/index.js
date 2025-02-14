import { useCallback } from 'react';
import styles from './DragDropZone.module.css';

export default function DragDropZone({ onFilesSelected, files }) {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    onFilesSelected(droppedFiles);
  }, [onFilesSelected]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files).filter(file => 
      file.type.startsWith('image/')
    );
    onFilesSelected(selectedFiles);
  }, [onFilesSelected]);

  return (
    <div 
      className={styles.dropZone}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        className={styles.fileInput}
        id="fileInput"
      />
      <label htmlFor="fileInput" className={styles.dropZoneLabel}>
        <div className={styles.dropZoneContent}>
          <p>Drag & drop images here or click to select</p>
        </div>
      </label>
    </div>
  );
} 