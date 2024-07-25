def downsize(image):
    """
    Crop image or downscale to save on tokens.

    Args:
        image (Image): image of person to "avatarize"

    Returns:
        Image: downsized image, ready to pass to OpenAI API for inference
    """
    new_width = 200  # replace with your desired width
    new_height = 200  # replace with your desired height
    return image
