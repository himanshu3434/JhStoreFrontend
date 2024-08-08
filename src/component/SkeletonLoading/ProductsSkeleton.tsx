import ProductCardSkeleton from "./ProductCardSkeleton";

function ProductsSkeleton() {
  return (
    <div>
      <div className="mt-14  p-4 ">
        <div className="flex  flex-wrap  justify-center">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <ProductCardSkeleton />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsSkeleton;
