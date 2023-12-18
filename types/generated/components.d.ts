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

export interface CommonChildCategory extends Schema.Component {
  collectionName: 'components_common_child_categories';
  info: {
    displayName: 'NavbarSubCate';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    children: Attribute.Component<'common.navbar-item', true>;
  };
}

export interface CommonChildrenItem extends Schema.Component {
  collectionName: 'components_common_children_items';
  info: {
    displayName: 'ChildrenItem';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    url: Attribute.Text;
    isNewTab: Attribute.Boolean;
  };
}

export interface CommonFooterItem extends Schema.Component {
  collectionName: 'components_common_footer_items';
  info: {
    displayName: 'FooterItem';
  };
  attributes: {
    GroupName: Attribute.String;
    children: Attribute.Component<'common.children-item', true>;
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

export interface CommonNavbarItem extends Schema.Component {
  collectionName: 'components_common_navbar_items';
  info: {
    displayName: 'NavbarChildren';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    path: Attribute.Text & Attribute.Required;
    icon: Attribute.Media;
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
      'common.child-category': CommonChildCategory;
      'common.children-item': CommonChildrenItem;
      'common.footer-item': CommonFooterItem;
      'common.meta-data': CommonMetaData;
      'common.navbar-item': CommonNavbarItem;
      'layout.video': LayoutVideo;
    }
  }
}
