import React, {useEffect} from 'react';
import ProductImageSlide from './ProductImageSlide';
import {useDispatch, useSelector} from 'react-redux';
import AppCard from '../../../@crema/core/AppCard';
import Header from './Header';
import ProductView from './ProductView';
import GridContainer from '../../../@crema/core/GridContainer';
import SimilarProduct from './SimilarProduct';
import {getProductDetail} from '../../../redux/actions/Ecommerce';
import {InfoView} from '../../../@crema';
import AppAnimate from '../../../@crema/core/AppAnimate';
import {AppState} from '../../../redux/store';
import {useRouter} from 'next/router';

interface ProductDetailProps {
  match: any;
}

const ProductDetail: React.FC<ProductDetailProps> = ({match}) => {
  const dispatch = useDispatch();
  const {query} = useRouter();
  const {currentProduct} = useSelector<AppState, AppState['ecommerce']>(
    ({ecommerce}) => ecommerce,
  );
  useEffect(() => {
    dispatch(getProductDetail(query.id ? query.id.toString() : 1));
  }, [dispatch, query.id]);

  return (
    <>
      {currentProduct ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppCard>
            <Header product={currentProduct}/>
            <GridContainer>
              <ProductImageSlide product={currentProduct}/>
              <ProductView product={currentProduct}/>
            </GridContainer>
            <SimilarProduct/>
          </AppCard>
        </AppAnimate>
      ) : null}
      <InfoView/>
    </>
  );
};

export default ProductDetail;
