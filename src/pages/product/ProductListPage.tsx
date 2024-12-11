import ProductListComponent from "../../components/product/list/ProductListComponent.tsx";
import CreatorReviewListComponent from "../../components/creator/review/CreatorReviewListComponent.tsx";

function ProductListPage() {
    return (
        <div>
            <div>
                <ProductListComponent></ProductListComponent>
            </div>
            <div>
                <CreatorReviewListComponent></CreatorReviewListComponent>
            </div>
        </div>
    );
}

export default ProductListPage;