import { render, screen } from '@testing-library/react';
import ProductImageGallery from '../../components/ProductImageGallery';

describe('ProductImage', () => {
  it('should render nothing if there are no images', () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render the image', () => {
    const imageUrls = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ];
    render(<ProductImageGallery imageUrls={imageUrls} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute('src', url);
    });
  });
});
