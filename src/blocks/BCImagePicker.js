import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import PropTypes from 'prop-types';

export const BCImagePicker = ({
    imageId,
    imageUrl,
    imageAlt,
    onSelect,
    onRemove,
    ...other
}) => {
    return (
        <MediaUploadCheck>
            <MediaUpload
                onSelect={onSelect}
                allowedTypes={['image', 'image/svg+xml']}
                accept="image/*"
                value={imageId}
                render={({ open }) => (
                    <BCImageRenderer
                        imageId={imageId}
                        imageUrl={imageUrl}
                        imageAlt={imageAlt}
                        onImageClick={open}
                        onRemoveClick={onRemove}
                        onSelectClick={open}
                    />
                )}
                { ...other }
            />
        </MediaUploadCheck>
    );
};


BCImagePicker.propTypes = {
    imageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageUrl: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};