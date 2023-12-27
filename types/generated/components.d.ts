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

export interface CommonButtonLink extends Schema.Component {
  collectionName: 'components_common_button_links';
  info: {
    displayName: 'ButtonLink';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    text: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean;
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

export interface CommonHomepageIntroduceItems extends Schema.Component {
  collectionName: 'components_common_homepage_introduce_items';
  info: {
    displayName: 'Homepage.introduce.items';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    link: Attribute.String;
  };
}

export interface CommonHomepageOurClientsItems extends Schema.Component {
  collectionName: 'components_common_homepage_our_clients_items';
  info: {
    displayName: 'Homepage.ourClients.items';
  };
  attributes: {
    image: Attribute.Media;
  };
}

export interface CommonHomepageServiceOfferingsItems extends Schema.Component {
  collectionName: 'components_common_homepage_service_offerings_items';
  info: {
    displayName: 'Homepage.serviceOfferings.items';
  };
  attributes: {
    image: Attribute.Media;
    title: Attribute.String;
    link: Attribute.String;
  };
}

export interface CommonHomepageServicesItems extends Schema.Component {
  collectionName: 'components_common_homepage_services_items';
  info: {
    displayName: 'Homepage.services.items';
    description: '';
  };
  attributes: {
    imageCustomer: Attribute.Media;
    logoCompany: Attribute.Media;
    postionCustomer: Attribute.String;
    thumbnailImage: Attribute.Media;
    video: Attribute.Text & Attribute.CustomField<'plugin::oembed.oembed'>;
    description: Attribute.Text;
    textLink: Attribute.String;
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

export interface CommonServicesOfferItems extends Schema.Component {
  collectionName: 'components_common_services_offer_items';
  info: {
    displayName: 'Services.Offer.items';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media;
  };
}

export interface CommonServicesProcessItems extends Schema.Component {
  collectionName: 'components_common_services_process_items';
  info: {
    displayName: 'Services.Process.items';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
  };
}

export interface LayoutHomepageBanner extends Schema.Component {
  collectionName: 'components_layout_homepage_banners';
  info: {
    displayName: 'Homepage.banner';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.RichText;
    button: Attribute.Component<'common.button-link'>;
    thumbnailImage: Attribute.Media;
    backgroundImageDecktop: Attribute.Media;
    backgroundImageMobile: Attribute.Media;
    thumbnailVideo: Attribute.Text &
      Attribute.CustomField<'plugin::oembed.oembed'>;
  };
}

export interface LayoutHomepageIntroduce extends Schema.Component {
  collectionName: 'components_layout_homepage_introduces';
  info: {
    displayName: 'Homepage.introduce';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'common.homepage-introduce-items', true>;
  };
}

export interface LayoutHomepageOurClients extends Schema.Component {
  collectionName: 'components_layout_homepage_our_clients';
  info: {
    displayName: 'Homepage.ourClients';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'common.homepage-our-clients-items', true>;
  };
}

export interface LayoutHomepageServiceOfferings extends Schema.Component {
  collectionName: 'components_layout_homepage_service_offerings';
  info: {
    displayName: 'Homepage.serviceOfferings';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'common.homepage-service-offerings-items', true>;
  };
}

export interface LayoutHomepageServices extends Schema.Component {
  collectionName: 'components_layout_homepage_services';
  info: {
    displayName: 'Homepage.services';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    items: Attribute.Component<'common.homepage-services-items', true>;
  };
}

export interface LayoutHomepageSlidesCaseStudies extends Schema.Component {
  collectionName: 'components_layout_homepage_slides_case_studies';
  info: {
    displayName: 'Homepage.slidesCaseStudies';
  };
  attributes: {
    image: Attribute.Media;
    title: Attribute.String;
    description: Attribute.String;
  };
}

export interface LayoutServiceHeroSection extends Schema.Component {
  collectionName: 'components_layout_service_hero_sections';
  info: {
    displayName: 'Service.HeroSection';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    image: Attribute.Media;
    button: Attribute.Component<'common.button-link'>;
    backgroundImage: Attribute.Media;
  };
}

export interface LayoutServicesCaseStudy extends Schema.Component {
  collectionName: 'components_layout_services_case_studies';
  info: {
    displayName: 'Services.CaseStudy';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    case_studies: Attribute.Relation<
      'layout.services-case-study',
      'oneToMany',
      'api::case-study.case-study'
    >;
  };
}

export interface LayoutServicesProcess extends Schema.Component {
  collectionName: 'components_layout_services_processes';
  info: {
    displayName: 'Services.Process';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'common.services-process-items', true>;
  };
}

export interface LayoutServicesWeOffer extends Schema.Component {
  collectionName: 'components_layout_services_we_offers';
  info: {
    displayName: 'Services.WeOffer';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'common.services-offer-items', true>;
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
      'common.button-link': CommonButtonLink;
      'common.child-category': CommonChildCategory;
      'common.children-item': CommonChildrenItem;
      'common.footer-item': CommonFooterItem;
      'common.homepage-introduce-items': CommonHomepageIntroduceItems;
      'common.homepage-our-clients-items': CommonHomepageOurClientsItems;
      'common.homepage-service-offerings-items': CommonHomepageServiceOfferingsItems;
      'common.homepage-services-items': CommonHomepageServicesItems;
      'common.meta-data': CommonMetaData;
      'common.navbar-item': CommonNavbarItem;
      'common.services-offer-items': CommonServicesOfferItems;
      'common.services-process-items': CommonServicesProcessItems;
      'layout.homepage-banner': LayoutHomepageBanner;
      'layout.homepage-introduce': LayoutHomepageIntroduce;
      'layout.homepage-our-clients': LayoutHomepageOurClients;
      'layout.homepage-service-offerings': LayoutHomepageServiceOfferings;
      'layout.homepage-services': LayoutHomepageServices;
      'layout.homepage-slides-case-studies': LayoutHomepageSlidesCaseStudies;
      'layout.service-hero-section': LayoutServiceHeroSection;
      'layout.services-case-study': LayoutServicesCaseStudy;
      'layout.services-process': LayoutServicesProcess;
      'layout.services-we-offer': LayoutServicesWeOffer;
      'layout.video': LayoutVideo;
    }
  }
}
