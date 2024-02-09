import { Button } from '@wordpress/components';
import PropTypes from 'prop-types';

const BCImageRenderer = ({
    imageId,
    imageUrl,
    imageAlt,
    onImageClick,
    onRemoveClick,
    onSelectClick,
}) => {
    return imageId && imageUrl ? (
        <>
            <div className="bc-selected-image-wrapper">
                <img
                    src={imageUrl}
                    className="bc-selected-image"
                    alt={imageAlt}
                    onClick={onImageClick}
                />
            </div>

            <Button
                className="bc-remove-btn"
                onClick={onRemoveClick}
                isSecondary
                isDestructive
            >
                Remove Image
            </Button>
        </>
    ) : (
        <Button
            variant="secondary"
            onClick={onSelectClick}
        >
            Select Image
        </Button>
    );
};

BCImageRenderer.propTypes = {
    imageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageUrl: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    onImageClick: PropTypes.func,
    onRemoveClick: PropTypes.func.isRequired,
    onSelectClick: PropTypes.func.isRequired,
};

export default BCImageRenderer;
