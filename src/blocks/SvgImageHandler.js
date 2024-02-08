import {
    useBlockProps,
    MediaPlaceholder,
    MediaUpload,
    MediaUploadCheck,
  } from '@wordpress/block-editor';
  import { Button, Icon } from '@wordpress/components';
  import { edit as editIcon, trash as trashIcon } from '@wordpress/icons';

  import { BCImagePicker } from './BCImagePicker';
  import { cleanSvgString } from './SvgImageHandler';
  
  export const ImageWithControls = ({
    attributes: { imageId, imageUrl, imageAlt, svgCode },
    setAttributes,
  }) => {
    const hasImage = imageId && imageUrl;
    const isSvg = hasImage && svgCode;
  
    const onRemoveImage = () =>
      setAttributes({ imageId: null, imageUrl: '', imageAlt: '', svgCode: '' });
  
    const onSelectImage = (media) => {
      setAttributes({
        imageId: media.id,
        imageUrl: media.url,
        imageAlt: media.alt,
      });
  
      if (media.mime === 'image/svg+xml') {
        fetch(media.url)
          .then((response) => response.text())
          .then((svgString) => setAttributes({ svgCode: cleanSvgString(svgString) }));
      } else {
        setAttributes({ svgCode: '' });
      }
    };
  
    return (
      <div {...useBlockProps()}>
        <MediaUploadCheck>
          <MediaUpload
            onSelect={onSelectImage}
            allowedTypes={['image']}
            value={imageId}
            render={({ open }) => (
              <div className="image-wrapper">
                {hasImage ? (
                  <div className="image-container">
                    {isSvg ? (
                      <div
                        className="svg-container"
                        dangerouslySetInnerHTML={{ __html: svgCode }}
                      />
                    ) : (
                      <img src={imageUrl} alt={imageAlt || 'icon'} />
                    )}
  
                    <div className="image-actions">
                      <Button
                        className="image-action replace-btn"
                        type="button"
                        onClick={open}
                      >
                        <Icon icon={editIcon} size={20} />
                      </Button>
                      <Button
                        className="image-action remove-btn"
                        type="button"
                        onClick={onRemoveImage}
                      >
                        <Icon icon={trashIcon} size={20} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <MediaPlaceholder
                    icon="format-image"
                    onSelect={onSelectImage}
                    allowedTypes={['image', 'image/svg+xml']}
                    labels={{ title: 'Icon Image' }}
                  />
                )}
              </div>
            )}
          />
        </MediaUploadCheck>
        {hasImage && (
          <BCImagePicker
            imageId={imageId}
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            onSelect={onSelectImage}
            onRemove={onRemoveImage}
          />
        )}
      </div>
    );
  };
  