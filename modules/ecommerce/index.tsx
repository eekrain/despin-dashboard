import React from 'react';
import {authRole} from '../../shared/constants/AppConst';

export const ecommerceConfig = [
  {
    auth: authRole.user,
    routes: [
      {
        path: '/ecommerce/invoice-1',
        component: React.lazy(() => import('./Invoice1')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/ecommerce/invoice-2',
        component: React.lazy(() => import('./Invoice2')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/ecommerce/products',
        component: React.lazy(() => import('./Products')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/ecommerce/product_detail/:id?',
        component: React.lazy(() => import('./ProductDetail')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/ecommerce/customers',
        component: React.lazy(() => import('./Customers')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/ecommerce/checkout',
        component: React.lazy(() => import('./Checkout')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/ecommerce/cart',
        component: React.lazy(() => import('./Carts')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/ecommerce/orders',
        component: React.lazy(() => import('./Orders')),
      },
    ],
  },
  {
    auth: authRole.user,
    routes: [
      {
        path: '/ecommerce/confirmation',
        component: React.lazy(() => import('./Confirmation')),
      },
    ],
  },
];
