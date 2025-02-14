import { useState, useEffect } from 'react';
import styles from './FileList.module.css';

export default function FileList({ files, convertedFiles }) {
  const [fileStates, setFileStates] = useState({});

  useEffect(() => {
    // Simulate progress for newly added files
    const newFiles = files.filter(file => !fileStates[file.name]);
    if (newFiles.length > 0) {
      const updates = {};
      newFiles.forEach(file => {
        updates[file.name] = {
          progress: 0,
          status: 'pending'
        };
      });
      setFileStates(prev => ({ ...prev, ...updates }));
    }
  }, [files]);

  useEffect(() => {
    // Update status for converted files
    const updates = {};
    convertedFiles.forEach(result => {
      updates[result.original.name] = {
        progress: 100,
        status: 'completed'
      };
    });
    setFileStates(prev => ({ ...prev, ...updates }));
  }, [convertedFiles]);

  const handleDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    for (const result of convertedFiles) {
      await new Promise(resolve => setTimeout(resolve, 500));
      handleDownload(result.converted, result.name);
    }
  };

  return (
    <div className={styles.fileLists}>
      <div className={styles.fileListSection}>
        <h4>Files</h4>
        <div className={styles.fileList}>
          {files.map((file, index) => {
            const state = fileStates[file.name] || { progress: 0, status: 'pending' };
            const convertedFile = convertedFiles.find(cf => cf.original.name === file.name);
            
            return (
              <div key={index} className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <span className={styles.fileName} title={file.name}>
                    {file.name}
                  </span>
                  <div className={styles.progressWrapper}>
                    <div 
                      className={styles.progressBar} 
                      style={{ width: `${state.progress}%` }}
                    />
                    <span className={styles.progressText}>
                      {state.status === 'completed' ? 'Converted' : 'Pending'}
                    </span>
                  </div>
                </div>
                {convertedFile && (
                  <button
                    onClick={() => handleDownload(convertedFile.converted, convertedFile.name)}
                    className={styles.downloadButton}
                    title="Download"
                  >
                    ⬇️
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {convertedFiles.length > 1 && (
        <div className={styles.downloadAllWrapper}>
          <button
            onClick={handleDownloadAll}
            className={styles.downloadAllButton}
          >
            Download All
          </button>
        </div>
      )}
    </div>
  );
} 