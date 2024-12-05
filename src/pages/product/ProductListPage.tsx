import ProductListComponent from "../../components/product/ProductListComponent.tsx";
import CreatorReviewsComponent from "../../components/review/CreatorReviewsComponent.tsx";

function ProductListPage() {
    return (
        <div>
            <div>
                <ProductListComponent></ProductListComponent>
            </div>
            <div>
                <CreatorReviewsComponent></CreatorReviewsComponent>
            </div>
        </div>
    );
}

export default ProductListPage;