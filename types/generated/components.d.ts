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
  };
  attributes: {
    metaImage: Attribute.Media;
    metaTitle: Attribute.String;
    metaDescription: Attribute.Text;
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
      'layout.video': LayoutVideo;
    }
  }
}
