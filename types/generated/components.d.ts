import type { Schema, Attribute } from '@strapi/strapi';

export interface CommonBreadcrumb extends Schema.Component {
  collectionName: 'components_common_breadcrumbs';
  info: {
    displayName: 'Breadcrumb';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    link: Attribute.Text;
  };
}

export interface CommonMetaData extends Schema.Component {
  collectionName: 'components_common_meta_data';
  info: {
    displayName: 'metaData';
    description: '';
  };
  attributes: {
    metaImage: Attribute.Media;
    metaTitle: Attribute.String;
    metaDescription: Attribute.Text;
    keyword: Attribute.JSON;
    schema: Attribute.JSON;
  };
}

export interface CommonPostByCategoryAndTag extends Schema.Component {
  collectionName: 'components_common_post_by_category_and_tags';
  info: {
    displayName: 'PostByCategoryAndTag';
    icon: 'book';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    category: Attribute.Relation<
      'common.post-by-category-and-tag',
      'oneToOne',
      'api::category.category'
    >;
    tags: Attribute.Relation<
      'common.post-by-category-and-tag',
      'oneToMany',
      'api::tag.tag'
    >;
  };
}

export interface CommonPostByCategory extends Schema.Component {
  collectionName: 'components_common_post_by_categories';
  info: {
    displayName: 'PostByCategory';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    category: Attribute.Relation<
      'common.post-by-category',
      'oneToOne',
      'api::category.category'
    >;
  };
}

export interface CommonProduct extends Schema.Component {
  collectionName: 'components_common_products';
  info: {
    displayName: 'product';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    productName: Attribute.String;
    price: Attribute.Integer;
    discount: Attribute.Float &
      Attribute.SetMinMax<{
        min: 0;
        max: 1;
      }>;
    link: Attribute.String;
  };
}

export interface CommonTag extends Schema.Component {
  collectionName: 'components_common_tags';
  info: {
    displayName: 'Tag';
    icon: 'book';
  };
  attributes: {
    tags: Attribute.Relation<'common.tag', 'oneToMany', 'api::tag.tag'>;
  };
}

export interface ContentContentProduct extends Schema.Component {
  collectionName: 'components_common_content_products';
  info: {
    displayName: 'contentProduct';
    description: '';
  };
  attributes: {
    product: Attribute.Component<'common.product', true>;
  };
}

export interface ContentContent extends Schema.Component {
  collectionName: 'components_common_contents';
  info: {
    displayName: 'content';
    description: '';
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar';
        }
      >;
  };
}

export interface ContentLink extends Schema.Component {
  collectionName: 'components_layout_links';
  info: {
    displayName: 'link';
    description: '';
  };
  attributes: {
    blog: Attribute.Relation<'content.link', 'oneToOne', 'api::blog.blog'>;
  };
}

export interface LayoutAricles extends Schema.Component {
  collectionName: 'components_layout_aricles';
  info: {
    displayName: 'Aricles';
  };
  attributes: {
    categories: Attribute.Relation<
      'layout.aricles',
      'oneToMany',
      'api::category.category'
    >;
  };
}

export interface LayoutBanner extends Schema.Component {
  collectionName: 'components_layout_banners';
  info: {
    displayName: 'Banner';
    description: '';
  };
  attributes: {
    blogs: Attribute.Relation<'layout.banner', 'oneToMany', 'api::blog.blog'>;
  };
}

export interface LayoutBlogs extends Schema.Component {
  collectionName: 'components_layout_blogs';
  info: {
    displayName: 'Blogs';
    icon: 'file';
  };
  attributes: {
    blogs: Attribute.Relation<'layout.blogs', 'oneToMany', 'api::blog.blog'>;
  };
}

export interface LayoutCategory extends Schema.Component {
  collectionName: 'components_layout_categories';
  info: {
    displayName: 'Category';
  };
  attributes: {
    categories: Attribute.Relation<
      'layout.category',
      'oneToMany',
      'api::category.category'
    >;
  };
}

export interface LayoutContentLink extends Schema.Component {
  collectionName: 'components_layout_content_links';
  info: {
    displayName: 'content.link';
  };
  attributes: {};
}

export interface LayoutNewPost extends Schema.Component {
  collectionName: 'components_layout_new_posts';
  info: {
    displayName: 'NewPost';
    icon: 'grid';
  };
  attributes: {
    categories: Attribute.Relation<
      'layout.new-post',
      'oneToMany',
      'api::category.category'
    >;
  };
}

export interface LayoutPopularPost extends Schema.Component {
  collectionName: 'components_layout_popular_posts';
  info: {
    displayName: 'PopularPost';
    icon: 'arrowUp';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
  };
}

export interface LayoutVideo extends Schema.Component {
  collectionName: 'components_layout_videos';
  info: {
    displayName: 'video';
    icon: 'slideshow';
  };
  attributes: {
    video: Attribute.Text & Attribute.CustomField<'plugin::oembed.oembed'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'common.breadcrumb': CommonBreadcrumb;
      'common.meta-data': CommonMetaData;
      'common.post-by-category-and-tag': CommonPostByCategoryAndTag;
      'common.post-by-category': CommonPostByCategory;
      'common.product': CommonProduct;
      'common.tag': CommonTag;
      'content.content-product': ContentContentProduct;
      'content.content': ContentContent;
      'content.link': ContentLink;
      'layout.aricles': LayoutAricles;
      'layout.banner': LayoutBanner;
      'layout.blogs': LayoutBlogs;
      'layout.category': LayoutCategory;
      'layout.content-link': LayoutContentLink;
      'layout.new-post': LayoutNewPost;
      'layout.popular-post': LayoutPopularPost;
      'layout.video': LayoutVideo;
    }
  }
}
