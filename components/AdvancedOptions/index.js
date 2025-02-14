import { useState } from 'react';
import styles from './AdvancedOptions.module.css';

export default function AdvancedOptions({ options, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      ...options,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    });
  };

  return (
    <div className={styles.advancedOptions}>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>Advanced Options</h3>
        <span className={`${styles.arrow} ${isExpanded ? styles.expanded : ''}`}>
          ▼
        </span>
      </button>
      
      <div className={`${styles.optionsContent} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.optionGroup}>
          <label>
            Quality: {options.quality}%
            <input
              type="range"
              name="quality"
              min="1"
              max="100"
              value={options.quality}
              onChange={handleChange}
              className={styles.slider}
            />
          </label>
        </div>

        <div className={styles.dimensionsGroup}>
          <div className={styles.dimensionInput}>
            <label>
              Width:
              <input
                type="number"
                name="width"
                value={options.width || ''}
                onChange={handleChange}
                placeholder="Auto"
                min="1"
              />
            </label>
          </div>
          <div className={styles.dimensionInput}>
            <label>
              Height:
              <input
                type="number"
                name="height"
                value={options.height || ''}
                onChange={handleChange}
                placeholder="Auto"
                min="1"
              />
            </label>
          </div>
        </div>

        <div className={styles.optionGroup}>
          <label>
            Resize Mode:
            <select 
              name="resizeMode" 
              value={options.resizeMode} 
              onChange={handleChange}
              className={styles.select}
            >
              <option value="none">Original Size</option>
              <option value="exact">Exact Size</option>
              <option value="fit">Fit Within</option>
              <option value="fill">Fill Area</option>
            </select>
          </label>
        </div>

        <div className={styles.optionGroup}>
          <label>
            <input
              type="checkbox"
              name="maintainAspectRatio"
              checked={options.maintainAspectRatio}
              onChange={handleChange}
            />
            Maintain aspect ratio
          </label>
        </div>

        <div className={styles.optionGroup}>
          <label>
            Rotation:
            <select 
              name="rotation" 
              value={options.rotation} 
              onChange={handleChange}
              className={styles.select}
            >
              <option value="0">0°</option>
              <option value="90">90°</option>
              <option value="180">180°</option>
              <option value="270">270°</option>
            </select>
          </label>
        </div>

        <div className={styles.optionGroup}>
          <label>
            <input
              type="checkbox"
              name="flipHorizontal"
              checked={options.flipHorizontal}
              onChange={handleChange}
            />
            Flip Horizontal
          </label>
        </div>

        <div className={styles.optionGroup}>
          <label>
            <input
              type="checkbox"
              name="flipVertical"
              checked={options.flipVertical}
              onChange={handleChange}
            />
            Flip Vertical
          </label>
        </div>

        <div className={styles.optionGroup}>
          <label>
            <input
              type="checkbox"
              name="lossless"
              checked={options.lossless}
              onChange={handleChange}
            />
            Lossless compression
          </label>
        </div>
      </div>
    </div>
  );
} 