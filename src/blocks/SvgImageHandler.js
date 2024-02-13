import React, { useState, useEffect } from 'react';
import { useBlockProps, InspectorControls, MediaPlaceholder, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Icon, PanelBody } from '@wordpress/components';
import { edit as editIcon, trash as trashIcon } from '@wordpress/icons';

import BCImagePicker from './BCImagePicker';
import cleanSvgString from '../utils/cleanSvgString';
import '../styles/BlockControls.scss'

export const SvgImageHandler = ({
  imageId,
  imageUrl,
  imageAlt,
  svgCode,
  setAttributes,
}) => {
  const [processedSvg, setProcessedSvg] = useState(svgCode);

  const hasImage = imageId && imageUrl;
  const isSvg = hasImage && svgCode;

  const onSelectImage = (media) => {
    if (media.mime === 'image/svg+xml') {
      fetch(media.url)
        .then(response => response.text())
        .then(svgString => {
          const cleanedSvgString = cleanSvgString(svgString);
          setAttributes({
            imageId: media.id,
            imageUrl: media.url,
            imageAlt: media.alt,
            svgCode: cleanedSvgString,
          });
          setProcessedSvg(cleanedSvgString);
        });
    } else {
      setAttributes({
        imageId: media.id,
        imageUrl: media.url,
        imageAlt: media.alt,
        svgCode: '',
      });
      setProcessedSvg('');
    }
  };

  const onRemoveImage = () => {
    setAttributes({ imageId: null, imageUrl: '', imageAlt: '', svgCode: '' });
    setProcessedSvg('');
  };

  useEffect(() => {
    if (svgCode && !processedSvg) {
      fetch(imageUrl)
        .then((response) => response.text())
        .then((svgString) => setProcessedSvg(cleanSvgString(svgString)))
        .catch((error) => console.error('Error fetching SVG:', error));
    }
  }, [svgCode, imageUrl]);


  return (
    <>
      <InspectorControls>
        <PanelBody title="Image Settings">
          <BCImagePicker
            imageId={imageId}
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            onSelect={onSelectImage}
            onRemove={onRemoveImage}
          />
        </PanelBody>
      </InspectorControls>

      <div {...useBlockProps()} >
        <MediaUploadCheck>
          <MediaUpload
            onSelect={onSelectImage}
            allowedTypes={['image']}
            value={imageId}
            render={({ open }) => {
              return hasImage ? (
                <div className="bc-image-wrapper">
                  {
                    hasImage && (
                      isSvg
                        ? (
                          <div
                            className="svg-container"
                            dangerouslySetInnerHTML={{ __html: processedSvg }}
                          />
                        ) : <img src={imageUrl} alt={imageAlt || "icon"} />
                    )
                  }

                  <div className="bc-image-wrapper__actions">
                    <Button
                      className="bc-image-wrapper__btn bc-image-wrapper__replace-btn"
                      type="button"
                      onClick={open}
                    >
                      <Icon
                        icon={editIcon}
                        size={20}
                        className="bc-image-wrapper__btn-icon"
                      />
                    </Button>

                    <Button
                      className="bc-image-wrapper__btn bc-image-wrapper__remove-btn"
                      type="button"
                      onClick={onRemoveImage}
                    >
                      <Icon
                        icon={trashIcon}
                        size={20}
                        className="bc-image-wrapper__btn-icon"
                      />
                    </Button>
                  </div>


                  <div className="bc-image-wrapper__overlay" />
                </div>
              ) : (
                <MediaPlaceholder
                  icon="format-image"
                  onSelect={onSelectImage}
                  allowedTypes={['image', 'image/svg+xml']}
                  labels={{ title: 'Icon Image' }}
                />
              );
            }}
          />
        </MediaUploadCheck>
      </div>
    </>
  );
};

export default SvgImageHandler;
