# Wobble Card Component

A beautiful interactive card component that responds to mouse movement with a smooth wobble effect, built with Framer Motion.

## Features

- **Mouse-responsive**: Tracks mouse position and rotates the card accordingly
- **Smooth animations**: Uses Framer Motion for fluid transitions
- **3D effect**: Multiple gradient layers create depth
- **Customizable**: Accepts custom className and containerClassName props
- **TypeScript support**: Fully typed with React.FC

## Usage

### Basic Usage

```tsx
import { WobbleCard } from '@/components/ui/wobble-card';

function MyComponent() {
  return (
    <WobbleCard>
      <div className="flex flex-col h-full">
        <h3 className="text-2xl font-bold mb-4">My Card</h3>
        <p className="text-gray-300 mb-4">
          This card wobbles when you move your mouse over it!
        </p>
        <button className="mt-auto px-4 py-2 bg-white/10 rounded-lg">
          Click me
        </button>
      </div>
    </WobbleCard>
  );
}
```

### Custom Styling

```tsx
<WobbleCard 
  className="h-64 w-64 bg-gradient-to-br from-blue-500 to-purple-500"
  containerClassName="p-8"
>
  <div>Custom styled content</div>
</WobbleCard>
```

### Integration with Existing Components

You can wrap existing components like ProductCard:

```tsx
import { WobbleCard } from '@/components/ui/wobble-card';
import { ProductCard } from '@/components/chat/components/ProductCard';

function WobbleProductCard({ product, onProductClick }) {
  return (
    <WobbleCard className="h-auto w-auto max-w-xs">
      <ProductCard product={product} onProductClick={onProductClick} />
    </WobbleCard>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Content to display inside the card |
| `className` | `string` | Additional CSS classes for the card |
| `containerClassName` | `string` | Additional CSS classes for the container |

## How it Works

1. **Mouse Tracking**: The component tracks mouse position relative to the card
2. **Rotation Calculation**: Calculates rotation angles based on mouse position
3. **Animation**: Uses Framer Motion to animate the rotation smoothly
4. **3D Layers**: Multiple gradient layers create a depth effect
5. **Spring Physics**: Smooth spring animations for natural movement

## Dependencies

- `framer-motion`: For animations
- `clsx` and `tailwind-merge`: For class name utilities
- React 18+ with TypeScript

## Examples

See `wobble-card-demo.tsx` for a complete demo with multiple examples, and `wobble-card-example.tsx` for integration examples with existing components. 