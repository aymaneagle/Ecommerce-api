Frontend architecture with React + vite, Zustand.

State Management with Zustand
Handles multiple API calls (Brands, Categories, Sliders, Product Lists by Remark).

API integration with axis
Dynamic fetching of:
                    -Slider List
                    -Products by Remark: (new,trending, popular, top, special)


Layout.jsx -> Wrapper for header/footer
HomePage.jsx -> landing page with slider, products, categories, brands, features
Dynamic Product Rendering:
Displays product cards with: title, 
                            price with discount logic, 
                            star ratings.

Skeleton Loaders for Better UX
SliderSkeleton.jsx -> Lottie animation while slider data loads
ProductsSkeleton.jsx -> Card skeleton + animated placeholder for products